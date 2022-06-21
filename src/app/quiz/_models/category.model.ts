export class Category {
  id: number;
  name: string;
  adminId: number;
  numberOfMembers: number;

  constructor(name: string, adminId: number) {
    this.id = 0;
    this.name = name;
    this.adminId = adminId;
    this.numberOfMembers = 0;
  }
}
