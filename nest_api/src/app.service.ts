import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!3666';
  }

  getHello2(): string {
    return 'Hello World! Geb 2';
  }
}
