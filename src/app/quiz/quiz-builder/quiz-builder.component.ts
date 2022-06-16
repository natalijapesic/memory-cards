import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-quiz-builder',
  templateUrl: './quiz-builder.component.html',
  styleUrls: ['./quiz-builder.component.scss'],
})
export class QuizBuilderComponent {
  createdCards: number[] = [];
  changeDifficultyLevel: Subject<boolean> = new Subject();
  constructor() {}

  onAddCardForm() {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.createdCards, event.previousIndex, event.currentIndex);

    this.changeDifficultyLevel.next(true);

    console.log(this.createdCards);
  }

  onAddCard() {
    this.createdCards.push(Math.random() * 10);
  }
}
