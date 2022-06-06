import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
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
}
