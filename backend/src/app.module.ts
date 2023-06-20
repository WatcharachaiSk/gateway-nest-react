import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewaysModule } from './gateways/gateways.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [GatewaysModule, RedisModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
