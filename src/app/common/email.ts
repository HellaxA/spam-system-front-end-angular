export class Email {
  subject: string;
  message: string;
  to_emails: string[];


  constructor(subject: string, message: string, to_emails: string[]) {
    this.subject = subject;
    this.message = message;
    this.to_emails = to_emails;
  }
}
