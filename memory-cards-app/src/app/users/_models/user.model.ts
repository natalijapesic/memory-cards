import { Role } from 'src/app/shared/types/types';

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  image: string;

  constructor(name: string, email: string, password: string, image: string) {
    this.id = 0;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = Role.User;
    this.image = image;
  }
}
