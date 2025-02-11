import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateAccountController } from './controllers/create-account.controller';

@Module({
  controllers: [CreateAccountController], // Recebe controles que vão existir dentro desse módulo
  providers: [PrismaService], // Dependência que as controllers podem ter
})
export class AppModule {}
