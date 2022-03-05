import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Votes } from 'src/votes/vote.entity';
import { ContentType } from './content-type.enum';
import { Content } from './content.entity';

import { ContentRepository } from './content.repository';
import { CreateContentDto } from './dto/create-content.dto';
import { GetContentFilterDto } from './dto/get-content-filter.dto';
import { UpdateContentDto } from './dto/udpate-content.dto';
import { MediaFileRepository } from './media-file.repository';
import { MediaFileService } from './media-file.service';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentRepository)
    private contentRepository: ContentRepository,
    private mediaFileService: MediaFileService,
    @InjectRepository(MediaFileRepository)
    private mediaFileRepository: MediaFileRepository,
  ) {}

  getAllContent(): Promise<Content[]> {
    return this.contentRepository.find({ relations: ['votes'] });
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
    file: Express.Multer.File,
  ): Promise<Content> {
    console.log(file);
    const { text } = createContentDto;
    const fileType = file.mimetype.split('/')[0];
    const contentType =
      fileType == 'image' ? ContentType.IMAGE : ContentType.VIDEO;

    const content = this.contentRepository.create({
      text,
      type: contentType,
      user,
    });

    await this.contentRepository.save(content);
    const result = await this.mediaFileService.uploadMediaFile(
      file.buffer,
      file.originalname,
    );

    const newMediaFile = this.mediaFileRepository.create({
      key: result.Key,
      url: result.Location,
      content,
    });

    await this.mediaFileRepository.save(newMediaFile);

    return content;
  }

  async deleteContent(id: number, user: User): Promise<void> {
    const content = await this.getContentById(id);

    if (content.user.id !== user.id) {
      throw new ForbiddenException(`Resource is forbidden`);
    }
    console.log(content);
    const mediaFileKeys = content.mediaFiles.map((mediaFile) => {
      return { Key: mediaFile.key };
    });
    await this.mediaFileService.deleteFile(mediaFileKeys);
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
