import { Component, HostListener, OnInit } from '@angular/core';
import { AuthenticationService, User } from '../users';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  user: User | null;
  public screenWidth: number;

  constructor(private authenticationService: AuthenticationService) {
    this.user = null;
    this.screenWidth = 0;
  }

  ngOnInit(): void {
    this.authenticationService.user.subscribe((x) => (this.user = x));
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  isMobile(): boolean {
    return this.screenWidth < 768 ? true : false;
  }

  onSignOut() {
    this.authenticationService.signOut();
  }
}
