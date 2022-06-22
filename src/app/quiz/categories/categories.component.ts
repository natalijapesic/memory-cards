import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, map } from 'rxjs';
import { CardService } from '../_services/card.service';
import { CategoryService } from '../_services/category.service';

const categoryColors: string[] = [
  '#fcba03',
  '#fc6703',
  '#3ce655',
  '#3ce6a7',
  '#3cb8e6',
  '#d4393c',
];

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  errorMessage = '';
  categoriesState = new Map<number, boolean>();

  categories$ = this.categoryService.freshCategories$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  constructor(
    private categoryService: CategoryService,
    private cardService: CardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories$.pipe(
      map((categories) => {
        categories.map((category) =>
          this.categoriesState.set(category.id, false)
        );
      })
    );
  }

  selectCategory(categoryId: number) {
    let isSelected = this.categoriesState.get(categoryId);
    this.categoriesState.set(categoryId, !isSelected);
  }

  startQuiz() {
    const choosenCategory = [];
    for (let [id, state] of this.categoriesState)
      if (state) choosenCategory.push(id);
    this.cardService.chosen(choosenCategory);
    this.router.navigate(['/quiz']);
  }

  buttonCategoryColor = (categoryId: number): string => {
    return categoryColors[categoryId % 6];
  };
}
