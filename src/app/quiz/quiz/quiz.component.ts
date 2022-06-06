import * as core from '@angular/core';
import { OnDestroy, OnInit } from '@angular/core';
import { catchError, EMPTY, Observable, Subscription } from 'rxjs';
import { Card } from '../_models';
import { CardService } from '../_services/card.service';

@core.Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  errorMessage: string = '';
  correctAnswers: number = 0;
  currentCard: number = 0;
  showResult: boolean = false;

  sub!: Subscription;
  cards: Card[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.sub = this.cardService.generateQuiz().subscribe({
      next: (cards) => (this.cards = cards),
      error: (err) => (this.errorMessage = err),
    });
  }

  isAnswerCorrect(isCorrect: boolean) {
    if (isCorrect) this.correctAnswers += 1;
    this.currentCard < this.cards.length - 1
      ? (this.currentCard += 1)
      : (this.showResult = true);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
