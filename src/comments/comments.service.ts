import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { ContentRepository } from 'src/content/content.repository';
import { CommentsRepository } from './conmment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsRepository)
    private commentsRepository: CommentsRepository,
    @InjectRepository(ContentRepository)
    private contentRepository: ContentRepository,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,

    user: User,
  ) {
    const { text, content_id } = createCommentDto;
    const content = await this.contentRepository.findOne(content_id);
    if (!content) {
      throw new NotFoundException(
        `Content with id: ${content_id} was not found`,
      );
    }
    const comment = this.commentsRepository.create({ text, user, content });
    await this.commentsRepository.save(comment);
    return comment;
  }
}
