import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './content.entity';

import { ContentRepository } from './content.repository';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentRepository)
    private contentRepository: ContentRepository,
  ) {}

  async getAllContent(): Promise<Content[]> {
    return this.contentRepository.find();
  }
}
