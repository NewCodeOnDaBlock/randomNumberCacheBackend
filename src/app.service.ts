import { Injectable } from '@nestjs/common';
import { CacheService } from './cache.service';
// import axios from 'axios';

@Injectable()
export class AppService {
  constructor(private cacheService: CacheService) {}

  async getRandomNumber(): Promise<number> {
    const cacheKey = 'randomNumber';
    const cachedNumber = await this.cacheService.get(cacheKey);

    if (!cachedNumber) {
      const randomNum = Math.random();
      await this.cacheService.set(cacheKey, randomNum, 5);
      return randomNum;
    }

    console.log('Returning cached number:', cachedNumber);
    return cachedNumber;
  }
}
