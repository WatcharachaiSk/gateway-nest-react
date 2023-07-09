import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriversEntity } from 'src/entity/pg/drivers.entity';
import { Repository } from 'typeorm';


@Injectable()
export class DriverService {
    @InjectRepository(DriversEntity)
    private driverRepository: Repository<DriversEntity>;

  async createDriver(data: any) {
    const driver = await this.driverRepository.findOne({
        where: { username: data.username },
      });
      if (driver) {
        throw new BadRequestException('driver is exist');
      }
    const newDriver= new DriversEntity();
    newDriver.username = data.username;
    newDriver.password = await newDriver.hashPassword(data.password, 10);
    newDriver.firstName = data.firstName;
    newDriver.lastName = data.lastName;
    newDriver.middleName = data.middleName;
    newDriver.email = data.email;
    newDriver.phone = data.phone;
    try {
      const { password, ...result } = await this.driverRepository.save(newDriver);
      return result;
    } catch (e) {
      throw e;
    }

  }
}
