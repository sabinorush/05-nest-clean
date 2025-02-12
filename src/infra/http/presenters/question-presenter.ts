import { Question } from '@/domain/forum/enterprise/entities/question';

export class QuestioPresenter {
  static toHTTP(question: Question) {
    return {
      id: question.id.toString(),
      title: question.title,
      content: question.content,
      slug: question.slug.value,
      bestAnswerId: question.bestAnswerId?.toString(),
      creadtedAt: question.createdAt,
      updatedAt: question.updatedAt,
    };
  }
}
