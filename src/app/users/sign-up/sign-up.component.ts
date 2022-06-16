import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../_models';
import { AuthenticationService } from '../_services/authentiocation.service';

type FormGroupControls = { [key: string]: AbstractControl };

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  form: FormGroup;
  submitted: boolean;
  formControls: string[] = ['username', 'email', 'password'];
  formControlsErrorMessages: string[] = [
    'Username is required',
    'Email is invalid',
    'Password must be at least 6 characters or not exceed 40',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private autenticationService: AuthenticationService
  ) {
    this.submitted = false;
    this.form = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ]),
    });
  }

  onSignUp() {
    this.submitted = true;
    if (this.form.valid) {
      const email: string = this.form.value.email;
      const password: string = this.form.value.password;
      const username: string = this.form.value.username;
      this.autenticationService
        .signUp({ username, isAdmin: false, email, password })
        .subscribe({
          next: (user: User) => console.log(user),
          error: (reason: string) => console.log(reason),
        });
    }
  }

  get formControl(): FormGroupControls {
    return this.form.controls;
  }

  // onReset() {
  //   this.submitted = false;
  //   this.form.reset();
  // }
}
