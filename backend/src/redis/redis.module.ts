import { CACHE_MANAGER, CacheModule, Inject, Logger, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { RedisService } from './redis.service';
import { Cache } from 'cache-manager';

import { config } from 'dotenv';
config(); // loads environment variables from .env file
const { REDIS_HOST, REDIS_PORT, REDIS_PASS }: any = process.env;

@Module({
  providers: [RedisService],
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => {
        const host = REDIS_HOST;
        const port = REDIS_PORT;
        const password = REDIS_PASS;
        return {
          store: redisStore,
          host,
          port,
          password,
          ttl: 60 * 3600 * 1000
        };
      }
    }),
  ],
  exports: [RedisService]
})
export class RedisModule {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) { }

  public onModuleInit(): any {
    const logger = new Logger('Cache');
  }
}
