export class Category {
  objectId: string;
  name: string;
  adminId: number;
  numberOfMembers: number;

  constructor(name: string, adminId: number) {
    this.objectId = '';
    this.name = name;
    this.adminId = adminId;
    this.numberOfMembers = 0;
  }
}
