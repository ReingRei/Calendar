import { EventEmitter, OnInit, Output } from '@angular/core';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input } from '@angular/core';
import { CaptchaService } from './captcha.service';

@Component({
    selector: 'app-captcha',
    templateUrl: './captcha.component.html',
    styleUrls: ['./captcha.component.scss'],
})
export class CaptchaComponent implements OnInit {

    provider: 'hcaptcha' | 'recaptcha' | 'transparent';
    is_transparent_checked: boolean = false;
    is_loading: boolean = false;
    is_error_request_provider: boolean = false;
    key: string;

    @Input() vc_operacao: string;
    @Output() onVerify: EventEmitter<{ provider: string, result: string }>;
    @Output() onReset: EventEmitter<boolean>;
    // @Output() onExpired: EventEmitter<{ provider: string, result: string }>;
    // @Output() onError: EventEmitter<{ provider: string, result: string }>;

    constructor(private _captcha: CaptchaService) {
        this.onVerify = new EventEmitter();
        // this.onExpired = new EventEmitter();
        // this.onError = new EventEmitter();
        this.onReset = new EventEmitter();

    }

    ngOnInit(): void {
        this.recuperaTipoCaptcha();
    }

    async restart() {
        this.provider = null;
        this.key = null;
        this.onReset.emit(true);
        this.recuperaTipoCaptcha();
    }

    async recuperaTipoCaptcha() {
        this.provider = null;
        try {
            this.is_loading = true;
            this.is_error_request_provider = false;
            const captchaConfig: any = await this._captcha.verificaTipoCaptcha(this.vc_operacao);
            this.provider = captchaConfig.provider;
            this.key = captchaConfig.key;

            if (this.provider === 'transparent') {
                this.is_transparent_checked = true;
                this.onHCaptchaVerify(this.key);
            }
        } catch (e) {
            console.error('>> Problema Captcha: ', e)
            this.is_error_request_provider = true;
        } finally {
            this.is_loading = false;
        }

    }

    onHCaptchaVerify(vc_token) {
        this.onVerify.emit({
            provider: this.provider,
            result: vc_token
        });
    }
    onHCaptchaExpired(event) {
        this.onReset.emit(true);
    }
    onHCaptchaError(event) {
        this.onReset.emit(true);
    }
}
