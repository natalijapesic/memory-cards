import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../_models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  public checkedAnswer = '';

  @Output()
  isCorrect = new EventEmitter<boolean>();
  @Input()
  public card: Card | null = null;

  constructor() {}

  checkAnswer() {
    this.isCorrect.emit(this.checkedAnswer === this.card?.correctAnswer);
  }

  ngOnInit(): void {}
}
