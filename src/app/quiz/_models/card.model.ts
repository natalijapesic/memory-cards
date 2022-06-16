export class Card {
  id: number;
  question: string;
  answers: string[];
  categoryId: number;
  correctAnswers: string[];
  level: number;

  constructor(
    question: string,
    answers: string[],
    categoryId: number,
    correctAnswers: string[]
  ) {
    this.id = 0;
    this.question = question;
    this.answers = answers;
    this.categoryId = categoryId;
    this.correctAnswers = correctAnswers;
    this.level = 0;
  }

  setLevel(level: number) {
    this.level = level;
  }
}
