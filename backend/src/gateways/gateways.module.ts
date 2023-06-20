import { Module } from '@nestjs/common';
import { MyGateways } from './gateways';
import { GatewaysController } from './gateways.controller';
import { GatewaysService } from './gateways.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { RedisModule } from 'src/redis/redis.module';
import { WebsocketAuthJwtGuard } from './websocket-auth-jwt.guard';


@Module({
  imports: [
    RedisModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    })
  ],
  providers: [MyGateways, GatewaysService,WebsocketAuthJwtGuard],
  controllers: [GatewaysController],
  exports: [
    MyGateways,
    GatewaysService
  ],
})
export class GatewaysModule { }
