import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger as PinoLogger } from 'nestjs-pino';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import * as fs from 'node:fs';
import { Redis } from 'ioredis';
import RedisStore from 'connect-redis';

function getHttpsOptions(): HttpsOptions {
  try {
    return {
      cert: fs.readFileSync(process.env.PUBLIC_CERTIFICATE_PATH),
      key: fs.readFileSync(process.env.PRIVATE_KEY_PATH),
    };
  } catch {
    return undefined;
  }
}

function configureSwagger(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Volunteering app API')
    .setVersion('0.0.1')
    .addServer('api')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
}

function configureSession(app: INestApplication, configService: ConfigService) {
  const redis = new Redis({
    port: configService.get<number>('REDIS_PORT'),
    host: configService.get<string>('REDIS_HOST'),
    password: configService.get<string>('REDIS_PASSWORD'),
  });
  const redisStore = new RedisStore({
    client: redis,
    prefix: 'volunteering-app:',
  });

  app.use(
    session({
      secret: configService.get<string>('SESSION_SECRET'),
      resave: configService.get<boolean>('SESSION_RESAVE'),
      saveUninitialized: configService.get<boolean>(
        'SESSION_SAVE_UNINITIALIZED'
      ),
      cookie: {
        maxAge: configService.get<number>('SESSION_MAX_AGE') * 3600000, // 3600000 milliseconds is one hour
        secure: true,
        httpOnly: true,
      },
      store: redisStore,
    })
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
    httpsOptions: getHttpsOptions(),
  });
  const logger = new Logger(bootstrap.name);
  const configService = app.get<ConfigService>(ConfigService);

  configureSwagger(app);
  configureSession(app, configService);

  app.setGlobalPrefix('api');
  app.use(passport.initialize());
  app.use(passport.session());
  app.useLogger(app.get<PinoLogger>(PinoLogger));
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );

  const HOST = configService.get<string>('HOST');
  const PORT = configService.get<number>('PORT');

  await app.listen(PORT, HOST, () => {
    logger.log(`Service is running on https://${HOST}:${PORT}`);
    logger.log(`API Documentation is available on /docs`);
  });
}
bootstrap();
