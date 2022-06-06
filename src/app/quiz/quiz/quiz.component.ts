import * as core from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { CardService } from '../_services/card.service';

@core.Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  errorMessage = '';

  constructor(private cardService: CardService) {}

  cards$ = this.cardService.generateQuiz().pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  isAnswerCorrent(value: boolean) {
    console.log(value);
  }
}
