import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author';

export class CommentWithAutorPresenter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toHTTP(commentWithAuthor: CommentWithAuthor) {
    return {
      commentId: commentWithAuthor.commentId,
      authorId: commentWithAuthor.authorId,
      authorName: commentWithAuthor.author,
      content: commentWithAuthor.content,
      createdAt: commentWithAuthor.createdAt,
      updatedAt: commentWithAuthor.updatedAt,
    };
  }
}
