import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DriverService } from 'src/driver/driver.service';
import { PassengerService } from 'src/passenger/passenger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly passengerService: PassengerService,
    private readonly driverService: DriverService,
    private readonly jwtService: JwtService,
  ) {}

  async createPassenge(data: any) {
    const passenge: any = await this.passengerService.createPassenger(data);
    if (passenge) {
      const accessToken = await this.jwtService.signAsync({
        username: passenge.username,
        uid: passenge.id,
      });
      passenge.accessToken = accessToken;
      return passenge;
    }
  }

  async createDriver(data: any) {
    const driver: any = await this.driverService.createDriver(data);
    if (driver) {
      const accessToken = await this.jwtService.signAsync({
        username: driver.username,
        uid: driver.id,
      });
      driver.accessToken = accessToken;
      return driver;
    }
  }

}
