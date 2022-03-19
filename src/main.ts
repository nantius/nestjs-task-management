import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Task Management NestJS')
    .setDescription('A simple application to study NestJS')
    .setVersion('1.0')
    .addTag('task-management')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  const port: string = process.env.PORT;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
