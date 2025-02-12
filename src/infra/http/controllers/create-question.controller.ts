import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { z } from 'zod';

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body;
    const { sub: userId } = user;

    const slug = this.convertToSlug(title);

    await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug,
      },
    });
  }

  private convertToSlug(title: string): string {
    // Normalize the string to decompose accents into separate characters
    const normalized = title.normalize('NFD');

    // Remove any diacritics (accents) using a regular expression
    const withoutAccents = normalized.replace(/[\u0300-\u036f]/g, '');

    // Convert to lowercase
    const lowercase = withoutAccents.toLowerCase();

    // Replace non-alphanumeric characters (except spaces) with hyphens
    const hyphenated = lowercase.replace(/[^a-z0-9]+/g, '-');

    // Remove leading/trailing hyphens
    const slug = hyphenated.replace(/^-+|-+$/g, '');

    return slug;
  }
}
