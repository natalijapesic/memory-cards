export class Card {
  id: number;
  question: string;
  answers: string[];
  categoryId: number;
  correctAnswers: string[];
  level: number;

  constructor(
    id: number,
    question: string,
    answers: string[],
    categoryId: number,
    correctAnswers: string[]
  ) {
    this.id = id;
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
