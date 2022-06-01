export class Card {
  id: number;
  question: string;
  answer: string;
  categoryId: number;

  constructor(
    id: number,
    question: string,
    answer: string,
    categoryId: number
  ) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.categoryId = categoryId;
  }
}
