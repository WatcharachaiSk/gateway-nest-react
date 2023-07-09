import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewaysModule } from './gateways/gateways.module';
import { RedisModule } from './redis/redis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassengeModule } from './passenge/passenge.module';
import { DriverModule } from './driver/driver.module';
import { AuthModule } from './auth/auth.module';
const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DATABASE,
}: any = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      url: `postgres://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_DATABASE}`,
      database: DATABASE_DATABASE,
      entities: [__dirname + '/entity/pg/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GatewaysModule,
    RedisModule,
    PassengeModule,
    DriverModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
