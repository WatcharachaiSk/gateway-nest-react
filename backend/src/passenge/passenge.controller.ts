import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { PassengeService } from './passenge.service';
import { DataResponse } from 'src/dto/Response.dto';


@Controller('passenge')
export class PassengeController {
  constructor(private readonly passengeService: PassengeService) { }

    @Post('/create')
    async createPassenge(@Body() body: any) {
      const res = await this.passengeService.createPassenge(body);
      const response = new DataResponse()
      if (response) {
        response.code = HttpStatus.CREATED;
        response.data = res
        response.message = 'success';
      }
      return response;
    }
}
