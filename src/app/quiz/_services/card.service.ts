import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../_models';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DifficultyLevelRequest } from './types';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private chosenCategories: number[] = [];

  constructor(private http: HttpClient) {}

  combineOperator() {}

  chosen(categoryIds: number[]): void {
    this.chosenCategories = categoryIds;
  }

  updateDifficultyLevel(request: DifficultyLevelRequest) {
    return this.http
      .patch<Card>(`${environment.apiUrl}/cards/${request.cardId}`, {
        level: request.newLevel,
      })
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(`${error}`));
        })
      );
  }

  generateQuiz(): Observable<Card[]> {
    let url = `${environment.apiUrl}/cards?`;
    if (this.chosenCategories.length > 0) {
      this.chosenCategories.forEach((categoryId) => {
        url += `categoryId=${categoryId}&`;
      });
    }
    return this.http.get<Card[]>(url).pipe(
      catchError((error) => {
        return throwError(() => new Error(`${error}`));
      })
    );
  }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(`${environment.apiUrl}/cards`).pipe(
      catchError((error) => {
        console.log(`Handling error locally and rethrowing it ...`, error);
        return throwError(() => new Error(`${error}`));
      })
    );
  }

  get(id: number): Observable<Card> {
    return this.http.get<Card>(`${environment.apiUrl}/cards/${id}`).pipe(
      catchError((error) => {
        console.log(`Handling error locally and rethrowing it ...`, error);
        return throwError(() => new Error(`${error}`));
      })
    );
  }

  getCardsByCategoryId(categoryId: number): Observable<Card[]> {
    return this.http
      .get<Card[]>(`${environment.apiUrl}/cards?categoryId=${categoryId}`)
      .pipe(
        catchError((error) => {
          console.log(`Handling error locally and rethrowing it ...`, error);
          return throwError(() => new Error(`${error}`));
        })
      );
  }

  add(card: Card): Observable<Card> {
    return this.http.post<Card>(`${environment.apiUrl}/cards`, card).pipe(
      catchError((error) => {
        console.log(`Handling error locally and rethrowing it ...`, error);
        return throwError(() => new Error(`${error}`));
      })
    );
  }
}
