import { INestApplicationContext, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { Request } from 'express';
import { config } from 'dotenv';
import { SocketWithAuth } from './types/types';
config(); // loads environment variables from .env file
const { CLIENT_PORT }: any = process.env;

export class SocketIOAdapter extends IoAdapter {
  private readonly logger = new Logger(SocketIOAdapter.name);
  constructor(
    private app: INestApplicationContext,
    private configService: ConfigService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const cors = {
      origin: [
        `http://localhost:${CLIENT_PORT}`,
        new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${CLIENT_PORT}$/`),
      ],
    };

    this.logger.log('Configuring SocketIO server with custom CORS options', {
      cors,
    });

    const optionsWithCORS: ServerOptions = {
      ...options,
      cors,
    };

    const jwtService = this.app.get(JwtService);
    const server: Server = super.createIOServer(port, optionsWithCORS);
    server.of('gateways').use(createTokenMiddleware(jwtService, this.logger));

    return server;
  }
}

const createTokenMiddleware =
  (jwtService: JwtService, logger: Logger) =>
    (socket: SocketWithAuth, next) => {
      // for Postman testing support, fallback to token header
      const token = extractTokenFromHeader(socket.handshake.headers.authorization || socket.handshake.headers['authorization']);

      logger.debug(`Validating auth token before connection: ${token}`);

      try {
        const payload = jwtService.verify(token);
        socket.userID = payload.sub;
        socket.gateID = payload.gateID;
        socket.name = payload.name;
        next();
      } catch {
        next(new Error('FORBIDDEN'));
      }
    };
const extractTokenFromHeader = (authorization: any): string | undefined => {
  const [type, token] = authorization.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}

