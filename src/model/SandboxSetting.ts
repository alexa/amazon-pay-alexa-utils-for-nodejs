export class SandboxSetting {
  private readonly email: string;

  constructor(eMail: string) {
    this.email = eMail;
  }

  get eMail(): string {
    return this.email;
  }
}
