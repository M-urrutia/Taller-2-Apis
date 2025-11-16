import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = process.env.PORT || 3001;
  await app.listen(PORT as number);
  console.log(`✓ API Usuarios (Nest) corriendo en http://localhost:${PORT}`);
}

bootstrap();
