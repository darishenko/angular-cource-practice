export class User {
  id?: number;
  email!: string;
  password!: string;

  constructor(email: string, password: string) {
    this.id = undefined;
    this.email = email;
    this.password = password;
  }
}
