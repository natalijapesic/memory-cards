import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { catchError, EMPTY, map, shareReplay, tap } from 'rxjs';
import { Card, Category } from '../_models';
import { CardService } from '../_services/card.service';
import { CategoryService } from '../_services/category.service';

type FormGroupControls = { [key: string]: AbstractControl };

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss'],
})
export class CreateCardComponent {
  form: FormGroup;
  submitted: boolean;
  errorMessage: string;
  answerOptions: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private cardService: CardService
  ) {
    this.submitted = false;
    this.errorMessage = '';

    //How to set Validators and FormControlOptions in FormControl constructor at the same time?
    this.form = this.formBuilder.group(
      {
        category: new FormControl('', { initialValueIsDefault: true }),
        question: new FormControl('', { initialValueIsDefault: true }),
        answers: new FormArray([]),
        isCorrectAnswer: new FormArray([]),
      },
      {
        updateOn: 'submit',
      }
    );

    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].setValidators(Validators.required);
    });

    // this.form.controls['isCorrectAnswer'].addValidators(
    //   Validators.requiredTrue
    // );

    //Is validation applied to each FormControl element?
    //this.form.setValidators(Validators.required);
  }

  categories$ = this.categoryService.categories$.pipe(
    tap((data) => console.log(JSON.stringify(data))),
    shareReplay(1),
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  onSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.form.controls['category'] = new FormControl(input.value);
  }

  onCheckboxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const isCorrectAnswer = this.form.controls['isCorrectAnswer'] as FormArray;
    const checkedControl: AbstractControl = isCorrectAnswer.at(
      Number.parseInt(input.value)
    );
    checkedControl.patchValue(input.checked);
  }

  onSaveCard() {
    this.submitted = true;
    let selectedCategory: Category | undefined = undefined;
    if (this.form.valid) {
      const formValues = this.form.value;
      this.categories$.forEach((categories) => {
        selectedCategory = categories.find((category) => {
          category.name === formValues.category;
        });
      });
      let correctAnswers: string[] = [];

      let isCorrectAnswers: boolean[] = formValues.isCorrectAnswer;
      isCorrectAnswers.forEach((isCorrect, index) => {
        if (isCorrect) correctAnswers.push(formValues.answers[index]);
      });
      console.log(selectedCategory);
      this.cardService
        .add(
          new Card(
            formValues.question,
            formValues.answers,
            selectedCategory!.id,
            correctAnswers
          )
        )
        .subscribe({
          next: (user: Card) => console.log(user),
          error: (reason: string) => console.log(reason),
        });
    }
  }

  get formControl(): FormGroupControls {
    return this.form.controls;
  }

  get answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  onAddOption() {
    const answers = this.form.controls['answers'] as FormArray;
    answers.push(new FormControl(''));
    const isCorrectAnswer = this.form.controls['isCorrectAnswer'] as FormArray;
    isCorrectAnswer.push(new FormControl(false));
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }
}
