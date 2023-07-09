import { Module } from '@nestjs/common';
import { PassengeService } from './passenge.service';
import { PassengeController } from './passenge.controller';
import { UsersEntity } from 'src/entity/pg/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [PassengeService],
  controllers: [PassengeController],
  exports:[PassengeService]
})
export class PassengeModule {}
