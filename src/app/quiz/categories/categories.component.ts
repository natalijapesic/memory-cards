import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from '../_models';
import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  errorMessage = '';
  sub!: Subscription;
  selectedCategories = new Map<number, boolean>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.sub = this.categoryService.getCategories().subscribe({
      next: (categories) => (this.categories = categories),
      error: (err) => (this.errorMessage = err),
    });

    this.categories.map((category) => {
      this.selectedCategories.set(category.id, false);
    });
  }

  selectCategory(categoryId: number) {
    let isSelected = this.selectedCategories.get(categoryId);
    this.selectedCategories.set(categoryId, !isSelected);
  }

  startQuiz() {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
