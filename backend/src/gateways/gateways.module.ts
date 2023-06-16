import { Module } from '@nestjs/common';
import { MyGateways } from './gateways';

@Module({
  providers: [MyGateways]
})
export class GatewaysModule { }
