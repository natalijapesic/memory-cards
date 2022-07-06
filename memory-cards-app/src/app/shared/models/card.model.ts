export class Card {
  objectId: string;
  question: string;
  answers: string[];
  categoryId: string;
  correctAnswers: string[];
  level: number;

  constructor(
    question: string,
    answers: string[],
    categoryId: string,
    correctAnswers: string[],
    level: number
  ) {
    this.objectId = '';
    this.question = question;
    this.answers = answers;
    this.categoryId = categoryId;
    this.correctAnswers = correctAnswers;
    this.level = level;
  }

  setLevel(level: number) {
    this.level = level;
  }
}
