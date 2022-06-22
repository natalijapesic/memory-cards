import { Component, OnInit } from '@angular/core';
import { AuthenticationService, User } from '../users';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  user: User | null;
  constructor(private authenticationService: AuthenticationService) {
    this.user = null;
  }

  ngOnInit(): void {
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }

  onSignOut() {
    this.authenticationService.signOut();
  }
}
