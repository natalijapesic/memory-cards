import { Component, OnInit } from '@angular/core';
import { AuthentiocationService } from '../_services/authentiocation.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  errorMessage: string = '';
  password: string = '';
  email: string = '';

  constructor(private autenticationService: AuthentiocationService) {
    console.log(this.errorMessage);
  }

  ngOnInit(): void {}

  onSignIn() {
    console.log(
      this.autenticationService
        .signIn({
          email: this.email,
          password: this.password,
        })
        .subscribe((response) => console.log(`${response} erorororo`))
    );
  }
}
