import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subject, Subscription, startWith, map, tap } from 'rxjs';
import { User } from 'src/app/users/_models';
import { StorageService } from 'src/app/users/_services';
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

  createdCards: number[] = [];
  changeDifficultyLevel: Subject<boolean> = new Subject();

  constructor(
    private categoryService: CategoryService,
    private storageService: StorageService
  ) {
    this.enableAddCategory = false;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.categoryService.categories$.subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
    });

    this.filteredCategories = this.filterCategory.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value?.name)),
      map((name) => (name ? this._filter(name) : this.categories?.slice()))
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

  onAddCategory() {
    const filter = this.filterCategory.value;
    const user: User = this.storageService.getUser();
    if (filter && user) {
      this.categoryService
        .add(new Category(filter, user.id, ''))
        .subscribe({ next: (data) => console.log(data) });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.createdCards, event.previousIndex, event.currentIndex);

    this.changeDifficultyLevel.next(true);
  }

  onAddCard() {
    this.createdCards.push(Math.random() * 10);
  }
}
