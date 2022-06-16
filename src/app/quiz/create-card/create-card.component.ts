import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { catchError, EMPTY, shareReplay, tap } from 'rxjs';
import { atLeastOneCorrect } from 'src/app/_helpers/custom.validators';
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
  errorMessage: string;
  created: Card | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private cardService: CardService
  ) {
    this.errorMessage = '';

    this.form = this.formBuilder.group({
      category: new FormControl('', { initialValueIsDefault: true }),
      question: new FormControl('', { initialValueIsDefault: true }),
      answers: new FormArray([]),
      isCorrectAnswer: new FormArray([], { updateOn: 'submit' }),
    });

    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].setValidators(Validators.required);
    });
    this.form.controls['isCorrectAnswer'].addValidators(atLeastOneCorrect());
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

  getFormData(): Card {
    let selectedCategory: Category | undefined = undefined;
    const formValues = this.form.value;
    this.categories$.forEach((categories) => {
      selectedCategory = categories.find(
        (category) => category.name === formValues.category
      );
    });

    let correctAnswers: string[] = [];

    let isCorrectAnswers: boolean[] = formValues.isCorrectAnswer;
    isCorrectAnswers.forEach((isCorrect, index) => {
      if (isCorrect) correctAnswers.push(formValues.answers[index]);
    });

    return new Card(
      formValues.question,
      formValues.answers,
      selectedCategory!.id,
      correctAnswers
    );
  }

  onSaveCard() {
    this.cardService.add(this.getFormData()).subscribe({
      next: (card: Card) => {
        this.created = card;
        console.log(this.created);
      },
      error: (reason: string) => console.log(reason),
    });
  }

  onChangeCard() {
    let changed: Card = this.getFormData();
    changed.id = this.created!.id;
    changed.level = this.created!.level;

    this.cardService.update(changed).subscribe({
      next: (card: Card) => {
        this.created = card;
        console.log(this.created);
      },
      error: (reason: string) => console.log(reason),
    });
  }

  get formControl(): FormGroupControls {
    return this.form.controls;
  }

  get answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  onAddOption() {
    this.answers.push(new FormControl(''));
    const isCorrectAnswers = this.form.controls['isCorrectAnswer'] as FormArray;
    isCorrectAnswers.push(new FormControl(false));
  }
}
