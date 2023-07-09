import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassengerService } from 'src/passenger/passenger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly passengerService: PassengerService,
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
}
