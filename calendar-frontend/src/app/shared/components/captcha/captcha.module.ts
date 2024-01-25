import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { CaptchaComponent } from './captcha.component';
import { CaptchaService } from './captcha.service';

@NgModule({
    imports: [
        CommonModule,
        NgHcaptchaModule.forRoot(),
        MatIconModule,
    ],
    providers: [CaptchaService],
    declarations: [CaptchaComponent],
    exports: [CaptchaComponent],
})
export class CaptchaModule { }
