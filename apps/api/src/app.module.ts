import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DemoRequestsModule } from './demo-requests/demo-requests.module.js';
import { HealthModule } from './health/health.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [PrismaModule, HealthModule, DemoRequestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
