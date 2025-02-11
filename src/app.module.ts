import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController], // Recebe controles que vão existir dentro desse módulo
  providers: [AppService], // Dependência que as controllers podem ter
})
export class AppModule {}
