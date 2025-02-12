import { Module } from '@nestjs/common';
import { CreateAccountController } from './controllers/create-account.controller';
import { AuthenticateController } from './controllers/authenticate.controller';
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller';
import { CreateQuestionController } from './controllers/create-question.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
})
export class HttpModule {}
