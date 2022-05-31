import { Card } from "./card.model";

export class Category {
  id: number;
  name: string;
  admin: number;
  cards: Card[];

  constructor(name: string, admin: number) {
    this.id = 0;
    this.name = name;
    this.admin = admin;
    this.cards = [];
  }
}
