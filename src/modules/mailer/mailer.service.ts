import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  public async sendMail(): Promise<boolean> {
    return true;
  }
}
