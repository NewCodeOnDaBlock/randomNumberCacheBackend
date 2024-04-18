import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('backend')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-random-number')
  async getNumber() {
    return this.appService.getRandomNumber();
  }
}
