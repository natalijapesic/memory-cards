import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '..';
import { AuthenticationService } from '../../users/_services';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private storageService: StorageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    const user = this.authenticationService.userValue;
    if (user) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.storageService.getAccessToken()}`,
        },
      });
    }

    return next.handle(request);
  }
}
