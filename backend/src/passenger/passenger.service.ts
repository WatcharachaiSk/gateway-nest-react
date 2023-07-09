import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PassengerEntity } from 'src/entity/pg/passenger.entity';

@Injectable()
export class PassengerService {
  @InjectRepository(PassengerEntity)
  private usersRepository: Repository<PassengerEntity>;

  async createPassenger(data: any) {
    const user = await this.usersRepository.findOne({
      where: { username: data.username },
    });
    if (user) {
      throw new BadRequestException('username is exist');
    }
    const newUser = new PassengerEntity();
    newUser.username = data.username;
    newUser.password = await newUser.hashPassword(data.password, 10);
    newUser.firstName = data.firstName;
    newUser.lastName = data.lastName;
    newUser.middleName = data.middleName;
    newUser.email = data.email;
    newUser.phone = data.phone;
    try {
      const { password, ...result } = await this.usersRepository.save(newUser);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
