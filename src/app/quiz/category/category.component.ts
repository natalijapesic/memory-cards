import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { Card, Category } from '../_models';
import { CardService } from '../_services/card.service';
import { CategoryService } from '../_services/category.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  categoryId: number = 0;
  errorMessage: string = '';
  subscribeCC!: Subscription;
  subscribeUDL!: Subscription;
  category: Category | undefined;
  cards: Card[] = [];

  constructor(
    private categoryService: CategoryService,
    private cardService: CardService,
    route: ActivatedRoute
  ) {
    this.categoryId = Number(route.snapshot.params['id']);
  }
  ngOnDestroy(): void {
    this.subscribeCC.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribeCC = forkJoin({
      categoryResponse: this.categoryService.getCategory(this.categoryId),
      cardsResponse: this.cardService.getCardsByCategoryId(this.categoryId),
    }).subscribe({
      next: (data) => {
        this.category = data.categoryResponse;
        this.cards = data.cardsResponse;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }

  onApplyChanges() {
    this.subscribeUDL = forkJoin(
      this.cards.map((card, index) =>
        this.cardService.updateDifficultyLevel({
          cardId: card.id,
          newLevel: index,
        })
      )
    ).subscribe({
      // next: (data) => console.log(data),
      // error: (err) => (this.errorMessage = err),
    });
  }
}
