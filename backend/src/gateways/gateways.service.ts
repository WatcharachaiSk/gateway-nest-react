import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { AddParticipant, CreateGateFields, JoinGateFields, RejoinGateFields } from 'src/types/types';
import { createGateID, createUserID } from './ids';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class GatewaysService {
  constructor(
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
  ) { }
  async createGate(fields: CreateGateFields) {
    const gateID = createGateID();
    const userID = createUserID();

    const value = {
      id: gateID,
      topic: fields.topic,
      votesPerVoter: fields.votesPerVoter,
      participants: {
        // [`${userID}`]: `${fields.name}`,
      },
      adminID: userID
    };
    await this.redisService.set(gateID, value);
    // 
    const getGate = await this.redisService.get(gateID);

    const accessToken = await this.jwtService.signAsync({
      gateID: gateID,
      name: fields.name,
      topic: fields.topic,
      sub: userID
    });

    return {
      gate: getGate,
      accessToken,
    }
  }
  async joinGate(fields: JoinGateFields) {
    const userID = createUserID();

    const getGate: any = await this.redisService.get(fields.gateID);
    if (getGate) {
      const accessToken = await this.jwtService.signAsync({
        gateID: getGate.id,
        name: fields.name,
        topic: getGate.topic,
        sub: userID
      });

      return {
        ...fields,
        accessToken
      }
    } else {
      const statusCode = HttpStatus.NOT_FOUND;
      throw new HttpException(
        {
          message: `Gateway ${fields.gateID} NOT FOUND`,
        },
        statusCode
      );
    }
  }
  async rejoinGate(fields: RejoinGateFields) {
    const getGateUpdate = await this.addParticipant(fields)
    return getGateUpdate
  }

  async addParticipant(fields: AddParticipant) {
    const getGate: any = await this.redisService.get(fields.gateID);

    let participants: any = getGate.participants

    participants = {
      ...participants,
      [`${fields.userID}`]: fields.name
    }
    const setGate = { ...getGate, participants }
    await this.redisService.set(getGate.id, setGate);
    const getGateUpdate = await this.redisService.get(fields.gateID);

    return getGateUpdate
  }
}