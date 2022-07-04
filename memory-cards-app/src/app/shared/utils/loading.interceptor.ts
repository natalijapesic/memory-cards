import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.setLoading(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.spinnerService.setLoading(false);
      })
    );
  }
}
