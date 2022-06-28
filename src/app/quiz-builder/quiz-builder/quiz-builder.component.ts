import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  Observable,
  Subject,
  Subscription,
  startWith,
  map,
  tap,
  debounceTime,
  shareReplay,
} from 'rxjs';
import { StorageService } from 'src/app/shared';
import { CardService } from 'src/app/shared/services/card.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { User } from 'src/app/users/_models';
import { Card, Category } from '../../shared/models';

@Component({
  selector: 'app-quiz-builder',
  templateUrl: './quiz-builder.component.html',
  styleUrls: ['./quiz-builder.component.scss'],
})
export class QuizBuilderComponent implements OnInit, OnDestroy {
  filterCategory = new FormControl('', [Validators.required]);
  categories?: Category[];
  filteredCategories$?: Observable<Category[] | undefined>;
  selectedCategoryId: number | undefined;
  createdCardComponents: number[] = [];
  createdCards: Card[] = [];
  changeDifficultyLevel: Subject<boolean> = new Subject();

  subOnCategories!: Subscription;
  subOnCardsByCategoryId: Subscription | undefined;

  constructor(
    private categoryService: CategoryService,
    private storageService: StorageService,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    this.subOnCategories = this.categoryService.freshCategories$.subscribe({
      next: (categories: Category[]) => (this.categories = categories),
    });

    this.filteredCategories$ = this.filterCategory.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      shareReplay(1),
      map((name) =>
        name ? this._filterSubstring(name) : this.categories?.slice()
      ),
      tap((filtered) => {
        if (filtered && filtered.length > 0) {
          console.log('natalia');
          console.log(filtered);
          this.selectedCategoryId = this._findCategoryId(filtered);
          this.subOnCardsByCategoryId = this.cardService
            .getCardsByCategoryId(this.selectedCategoryId!)
            .subscribe({
              next: (cards: Card[]) => {
                this.createdCards = cards;
                this.createdCards.sort((a, b) => a.level - b.level);
                this._initCardComponents(cards.length);
              },
            });
        }
      })
    );
  }

  onDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.createdCardComponents,
      event.previousIndex,
      event.currentIndex
    );
    this.changeDifficultyLevel.next(true);
  }

  onAddCard(): void {
    this.createdCardComponents.push(Math.random() * 10);
  }

  onCreateCategory(): void {
    const filter: string = this.filterCategory.value;
    const user: User = this.storageService.getUser();

    if (filter && user) {
      const category = new Category(filter, user.id);
      this.categoryService.addCategory(category);
    }
  }

  ngOnDestroy(): void {
    this.subOnCategories.unsubscribe();
  }

  private _filterSubstring(name: string): Category[] | undefined {
    const filterValue = name.toLowerCase();

    return this.categories?.filter((category) =>
      category.name.toLowerCase().includes(filterValue)
    );
  }

  private _findCategoryId = (categories: Category[]): number | undefined => {
    let createdCategory;
    if (
      categories &&
      this.filterCategory.value &&
      this.filterCategory.value != ''
    ) {
      createdCategory = categories.find(
        (category) =>
          category.name.toLowerCase() ===
          this.filterCategory.value.toLowerCase()
      );
    }

    return createdCategory?.id;
  };

  private _initCardComponents(numberOfCreatedCards: number) {
    this.createdCardComponents = [];
    for (let i = 0; i < numberOfCreatedCards; i++)
      this.createdCardComponents.push(Math.random() * 10);
  }
}
