import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../models';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CardsResponse, DifficultyLevelRequest } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private chosenCategories: string[] = [];

  constructor(private http: HttpClient) {}

  chosen(categoryIds: string[]): void {
    this.chosenCategories = categoryIds;
  }

  updateDifficultyLevel(request: DifficultyLevelRequest) {
    return this.http
      .post<Card>(`${environment.parseUrl}/cards/${request.cardId}`, {
        level: request.newLevel,
      })
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(`${error}`));
        })
      );
  }

  generateQuiz(): Observable<Card[]> {
    let url = `${environment.parseUrl}/cards`;
    if (this.chosenCategories.length > 0) {
      url = `${url}?where={\"categoryId\":{\"$in\":[`;
      this.chosenCategories.forEach((categoryId) => {
        url += `\"${categoryId}\",`;
      });
      url.replace(/.$/, ']}}');
    }
    return this.http.get<CardsResponse>(url).pipe(
      map((data) => data.results),
      catchError((error) => {
        return throwError(() => new Error(`${error}`));
      })
    );
  }

  // getCards(): Observable<Card[]> {
  //   return this.http.get<CardsResponse>(`${environment.parseUrl}/cards`).pipe(
  //     map(data => data.results),
  //     catchError((error) => {
  //       return throwError(() => new Error(`${error}`));
  //     })
  //   );
  // }

  get(id: string): Observable<Card> {
    return this.http.get<Card>(`${environment.parseUrl}/cards/${id}`).pipe(
      catchError((error) => {
        return throwError(() => new Error(`${error}`));
      })
    );
  }

  getCardsByCategoryId(categoryId: string): Observable<Card[]> {
    return this.http
      .get<CardsResponse>(
        `${environment.parseUrl}/cards?where={\"categoryId\":\"${categoryId}\"}`
      )
      .pipe(
        map((data) => data.results),
        catchError((error) => {
          return throwError(() => new Error(`${error}`));
        })
      );
  }

  add(card: Card): Observable<Card> {
    return this.http.post<Card>(`${environment.parseUrl}/cards`, card).pipe(
      catchError((error) => {
        return throwError(() => new Error(`${error}`));
      })
    );
  }

  update(card: Card): Observable<Card> {
    return this.http
      .put<Card>(`${environment.parseUrl}/cards/${card.objectId}`, card)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(`${error}`));
        })
      );
  }
}
