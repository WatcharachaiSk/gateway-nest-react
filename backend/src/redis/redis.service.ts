import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManger: Cache,
  ) { }

  public async get(key: string): Promise<string> {
    return await this.cacheManger.get(key);
  }

  public async set(key: string, value: any, ttl?: number) {
    if (ttl) {
      await this.cacheManger.set(key, value, ttl);
    } else {
      await this.cacheManger.set(key, value);
    }
  }

  public async setStore(key: string, value: any) {
    this.cacheManger.store.set(key, value, 0);
  }

  public async del(key: any) {
    await this.cacheManger.del(key);
  }
}
