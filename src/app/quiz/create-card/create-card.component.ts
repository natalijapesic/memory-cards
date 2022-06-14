import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, tap } from 'rxjs';
import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss'],
})
export class CreateCardComponent implements OnInit {
  errorMessage: String = '';
  question = new BehaviorSubject<string>('');
  answers = new Map<String, boolean>();
  answerOptions: number = 0;
  constructor(private categoryService: CategoryService) {}

  categories$ = this.categoryService.categories$.pipe(
    tap((data) => console.log(JSON.stringify(data))),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  ngOnInit(): void {
    this.question.subscribe((input) => console.log(input));
  }

  createRange() {
    return new Array(this.answerOptions);
  }
  onAddOption() {
    this.answerOptions += 1;
  }
}
