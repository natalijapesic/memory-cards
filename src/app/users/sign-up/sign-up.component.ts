import { Component, OnInit } from '@angular/core';
import { AuthentiocationService } from '../_services/authentiocation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  errorMessage: string = '';
  password: string = '';
  email: string = '';
  name: string = '';

  constructor(private autenticationService: AuthentiocationService) {
    console.log(this.errorMessage);
  }

  ngOnInit(): void {}

  onSignUp() {
      this.autenticationService
        .signUp({
          username: this.name,
          isAdmin: false,
          email: this.email,
          password: this.password,
        })
        .subscribe((response) => console.log(`${response} erorororo`))
  }
}
