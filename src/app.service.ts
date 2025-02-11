import { Injectable } from '@nestjs/common';

@Injectable() // Permite que outros arquivos possam "depender" dessa classe
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
