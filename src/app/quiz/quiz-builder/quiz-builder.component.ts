import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  @ViewChild('dragAngDropDiv')
  dragAngDropDiv: ElementRef | undefined;

  filterCategory = new FormControl('', [Validators.required]);
  categories?: Category[];
  filteredCategories$?: Observable<Category[] | undefined>;
  selectedCategoryId: number | undefined;
  createdCards: number[] = [];
  changeDifficultyLevel: Subject<boolean> = new Subject();
  subOnChangeLevel!: Subscription;

  constructor(
    private categoryService: CategoryService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.subOnChangeLevel = this.categoryService.freshCategories$.subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
    });

    this.filteredCategories$ = this.filterCategory.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      map((value) => (typeof value === 'string' ? value : value?.name)),
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
      this.categoryService.addCategory(new Category(filter, user.id));
      this.selectedCategoryId = this._findCategoryId(this.categories);
    }
  }

  ngOnDestroy(): void {
    this.subOnChangeLevel.unsubscribe();
  }

  private _filterSubstring(name: string): Category[] | undefined {
    const filterValue = name.toLowerCase();

    return this.categories?.filter((category) =>
      category.name.toLowerCase().includes(filterValue)
    );
  }

  private _findCategoryId = (
    categories: Category[] | undefined
  ): number | undefined => {
    if (categories != undefined) {
      const category = categories?.find(
        (category) =>
          category.name.toLowerCase() ===
          this.filterCategory.value.toLowerCase()
      );
    }

    return undefined;
  };
}
