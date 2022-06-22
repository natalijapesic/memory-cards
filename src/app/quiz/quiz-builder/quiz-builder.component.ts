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
} from 'rxjs';
import { StorageService } from 'src/app/shared';
import { User } from 'src/app/users/_models';
import { Category } from '../_models';
import { CategoryService } from '../_services/category.service';

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
  createdCards: number[] = [];
  changeDifficultyLevel: Subject<boolean> = new Subject();
  subOnCategories!: Subscription;

  constructor(
    private categoryService: CategoryService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.subOnCategories = this.categoryService.freshCategories$.subscribe({
      next: (categories: Category[]) => (this.categories = categories),
    });

    this.filteredCategories$ = this.filterCategory.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      map((name) =>
        name ? this._filterSubstring(name) : this.categories?.slice()
      ),
      tap((filtered) => {
        if (filtered) this.selectedCategoryId = this._findCategoryId(filtered);
      })
    );
  }

  onDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.createdCards, event.previousIndex, event.currentIndex);
    this.changeDifficultyLevel.next(true);
  }

  onAddCard(): void {
    this.createdCards.push(Math.random() * 10);
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
}
