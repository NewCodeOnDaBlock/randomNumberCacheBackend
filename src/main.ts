import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // Allow all origins, for now
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP Methods
    allowedHeaders: ['Content-Type, Accept'], // Allowed HTTP Headers
    credentials: true, // Allows sessions/cookies to be sent
  });
  const host = 'localhost';
  const port = 5000;
  await app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}/`);
  });
}
bootstrap();
