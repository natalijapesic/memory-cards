import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private isLoading: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  constructor() {
    this.isLoading = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoading.asObservable();
  }

  setLoading(isLoading: boolean): void {
    this.isLoading.next(isLoading);
  }
}
