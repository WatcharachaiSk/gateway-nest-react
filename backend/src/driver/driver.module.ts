import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriversEntity } from 'src/entity/pg/drivers.entity';


@Module({
  imports: [TypeOrmModule.forFeature([DriversEntity])],
  providers: [DriverService],
  controllers: [DriverController],
  exports: [DriverService]
})
export class DriverModule {}
