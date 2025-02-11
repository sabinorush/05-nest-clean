import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { title } from 'process';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserPayload } from 'src/auth/jwt.strategy';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { PrismaService } from 'src/prisma/prisma.service';
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
