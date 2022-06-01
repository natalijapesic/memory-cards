import { Card } from './card.model';

export class Category {
  id: number;
  name: string;
  admin: number;
  purpose: string;
  cards: Card[];
  numberOfMembers: number;

  constructor(name: string, admin: number, purpose: string) {
    this.id = 0;
    this.name = name;
    this.admin = admin;
    this.purpose = purpose;
    this.cards = [];
    this.numberOfMembers = 0;
  }
}
