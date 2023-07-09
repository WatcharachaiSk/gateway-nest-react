import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { DataResponse } from 'src/dto/Response.dto';
import { AuthGuard } from 'src/gateways/gateways.guard';

@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post('/create')
  async createPassenge(@Body() body: any) {
    const res = await this.passengerService.createPassenger(body);
    const response = new DataResponse();
    if (response) {
      response.code = HttpStatus.CREATED;
      response.data = res;
      response.message = 'success';
    }
    return response;
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getPassenge(@Body() body: any) {
    const res = await this.passengerService.getPassengers();
    const response = new DataResponse();
    if (response) {
      response.code = HttpStatus.OK;
      response.data = res;
      response.message = 'success';
    }
    return response;
  }
}
