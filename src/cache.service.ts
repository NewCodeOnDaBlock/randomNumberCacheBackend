import { Injectable, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class CacheService implements OnModuleDestroy {
  private cache = new Map<string, { expire: number; value: any }>();
  private cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000); // Cleanup every 5 minutes

  async set(key: string, value: any, ttl: number): Promise<void> {
    const expire = Date.now() + ttl * 1000; // ttl in seconds
    this.cache.set(key, { expire, value });
  }

  async get(key: string): Promise<any> {
    const item = this.cache.get(key);
    if (item && item.expire > Date.now()) {
      return item.value;
    }
    this.cache.delete(key);
    return null;
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, { expire }] of this.cache.entries()) {
      if (expire < now) {
        this.cache.delete(key);
      }
    }
  }

  onModuleDestroy() {
    clearInterval(this.cleanupInterval);
  }
}
