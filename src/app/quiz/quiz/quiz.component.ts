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
  countPercentage: number = 0;
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

  proportion = (isResult: boolean) => {
    return !isResult
      ? this.currentCard / this.cards.length
      : this.countPercentage / this.cards.length;
  };

  isAnswerCorrect(correctPercentage: number) {
    console.log(`result: ${correctPercentage}`);
    this.countPercentage += correctPercentage;
    this.currentCard < this.cards.length - 1
      ? (this.currentCard += 1)
      : (this.showResult = true);

    console.log(`countPercentage: ${this.countPercentage}`);
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
