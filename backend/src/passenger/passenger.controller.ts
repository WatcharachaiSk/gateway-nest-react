import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { DataResponse } from 'src/dto/Response.dto';


@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) { }

    @Post('/create')
    async createPassenge(@Body() body: any) {
      const res = await this.passengerService.createPassenger(body);
      const response = new DataResponse()
      if (response) {
        response.code = HttpStatus.CREATED;
        response.data = res
        response.message = 'success';
      }
      return response;
    }
}
