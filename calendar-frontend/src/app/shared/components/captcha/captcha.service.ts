import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class CaptchaService {
    constructor(private _http: HttpClient) {}

    verificaTipoCaptcha(vc_operacao: string) {
        return this._http
            .get(
                `${environment.baseUrl}/seguranca/captcha?vc_operacao=${vc_operacao}`
            )
            .toPromise();
    }
}
