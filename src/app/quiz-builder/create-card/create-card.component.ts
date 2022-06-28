import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime, Subject, Subscription } from 'rxjs';
import {
  minOneCorrect,
  minOneWord,
} from 'src/app/shared/utils/validators/checkbox.validators';
import { CardService } from 'src/app/shared/services/card.service';
import { Card } from '../../shared/models';

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
  selectedCategoryId: number | undefined;
  @Input()
  formData: Card | undefined;

  form: FormGroup;
  // created: Card | undefined;
  subOnLastChanges!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private cardService: CardService
  ) {
    this.level = 0;
    this.selectedCategoryId = 0;

    this.form = this.formBuilder.group({
      question: new FormControl('', { initialValueIsDefault: true }),
      answers: new FormArray([], { updateOn: 'change' }),
      isCorrectAnswer: new FormArray([]),
    });

    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].setValidators(Validators.required);
    });

    this.isCorrectAnswer.addValidators(minOneCorrect());
    this.answers.addValidators([Validators.minLength(2), minOneWord()]);
  }

  ngOnInit(): void {
    this._initForm();

    const lastChanges$ = this.checkDifficultyLevelChange.pipe(
      debounceTime(1500)
    );

    this.subOnLastChanges = lastChanges$.subscribe({
      next: (changed: boolean) => {
        if (changed && this.formData && this.level !== this.formData!.level) {
          this.cardService
            .updateDifficultyLevel({
              cardId: this.formData!.id,
              newLevel: this.level,
            })
            .subscribe();
        }
      },
    });
  }

  private _initCheckedControl(answerId: number, isChecked: boolean): void {
    const checkedControl: AbstractControl = this.isCorrectAnswer.at(answerId);
    checkedControl.patchValue(isChecked);
  }

  onCheckboxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._initCheckedControl(Number.parseInt(input.value), input.checked);
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
        this.selectedCategoryId!,
        correctAnswers,
        this.level
      );
    } else return null;
  }

  onSaveCard() {
    const newCard = this.getFormData();
    if (newCard)
      this.cardService.add(newCard).subscribe({
        next: (card: Card) => {
          this.formData = card;
          console.log(this.formData);
        },
        error: (reason: string) => console.log(reason),
      });
  }

  onChangeCard() {
    let changed: Card | null = this.getFormData();
    if (changed) {
      changed.id = this.formData!.id;
      changed.level = this.level;

      this.cardService.update(changed).subscribe({
        next: (card: Card) => {
          this.formData = card;
          console.log(this.formData);
        },
        error: (reason: string) => console.log(reason),
      });
    }
  }

  onAddOption() {
    this.answers.push(new FormControl(''));
    this.isCorrectAnswer.push(new FormControl(false));
  }

  ngOnDestroy(): void {
    this.subOnLastChanges.unsubscribe();
  }

  private _initForm(): void {
    if (!this.formData) return;
    this.form.reset();
    this.level = this.formData.level;
    this.selectedCategoryId = this.formData.categoryId;

    const correctAnswers: string[] = this.formData.correctAnswers;

    this.formData.answers.forEach((answer) => {
      this.answers.push(new FormControl(answer));
      const isCorrect = correctAnswers.includes(answer);
      this.isCorrectAnswer.push(new FormControl(isCorrect));
    });

    this.question.patchValue(this.formData.question);
  }

  get formControl(): FormGroupControls {
    return this.form.controls;
  }

  get answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  get question(): FormControl {
    return this.form.get('question') as FormControl;
  }

  get isCorrectAnswer(): FormArray {
    return this.form.get('isCorrectAnswer') as FormArray;
  }
}
