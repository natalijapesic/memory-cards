export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  learningState: Record<string, number>;

  constructor(name: string, email: string, password: string) {
    this.id = 0;
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = false;
    this.learningState = {};
  }
}
