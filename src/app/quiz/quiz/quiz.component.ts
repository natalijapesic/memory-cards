import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card } from '../_models';
import { CardService } from '../_services/card.service';
// import { PreviousCardState } from '../_types';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  errorMessage: string = '';
  countCorrectAnswers: number = 0;
  isPreviousAnswerCorrect: boolean = false;
  currentCard: number = 0;
  showResult: boolean = false;
  sub!: Subscription;
  cards: Card[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.sub = this.cardService.generateQuiz().subscribe({
      next: (cards) => {
        this.cards = cards.sort((a, b) => a.level - b.level);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  proportion = () => {
    return this.currentCard / this.cards.length;
  };

  isAnswerCorrect(isCorrect: boolean) {
    if (isCorrect) {
      this.countCorrectAnswers += 1;
      this.isPreviousAnswerCorrect = true;
    }
    this.currentCard < this.cards.length - 1
      ? (this.currentCard += 1)
      : (this.showResult = true);
  }

  previousQuestion() {
    if (this.currentCard > 0) {
      this.currentCard -= 1;
      if (this.isPreviousAnswerCorrect) this.countCorrectAnswers -= 1;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
