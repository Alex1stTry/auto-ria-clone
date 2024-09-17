import { Injectable } from '@nestjs/common';

@Injectable()
export class GooglePayService {
  public async payProcess(): Promise<boolean> {
    return true;
  }
}
