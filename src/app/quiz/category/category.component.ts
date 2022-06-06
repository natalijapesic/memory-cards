import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { Card, Category } from '../_models';
import { CardService } from '../_services/card.service';
import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  categoryId: number = 0;
  errorMessage: string = '';
  sub!: Subscription;
  categoryResponse: Category | undefined;
  cardsResponse: Card[] = [];

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
        this.categoryResponse = data.categoryResponse;
        this.cardsResponse = data.cardsResponse;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
