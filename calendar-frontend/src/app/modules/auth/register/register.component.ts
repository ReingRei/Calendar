import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
    formGroupRegister!: FormGroup;

    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.formGroupRegister = this._formBuilder.group({
            name: [null, [Validators.required, Validators.maxLength(50)]],
            phone: [null, [Validators.required, Validators.email]],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]],
            passwordConfirmed: [null, [Validators.required]]
        })
    }
}
