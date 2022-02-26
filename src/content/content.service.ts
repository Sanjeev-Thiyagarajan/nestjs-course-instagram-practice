import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { ContentType } from './content-type.enum';
import { Content } from './content.entity';

import { ContentRepository } from './content.repository';
import { CreateContentDto } from './dto/create-content.dto';
import { GetContentFilterDto } from './dto/get-content-filter.dto';
import { UpdateContentDto } from './dto/udpate-content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentRepository)
    private contentRepository: ContentRepository,
  ) {}

  getAllContent(): Promise<Content[]> {
    return this.contentRepository.find();
  }

  getContent(filterDto: GetContentFilterDto): Promise<Content[]> {
    return this.contentRepository.getContent(filterDto);
  }

  async getContentById(id: number): Promise<Content> {
    const content = await this.contentRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });

    if (!content) {
      throw new NotFoundException(`Content with an id: ${id} does not exist`);
    }
    return content;
  }

  async createContent(
    createContentDto: CreateContentDto,
    user: User,
  ): Promise<Content> {
    const { text } = createContentDto;
    const content = this.contentRepository.create({
      text,
      type: ContentType.IMAGE,
      user,
    });

    await this.contentRepository.save(content);
    return content;
  }

  async deleteContent(id: number, user: User): Promise<void> {
    const content = await this.getContentById(id);

    if (content.user.id !== user.id) {
      throw new ForbiddenException(`Resource is forbidden`);
    }

    const result = await this.contentRepository.delete({ id });

    return;
  }

  async updateContent(
    id: number,
    updateContentDto: UpdateContentDto,
    user: User,
  ): Promise<Content> {
    const content = await this.contentRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });
    console.log(content);

    if (!content) {
      throw new NotFoundException(`Content with an id: ${id} does not exist`);
    }

    if (content.user.id !== user.id) {
      throw new ForbiddenException(`Resource is forbidden`);
    }

    Object.assign(content, updateContentDto);
    await this.contentRepository.save(content);
    return content;
  }
}
