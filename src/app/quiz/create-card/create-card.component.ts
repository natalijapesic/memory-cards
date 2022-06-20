import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { atLeastOneCorrect } from 'src/app/_helpers/custom.validators';
import { Card, Category } from '../_models';
import { CardService } from '../_services/card.service';

type FormGroupControls = { [key: string]: AbstractControl };

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss'],
})
export class CreateCardComponent implements OnInit, OnDestroy {
  //parent: quiz-builder
  @Input()
  level: number;
  @Input()
  checkDifficultyLevelChange!: Subject<boolean>;
  @Input()
  selectedCategoryId: number;

  form: FormGroup;
  errorMessage: string;
  created: Card | undefined;
  sub!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private cardService: CardService
  ) {
    this.errorMessage = '';
    this.level = 0;
    this.selectedCategoryId = 0;

    this.form = this.formBuilder.group({
      question: new FormControl('', { initialValueIsDefault: true }),
      answers: new FormArray([]),
      isCorrectAnswer: new FormArray([], { updateOn: 'submit' }),
    });

    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].setValidators(Validators.required);
    });
    this.form.controls['isCorrectAnswer'].addValidators(atLeastOneCorrect());
  }

  ngOnInit(): void {
    this.sub = this.checkDifficultyLevelChange.subscribe({
      next: (changed: boolean) => {
        if (changed && this.created && this.level !== this.created!.level) {
          this.cardService
            .updateDifficultyLevel({
              cardId: this.created!.id,
              newLevel: this.level,
            })
            .subscribe();
        }
      },
    });
  }

  onCheckboxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const isCorrectAnswer = this.form.controls['isCorrectAnswer'] as FormArray;
    const checkedControl: AbstractControl = isCorrectAnswer.at(
      Number.parseInt(input.value)
    );
    checkedControl.patchValue(input.checked);
  }

  getFormData(): Card | null {
    if (this.form.touched) {
      this.form.markAsUntouched();
      const formValues = this.form.value;

      let correctAnswers: string[] = [];

      let isCorrectAnswers: boolean[] = formValues.isCorrectAnswer;
      isCorrectAnswers.forEach((isCorrect, index) => {
        if (isCorrect) correctAnswers.push(formValues.answers[index]);
      });

      return new Card(
        formValues.question,
        formValues.answers,
        this.selectedCategoryId,
        correctAnswers,
        this.level
      );
    } else return null;
  }

  onSaveCard() {
    this.cardService.add(this.getFormData()!).subscribe({
      next: (card: Card) => {
        this.created = card;
        console.log(this.created);
      },
      error: (reason: string) => console.log(reason),
    });
  }

  onChangeCard() {
    let changed: Card | null = this.getFormData();
    if (changed) {
      changed.id = this.created!.id;
      changed.level = this.level;

      this.cardService.update(changed).subscribe({
        next: (card: Card) => {
          this.created = card;
          console.log(this.created);
        },
        error: (reason: string) => console.log(reason),
      });
    }
  }

  onAddOption() {
    this.answers.push(new FormControl(''));
    const isCorrectAnswers = this.form.controls['isCorrectAnswer'] as FormArray;
    isCorrectAnswers.push(new FormControl(false));
  }

  get formControl(): FormGroupControls {
    return this.form.controls;
  }

  get answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
