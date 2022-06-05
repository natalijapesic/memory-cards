export class Card {
  id: number;
  question: string;
  answers: Record<string, boolean>;
  categoryId: number;

  constructor(
    id: number,
    question: string,
    answers: Record<string, boolean>,
    categoryId: number
  ) {
    this.id = id;
    this.question = question;
    this.answers = answers;
    this.categoryId = categoryId;
  }
}
