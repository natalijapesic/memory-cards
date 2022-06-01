import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../_models';
import { combineLatest, map, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private cardUrl = 'cards';
  private categorySelectedSubject = new Subject<number[]>();

  constructor(private http: HttpClient) {}

  combineOperator() {}

  // mapOperator() {
  //   // Mapping http response
  //   // map the emitted array
  //   // map each element in the array
  //   // poenta je da se transformise u element sa novom stukturom
  //   // transform each element
  //   // Response [{}] lista cartica koje oblika cartica a ne instance cartica
  //   let cards$ = this.getCards().pipe(
  //     // map(card => card.) card je ovde tipa Card[] a ne Card!!!!
  //     // map(cards => cards.map(card => card.answer + "test")), sada se svaka kartica gleda i prenosi kao answer pa je rezultat string[]
  //     // ovo moze da se iskoristi ako mapiram neku vrednost iz categories u specificnu carticu. Npr uzimam category name
  //     // kada se mapira novi objekat on u sebi sadrzi i taj novi properti
  //     map((cards) =>
  //       cards.map(
  //         (card) =>
  //           ({
  //             ...card,
  //             answer: card.answer + 'test',
  //             searchKey: [card.question],
  //           } as Card)
  //       )
  //     ),
  //     tap((data) => console.log('Products:', JSON.stringify(data)))
  //   );
  // }

  generateQuiz() {
    //gde ovo treba da se postavi?
    let categorySelectedAction$: Observable<number[]> =
      this.categorySelectedSubject.asObservable();

      const cards$ = combineLatest([
        this.getCards(),
        categorySelectedAction$
      ]).pipe(
        map(([cards, categoryIds]) =>
        cards.filter(card => categoryIds ? card.categoryId === categoryIds[0] : true)) 
      );
  }

  onSelected(categoryIds: string[]): void {
    const categoryIdsConverted = categoryIds.map((categoryId) => +categoryId);
    this.categorySelectedSubject.next(categoryIdsConverted);
  }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.cardUrl);
  }

  getCard(id: number): Observable<Card> {
    return this.http.get<Card>(`this.cardUrl${id}`);
  }
}
