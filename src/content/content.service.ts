import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentType } from './content-type.enum';
import { Content } from './content.entity';

import { ContentRepository } from './content.repository';
import { CreateContentDto } from './dto/create-content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentRepository)
    private contentRepository: ContentRepository,
  ) {}

  getAllContent(): Promise<Content[]> {
    return this.contentRepository.find();
  }

  getContentById(id: number): Promise<Content> {
    return this.contentRepository.findOne(id);
  }

  async createContent(createContentDto: CreateContentDto): Promise<Content> {
    const { text } = createContentDto;
    const content = this.contentRepository.create({
      text,
      type: ContentType.IMAGE,
    });

    await this.contentRepository.save(content);
    return content;
  }
}
