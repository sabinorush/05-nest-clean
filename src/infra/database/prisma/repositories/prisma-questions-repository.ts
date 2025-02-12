/* eslint-disable @typescript-eslint/no-unused-vars */
import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  findById(_id: string): Promise<Question | null> {
    throw new Error('Method not implemented.');
  }

  findBySlug(_slug: string): Promise<Question | null> {
    throw new Error('Method not implemented.');
  }

  findManyRecent(_params: PaginationParams): Promise<Question[]> {
    throw new Error('Method not implemented.');
  }

  save(_question: Question): Promise<void> {
    throw new Error('Method not implemented.');
  }

  create(_question: Question): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(_question: Question): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
