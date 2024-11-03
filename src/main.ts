import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger as PinoLogger } from 'nestjs-pino';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  const logger = new Logger(bootstrap.name);
  const configService = app.get<ConfigService>(ConfigService);

  app.useLogger(app.get<PinoLogger>(PinoLogger));
  app.enableCors();
  app.use(helmet());

  const HOST = configService.get<string>('HOST') || 'localhost';
  const PORT = configService.get<number>('PORT') || 3000;

  await app.listen(PORT, HOST, () => {
    logger.log(`Service is running on http://${HOST}:${PORT}`);
  });
}
bootstrap();
