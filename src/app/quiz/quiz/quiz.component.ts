import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card } from '../_models';
import { CardService } from '../_services/card.service';
import { PreviousCardState } from '../_types';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  errorMessage: string = '';
  correctAnswers: number = 0;
  currentCard: PreviousCardState = {
    serial: 0,
    isCorrectAnswered: false,
  };
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

  proportion = () => {
    return this.currentCard.serial / this.cards.length;
  };

  isAnswerCorrect(isCorrect: boolean) {
    if (isCorrect) this.correctAnswers += 1;
    this.currentCard.serial < this.cards.length - 1
      ? (this.currentCard.serial += 1)
      : (this.showResult = true);
  }

  previousQuestion() {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
