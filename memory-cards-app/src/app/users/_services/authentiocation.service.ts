import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { StorageService } from 'src/app/shared';
import { environment } from 'src/environments/environment';

import { User } from '../_models';
import { SignInRequest, SignUpRequest, StorageUser } from './types';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<User | null>;
  user: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    const storedUser = this.storageService.getUser();
    this.userSubject = new BehaviorSubject<User | null>(storedUser);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  signIn(singInRequest: SignInRequest): Observable<User> {
    return this.http
      .post<StorageUser>(`${environment.apiUrl}/login`, singInRequest)
      .pipe(
        tap((response) => console.log(response)),
        map((response) => {
          this.storageService.setUser(response.user); //interceptor or middleware?
          this.storageService.setAccessToken(response.accessToken);
          this.userSubject.next(response.user);
          return response.user;
        }),
        catchError((err) => {
          throw 'error in source. Details: ' + err;
        })
      );
  }

  signUp(signUpRequest: SignUpRequest) {
    return this.http
      .post<StorageUser>(`${environment.apiUrl}/register`, signUpRequest)
      .pipe(
        tap((response) => console.log(response)),
        map((response) => {
          this.storageService.setUser(response.user);
          this.storageService.setAccessToken(response.accessToken);
          this.userSubject.next(response.user);
          return response.user;
        }),
        catchError((err) => {
          throw err;
        })
      );
  }

  signOut(): void {
    this.storageService.removeItem('user');
    this.storageService.removeItem('token');
    this.userSubject.next(null);
  }
}
