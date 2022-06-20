import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { CardService } from '../_services/card.service';
import { CategoryService } from '../_services/category.service';

const numberToHex = (component: number): string => {
  let hex = component.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
};

const rgbToHex = (rgb: number[]): string => {
  return `#${numberToHex(rgb[0])}${numberToHex(rgb[1])}${numberToHex(rgb[2])}`;
};

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  errorMessage = '';
  categoriesState = new Map<number, boolean>();
  

  categories$ = this.categoryService.freshCategories$.pipe(
    tap((data) => console.log(JSON.stringify(data) + 'categories')),
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
    if (categoryId == 0) categoryId = 99;
    let rgb: number[] = [255, 255, 0];
    categoryId % 2 === 0
      ? (rgb[1] = Number((255 / (100 - categoryId) / 10).toFixed()))
      : (rgb[0] = Number(((255 * categoryId) / 100).toFixed()));

    return rgbToHex(rgb);
  };
}
