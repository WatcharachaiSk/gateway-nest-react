import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';
import * as path from 'path';


async function bootstrap() {
  // const app = await NestFactory.create(AppModule);

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: ['log', 'debug', 'error', 'warn'],
  });
  const distPath = path.join(__dirname, '../build');

  // Serve static files from the distPath directory
  app.useStaticAssets(distPath);
  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
