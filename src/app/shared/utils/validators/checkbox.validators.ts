import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function atLeastOneCorrect(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const checkedAnswers: boolean[] = control.value;

    if (checkedAnswers.length == 0) return { noCorrectAnswer: true };

    if (!checkedAnswers.some((element) => element === true))
      return { noCorrectAnswer: true };

    return null;
  };
}
