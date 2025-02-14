import { Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { Attachment } from '../../enterprise/entities/attachment';
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type';
import { AttachmentsRepository } from '../repositories/attachments-repository';
import { Uploader } from '../storage/uploader';

interface UpLoadAndCreateAttachmentUseCaseRequest {
  fileName: string;
  fileType: string;
  body: Buffer;
}

type UpLoadAndCreateAttachmentUseCaseResponse = Either<
  InvalidAttachmentTypeError,
  {
    attachment: Attachment;
  }
>;

@Injectable()
export class UpLoadAndCreateAttachmentUseCase {
  constructor(
    private attachmentsRepository: AttachmentsRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UpLoadAndCreateAttachmentUseCaseRequest): Promise<UpLoadAndCreateAttachmentUseCaseResponse> {
    if (
      !/^(image\/jpeg|image\/png|application\/pdf|image\/jpg)$/.test(fileType)
    ) {
      return left(new InvalidAttachmentTypeError(fileType));
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    });

    const attachment = Attachment.create({
      title: fileName,
      url,
    });

    await this.attachmentsRepository.create(attachment);

    return right({
      attachment,
    });
  }
}
