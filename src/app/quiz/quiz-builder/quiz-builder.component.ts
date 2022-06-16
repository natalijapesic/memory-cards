import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-builder',
  templateUrl: './quiz-builder.component.html',
  styleUrls: ['./quiz-builder.component.scss'],
})
export class QuizBuilderComponent implements OnInit {
  createdCards: number[] = [];
  constructor() {}

  ngOnInit(): void {}

  onAddCardForm() {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.createdCards, event.previousIndex, event.currentIndex);
    console.log(this.createdCards);
  }

  onAddCard() {
    this.createdCards.push(Math.random() * 10);
  }

  onSave() {}
}
