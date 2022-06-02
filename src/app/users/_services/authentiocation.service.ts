import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
// import { environment } from 'src/environments/environment';

import { User } from '../_models';
import { StoreService } from './store.service';
import { SignInRequest, SignUpRequest } from './types';
const apiUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class AuthentiocationService {
  private userSubject: BehaviorSubject<User | null>;
  private user: Observable<User | null>;

  constructor(private http: HttpClient, private store: StoreService) {
    const storedUser = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject<User | null>(
      JSON.parse(storedUser!)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  signIn(singInRequest: SignInRequest): Observable<User> {
    console.log(singInRequest);
    return this.http.post<User>(`http://localhost:3000/login`, singInRequest);
    // .pipe(
    //   tap((user) => console.log(user)),
    //   map((user) => {
    //     this.store.setUser(user); //interceptor ili middleware?
    //     this.userSubject.next(user);
    //     return user;
    //   })
    // );
  }

  signUp(signUpRequest: SignUpRequest) {
    return this.http.post<User>(`http://localhost:3000/register`, signUpRequest);
    // .pipe(
    //   map((user) => {
    //     this.store.setUser(user);
    //     this.userSubject.next(user);
    //     return user;
    //   })
    // );
  }

  signOut(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}
