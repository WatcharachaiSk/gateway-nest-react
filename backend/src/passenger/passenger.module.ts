import { Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerController } from './passenger.controller';
import { PassengerEntity } from 'src/entity/pg/passenger.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PassengerEntity])],
  providers: [PassengerService],
  controllers: [PassengerController],
  exports:[PassengerService]
})
export class PassengerModule {}
