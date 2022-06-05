import { Role } from "src/app/_models";

export class User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  // learningState: Record<string, number>;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = Role.User;
    // this.learningState = {};
  }
}
