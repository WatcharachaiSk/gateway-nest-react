import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateGatewaysDto } from 'src/dto/create.gateways.dto';
import { JoinGatewaysDto } from 'src/dto/join.gateways.dto';
import { GatewaysService } from './gateways.service';
import { AuthGuard } from './gateways.guard';

@Controller('gateways')
export class GatewaysController {
  constructor(private gatewaysService: GatewaysService) { }

  @Post()
  async create(@Body() createGatewaysDto: CreateGatewaysDto) {
    console.log("In create!");
    const result = await this.gatewaysService.createGate(createGatewaysDto)
    return result
  }

  @Post('/join')
  async join(@Body() joinGatewaysDto: JoinGatewaysDto) {
    console.log("in join!");
    const result = await this.gatewaysService.joinGate(joinGatewaysDto)
    return result
  }

  @UseGuards(AuthGuard)
  @Post('/rejoin')
  async reJoin(@Req() req: {
    user: {
      name: string,
      gateID: string,
      sub: string
    }
  }) {
    console.log("in rejoin!");
    const { name, gateID, sub } = req.user
    const result = await this.gatewaysService.rejoinGate({
      name: name,
      gateID: gateID,
      userID: sub
    })
    return result
  }
}
