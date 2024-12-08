import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  public getHello() {
    return { msg: 'Hello, World!' };
  }
}
