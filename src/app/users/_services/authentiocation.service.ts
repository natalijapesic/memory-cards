import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../_models';
import { StorageService } from './storage.service';
import { SignInRequest, SignUpRequest } from './types';

@Injectable({
  providedIn: 'root',
})
export class AuthentiocationService {
  private userSubject: BehaviorSubject<User | null>;
  private user: Observable<User | null>;

  constructor(private http: HttpClient, private storage: StorageService) {
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
    return this.http
      .post<User>(`${environment.apiUrl}/login`, singInRequest)
      .pipe(
        tap((user) => console.log(user)),
        map((user) => {
          this.storage.setUser(user); //interceptor ili middleware?
          this.userSubject.next(user);
          return user;
        }),
        catchError((err) => {
          throw 'error in source. Details: ' + err;
        })
      );
  }

  signUp(signUpRequest: SignUpRequest) {
    return this.http
      .post<User>(`${environment.apiUrl}/register`, signUpRequest)
      .pipe(
        map((user) => {
          this.storage.setUser(user);
          this.userSubject.next(user);
          return user;
        }),
        catchError((err, caught) => caught)
      );
  }

  signOut(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}
