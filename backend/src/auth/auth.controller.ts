import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DataResponse } from 'src/dto/Response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/create/passenger')
    async createPassenge(@Body() body: any) {
      const res = await this.authService.createPassenge(body);
      const response = new DataResponse()
      if (response) {
        response.code = HttpStatus.CREATED;
        response.data = res
        response.message = 'success';
      }
      return response;
    }
    @Post('/create/driver')
    async createDriver(@Body() body: any) {
      const res = await this.authService.createDriver(body);
      const response = new DataResponse()
      if (response) {
        response.code = HttpStatus.CREATED;
        response.data = res
        response.message = 'success';
      }
      return response;
    }
}
