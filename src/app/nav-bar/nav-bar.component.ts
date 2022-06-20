import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StorageService } from '../shared';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(private storageService: StorageService) {}

  ngOnInit(): void {}

  onSignOut() {
    this.storageService.removeItem('user');
  }
}
