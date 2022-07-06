import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { CardService, CategoryService } from '../../shared/services';

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
  categoriesState = new Map<string, boolean>();

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
      tap((data) => console.log(data)),
      map((categories) => {
        categories.map((category) =>
          this.categoriesState.set(category.objectId, false)
        );
      })
    );
  }

  selectCategory(categoryId: string) {
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

  buttonCategoryColor = (categoryId: string): string => {
    return categoryColors[categoryId.length  % 6];
  };
}
