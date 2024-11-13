import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger as PinoLogger } from 'nestjs-pino';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });
  app.setGlobalPrefix('api');

  const logger = new Logger(bootstrap.name);
  const configService = app.get<ConfigService>(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Volunteering app API')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);

  app.use(
    session({
      secret: configService.get<string>('SESSION_SECRET'),
      resave: configService.get<boolean>('SESSION_RESAVE'),
      saveUninitialized: configService.get<boolean>(
        'SESSION_SAVE_UNINITIALIZED'
      ),
      cookie: {
        maxAge: configService.get<number>('SESSION_MAX_AGE') * 3600000, // 3600000 milliseconds is one hour
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useLogger(app.get<PinoLogger>(PinoLogger));
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  const HOST = configService.get<string>('HOST');
  const PORT = configService.get<number>('PORT');

  await app.listen(PORT, HOST, () => {
    logger.log(`Service is running on http://${HOST}:${PORT}`);
    logger.log(`API Documentation is available on /docs`);
  });
}
bootstrap();
