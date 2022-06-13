import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, tap } from 'rxjs';
import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-quiz-builder',
  templateUrl: './quiz-builder.component.html',
  styleUrls: ['./quiz-builder.component.scss'],
})
export class QuizBuilderComponent implements OnInit {
  errorMessage: String = '';
  question = new BehaviorSubject<string>('');
  answers = new Map<String, boolean>();

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

  onAddOption() {}
}
