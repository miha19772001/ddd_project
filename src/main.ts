import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
    const app = await NestFactory.create(await AppModule.asyncForRoot());
    await app.listen(3000);
}
bootstrap();
