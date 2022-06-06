export class Card {
  id: number;
  question: string;
  answers: string[];
  categoryId: number;
  correctAnswer: string;
  level?: number;

  constructor(
    id: number,
    question: string,
    answers: string[],
    categoryId: number,
    correctAnswer: string
  ) {
    this.id = id;
    this.question = question;
    this.answers = answers;
    this.categoryId = categoryId;
    this.correctAnswer = correctAnswer;
  }

  setLevel(level: number) {
    this.level = level;
  }
}
