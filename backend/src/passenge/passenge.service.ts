import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entity/pg/users.entity';

@Injectable()
export class PassengeService {
  @InjectRepository(UsersEntity)
  private usersRepository: Repository<UsersEntity>;

  async createPassenge(data: any) {
    const user = await this.usersRepository.findOne({
      where: { username: data.username },
    });
    if (user) {
      throw new BadRequestException('username is exist');
    }
    const newUser = new UsersEntity();
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
