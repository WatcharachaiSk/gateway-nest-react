import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
// import * as cors from 'cors';
// import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { SocketIOAdapter } from './socket-io-adapter';

import { config } from 'dotenv';
// config(); // loads environment variables from .env file
const { PORT ,CLIENT_PORT}: any = process.env;

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);


  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: ['log', 'debug', 'error', 'warn'],
  });
  app.useWebSocketAdapter(new SocketIOAdapter(app, CLIENT_PORT));

  // const distPath = path.join(__dirname, '../build');

  // Serve static files from the distPath directory
  // app.useStaticAssets(distPath);


  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(PORT, () => {
    console.log("PORT", PORT);

  });
}
bootstrap();
