import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, shareReplay, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`).pipe(
      tap((data) => console.log('Categories', JSON.stringify(data))),
      catchError((error) => {
        console.log(`Handling error locally and rethrowing it ...`, error);
        return throwError(() => new Error(`${error}`));
      })
    );
  }

}
