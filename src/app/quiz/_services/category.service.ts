import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  merge,
  Observable,
  tap,
  concatMap,
  map,
  of,
} from 'rxjs';
import { Action, ActionType } from 'src/app/shared/shared/edit-action';
import { environment } from 'src/environments/environment';
import { Category } from '../_models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  private emptyCategory!: Category;
  categories$ = this.categoriesSubject.asObservable();

  // Action Stream for adding/updating/deleting
  private categoryModifiedSubject = new BehaviorSubject<Action<Category>>({
    item: this.emptyCategory,
    action: 'none',
  });

  categoryModifiedAction$ = this.categoryModifiedSubject.asObservable();

  freshCategories$ = merge(
    this.categories$,
    this.categoryModifiedAction$.pipe(
      concatMap((operation) => this.saveCategory(operation)),
      concatMap(() => this.getCategories())
    )
  );

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`).pipe(
      catchError((error) => {
        throw new Error(`Error ${error}`);
      })
    );
  }

  saveCategory(operation: Action<Category>): Observable<Action<Category>> {
    const category = operation.item;
    if (operation.action === 'add') {
      return this.add(category, operation.action);
    }

    return of(operation);
  }

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

  add(category: Category, action: ActionType): Observable<Action<Category>> {
    return this.http
      .post<Category>(`${environment.apiUrl}/categories`, category)
      .pipe(
        map((category) => ({ item: category, action })),
        catchError((error) => {
          throw new Error(`Error ${error}`);
        })
      );
  }

  addCategory(newCategory: Category): void {
    this.categoryModifiedSubject.next({ item: newCategory, action: 'add' });
  }
}
