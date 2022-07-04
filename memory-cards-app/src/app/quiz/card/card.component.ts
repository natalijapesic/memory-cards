import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { calculateMaxPoints, pointsPerAnswer } from 'src/app/shared';
import { Card } from '../../shared/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  form: FormGroup;

  @Output()
  correctPercentage = new EventEmitter<number>();
  @Input()
  public card: Card | undefined;

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      selectedAnswers: new FormArray([]),
    });
  }

  onCheckboxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedAnswers = this.form.controls['selectedAnswers'] as FormArray;
    if (input.checked) {
      selectedAnswers.push(new FormControl(input.value));
    } else {
      const index = selectedAnswers.controls.findIndex(
        (x) => x.value === input.value
      );
      selectedAnswers.removeAt(index);
    }
  }

  onAnswer(): void {
    const selectedAnswers: string[] = (
      this.form!.controls['selectedAnswers'] as FormArray
    ).value;
    if (selectedAnswers.length === 0)
      alert('Please choose at least one answer');

    let countCorrect = 0;
    selectedAnswers.forEach((answer) => {
      this.card!.correctAnswers.includes(answer)
        ? (countCorrect += 1)
        : (countCorrect -= 1);
    });
    let result = pointsPerAnswer(this.card!) * countCorrect;
    result <= 0
      ? this.correctPercentage.emit(0)
      : this.correctPercentage.emit(result / calculateMaxPoints(this.card!));

    this.form = this.formBuilder.group({
      selectedAnswers: new FormArray([]),
    });
  }

  ngOnInit(): void {}
}
