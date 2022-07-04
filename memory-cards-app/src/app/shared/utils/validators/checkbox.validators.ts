import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minOneCorrect(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const checkedAnswers: boolean[] = control.value;

    if (checkedAnswers.length == 0) return { noCorrectAnswer: true };

    if (!checkedAnswers.some((element) => element === true))
      return { noCorrectAnswer: true };

    return null;
  };
}

export function minOneWord(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const createdAnswers: string[] = control.value;

    if (createdAnswers.length == 0) return { noAnswers: true };

    if (createdAnswers.some((answer) => answer === ""))
      return { emptyAnswers: true };

    return null;
  };
}
