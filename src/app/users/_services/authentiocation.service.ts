import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../_models';
import { StoreService } from './store.service';
import { SignInRequest, SignUpRequest } from './types';


@Injectable({
  providedIn: 'root',
})
export class AuthentiocationService {
  private userSubject: BehaviorSubject<User | null>;
  private user: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private store: StoreService
  ) {
    const storedUser = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject<User | null>(
      JSON.parse(storedUser!)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  singIn(singInRequest: SignInRequest): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/login`, singInRequest).pipe(
      map((user) => {
        this.store.setUser(user); //interceptor ili middleware?
        this.userSubject.next(user);
        return user;
      })
    );
  }

  signUp(signUpRequest: SignUpRequest): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/register`, signUpRequest).pipe(
      map((user) => {
        this.store.setUser(user); //interceptor ili middleware?
        this.userSubject.next(user);
        return user;
      })
    );
  }

  signOut(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}
