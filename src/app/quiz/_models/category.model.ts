import { setColorById } from 'src/app/_helpers';

export class Category {
  id: number;
  name: string;
  adminId: number;
  purpose: string;
  numberOfMembers: number;
  hexColor?: string;

  constructor(name: string, admin: number, purpose: string) {
    this.id = 0;
    this.name = name;
    this.adminId = admin;
    this.purpose = purpose;
    this.numberOfMembers = 0;
  }
}
