import { Injectable } from '@angular/core';
import { User } from 'src/app/users/_models';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setAccessToken(token: string): void {
    localStorage.setItem('token', JSON.stringify(token));
  }

  getAccessToken(): string {
    return JSON.parse(localStorage.getItem('token')!);
  }
}
