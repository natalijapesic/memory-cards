import { Injectable } from '@angular/core';
import { User } from '../_models';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(key: string): User {
    return JSON.parse(localStorage.getItem(key)!);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
