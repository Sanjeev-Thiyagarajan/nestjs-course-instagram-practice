import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { ContentRepository } from 'src/content/content.repository';
import { CommentsRepository } from './conmment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentFilterDto } from './dto/get-comments-filter.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

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

  async deleteComment(id: number, user: User) {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    console.log(comment);

    if (!comment) {
      throw new NotFoundException(`Comment with id: ${id} was not found`);
    }

    if (comment.user.id !== user.id) {
      throw new ForbiddenException();
    }

    await this.commentsRepository.delete(id);
    return;
  }

  async updateComment(
    id: number,
    updateCommentDto: UpdateCommentDto,
    user: User,
  ) {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id: ${id} was not found`);
    }

    if (comment.user.id !== user.id) {
      throw new ForbiddenException();
    }

    Object.assign(comment, updateCommentDto);
    await this.commentsRepository.save(comment);
    return comment;
  }

  async getCommentById(id) {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!comment) {
      throw new NotFoundException(`Comment with id: ${id} was not found`);
    }
    return comment;
  }

  async getComments(getCommentFilterDto: GetCommentFilterDto) {
    const { search, user_id, content_id } = getCommentFilterDto;
    console.log(user_id, content_id);

    const query = this.commentsRepository
      .createQueryBuilder('comments')
      .leftJoinAndSelect('comments.content', 'content')
      .leftJoinAndSelect('comments.user', 'user');

    if (user_id) {
      query.andWhere('(comments.user.id = :user_id)', { user_id: user_id });
    }

    if (content_id) {
      query.andWhere('(comments.content.id = :content_id)', {
        content_id: content_id,
      });
    }

    if (search) {
      query.andWhere('(LOWER(comments.text) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    }

    const comments = await query.getMany();
    return comments;
  }
}
