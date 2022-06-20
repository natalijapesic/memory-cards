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
  debounce,
  timer,
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
  filteredCategories?: Observable<Category[] | undefined>;
  sub!: Subscription;
  enableAddCategory: boolean;
  buildQuiz: boolean;
  selectedCategoryId: number;

  createdCards: number[] = [];
  changeDifficultyLevel: Subject<boolean> = new Subject();
  changeDificultyLevelAction = this.changeDifficultyLevel.asObservable();

  constructor(
    private categoryService: CategoryService,
    private storageService: StorageService
  ) {
    this.enableAddCategory = false;
    this.buildQuiz = false;
    this.selectedCategoryId = 0;
  }

  ngOnInit(): void {
    this.sub = this.categoryService.freshCategories$.subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
    });

    this.filteredCategories = this.filterCategory.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value?.name)),
      map((name) => (name ? this._filter(name) : this.categories?.slice()))
    );

    this.changeDificultyLevelAction.pipe(
      debounce(() => timer(1000)),
      tap((data) => console.log(data))
    );
  }

  private _filter(name: string): Category[] | undefined {
    this.enableAddCategory = false;

    const filterValue = name.toLowerCase();
    let result = this.categories?.filter((category) =>
      category.name.toLowerCase().includes(filterValue)
    );
    if (result?.length === 0) this.enableAddCategory = true;
    return result;
  }

  onAddCategory(): void {
    const filter: string = this.filterCategory.value;
    const user: User = this.storageService.getUser();
    if (filter && user) {
      this.categoryService.addCategory(new Category(filter, user.id, ''));
    }
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.createdCards, event.previousIndex, event.currentIndex);

    this.changeDifficultyLevel.next(true);
  }

  onAddCard(): void {
    this.createdCards.push(Math.random() * 10);
  }

  onBuildQuiz(): void {
    this.buildQuiz = true;
    const selectedCategory: Category[] | undefined = this._filter(
      this.filterCategory.value
    );
    this.selectedCategoryId = selectedCategory![0].id;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
