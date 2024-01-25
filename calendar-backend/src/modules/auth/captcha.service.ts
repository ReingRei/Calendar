import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  Logger,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { Config } from 'src/common/config';
import { v4 } from 'uuid';

@Injectable()
export class CaptchaService {
  /** @TODO: Essa lista deve ser utilizada no redis futuramente! (para auto-scalling) */
  private _analise;

  constructor(private _http: HttpService) {
    this._analise = {};
    setTimeout(() => this._memoryClear(), 100);
  }

  async recuperaConfiguracao(vc_ip: string, vc_operacao: any) {
    const is_captcha_required = await this.isCaptchaRequired(
      vc_ip,
      vc_operacao,
    );
    if (is_captcha_required) {
      return {
        provider: Config.CAPTCHA_PROVIDER.toLowerCase(),
        key: process.env[Config.CAPTCHA_PROVIDER + '_KEY'],
      };
    }

    return { provider: 'transparent', key: v4() };
  }

  // deve ser utilizado o método timeout do redis
  private async _memoryClear() {
    Logger.warn(
      'Eliminando tentativas antigas de fraude.',
      'CaptchaService@memoryClear',
    );
    Object.keys(this._analise).forEach((key) => {
      const it_min_time =
        Date.now() - this._analise[key].it_tempo_protecao * 60 * 1000;

      if (this._analise[key].it_ultima_suspeita < it_min_time) {
        delete this._analise[key];
      }
    });

    setTimeout(() => {
      this._memoryClear();
    }, 60000);
  }

  private _getHashOperation(vc_ip: string, vc_operacao: string) {
    return crypto
      .createHash('md5')
      .update(vc_ip + '@' + vc_operacao)
      .digest('hex');
  }

  async testarEResolver(vc_ip, vc_operacao, captcha) {
    const is_captcha_required = await this.isCaptchaRequired(
      vc_ip,
      vc_operacao,
    );
    if (is_captcha_required) {
      if(Config.CAPTCHA_PROVIDER.toLocaleLowerCase() === 'hcaptcha') {
        await this.resolverHCaptcha(captcha.result);
      } else if (Config.CAPTCHA_PROVIDER.toLocaleLowerCase() === 'recaptcha') {
        await this.resolverReCaptcha(captcha.result)
      } else {
        throw new PreconditionFailedException('É necessário resolver o captcha.');
      }
    }
  }

  async resolverHCaptcha(result: string) {
    const payload = `response=${result}&secret=${
      process.env['HCAPTCHA_SECRET']
    }`;
    const resultado = await this._http
      .post('https://hcaptcha.com/siteverify', payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .toPromise();

    if (!resultado.data.success) {
      throw new PreconditionFailedException(
        'Houve um problema ao validar o captcha.',
      );
    }
  }

  async resolverReCaptcha(result) {
      const payload = `response=${result}&secret=${
        process.env['RECAPTCHA_SECRET']
      }`;
      const resultado = await this._http
        .post('https://www.google.com/recaptcha/api/siteverify', payload, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .toPromise();

      if (!resultado.data.success) {
        throw new PreconditionFailedException(
          'Houve um problema ao validar o captcha.',
        );
      }
  }

  async isCaptchaRequired(vc_ip: string, vc_operacao: string) {
    const hash = this._getHashOperation(vc_ip, vc_operacao);
    if (!this._analise[hash]) {
      return false;
    } else {
      if (
        this._analise[hash].it_quantidade >=
        this._analise[hash].it_tentativa_maxima
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  async setInformarSuspeita(
    vc_ip: string,
    vc_operacao: string,
    it_tempo_protecao = 60,
    it_tentativa_maxima = 2,
  ) {
    const hash = this._getHashOperation(vc_ip, vc_operacao);
    if (!this._analise[hash]) {
      this._analise[hash] = {
        it_quantidade: 0,
        it_ultima_suspeita: Date.now(),
        it_tempo_protecao,
        it_tentativa_maxima,
      };
    }

    this._analise[hash].it_quantidade++;
    this._analise[hash].it_ultima_suspeita = Date.now();
    this._analise[hash].it_tempo_protecao = it_tempo_protecao;
    this._analise[hash].it_tentativa_maxima = it_tentativa_maxima;
  }
}
