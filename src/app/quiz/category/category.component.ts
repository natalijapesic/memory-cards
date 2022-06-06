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
  sub!: Subscription;
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
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = forkJoin({
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
    console.log(this.cards);
  }
}
