import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared';
import { User } from '../_models';
import { AuthenticationService } from '../_services/authentiocation.service';

type FormGroupControls = { [key: string]: AbstractControl };

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private router: Router,
    private formBuilder: FormBuilder,
    private autenticationService: AuthenticationService,
    public spinnerService: SpinnerService
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
      const name: string = this.form.value.username;
      const image: string = `https://picsum.photos/seed/${name}/200/300`;
      this.autenticationService
        .signUp({ name, isAdmin: false, email, password, image })
        .subscribe({
          next: (user: User) => {
            console.log(user);
            this.router.navigateByUrl('/');
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.status === 400) alert('User already exists');
          },
        });
    }
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }

  get formControl(): FormGroupControls {
    return this.form.controls;
  }
}
