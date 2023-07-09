import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DataResponse } from 'src/dto/Response.dto';


@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) { }

  @Post('/create')
  async createRole(@Body() body: any) {
    const res = await this.driverService.createDriver(body);
    const response = new DataResponse()
    if (response) {
      response.code = HttpStatus.CREATED;
      response.data = res
      response.message = 'success';
    }
    return response;
  }

}
