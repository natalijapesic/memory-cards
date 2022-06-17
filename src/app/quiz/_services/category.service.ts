import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../_models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  categories$ = this.http
    .get<Category[]>(`${environment.apiUrl}/categories`)
    .pipe(
      catchError((error) => {
        throw new Error(`Error ${error}`);
      })
    );

  getCategory(id: number): Observable<Category> {
    return this.http
      .get<Category>(`${environment.apiUrl}/categories/${id}`)
      .pipe(
        tap((data) => console.log(data)),
        catchError((error) => {
          throw new Error(`Error ${error}`);
        })
      );
  }

  add(category: Category): Observable<Category> {
    return this.http
      .post<Category>(`${environment.apiUrl}/categories`, category)
      .pipe(
        tap((data) => console.log(data)),
        catchError((error) => {
          throw new Error(`Error ${error}`);
        })
      );
  }
}
