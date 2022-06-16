import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../_models';
import { AuthenticationService } from '../_services';

type FormGroupControls = { [key: string]: AbstractControl };

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  form: FormGroup;
  submitted: boolean;
  formControls: string[] = ['email', 'password'];
  formControlsErrorMessages: string[] = [
    'Email is invalid',
    'Password must be at least 6 characters or not exceed 40',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private autenticationService: AuthenticationService
  ) {
    this.submitted = false;
    this.form = this.formBuilder.group({
      email: new FormControl('', {
        validators: [Validators.email],
        initialValueIsDefault: true,
      }),
      password: new FormControl('', {
        validators: [Validators.minLength(6), Validators.maxLength(30)],
        initialValueIsDefault: true,
      }),
    });

    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].addValidators(Validators.required);
    });
  }

  onSignIn() {
    this.submitted = true;
    if (this.form.valid) {
      const email: string = this.form.value.email;
      const password: string = this.form.value.password;
      this.autenticationService.signIn({ email, password }).subscribe({
        next: (user: User) => console.log(user),
        error: (reason: string) => console.log(reason),
      });
    }
  }

  get formControl(): FormGroupControls {
    return this.form.controls;
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }
}
