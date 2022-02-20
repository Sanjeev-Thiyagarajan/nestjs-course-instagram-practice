import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { Content } from './content.entity';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}
  @Get()
  getAllContent(): Promise<Content[]> {
    return this.contentService.getAllContent();
  }
  //   @Get()
  //   getOneContent() {}
  //   @Post()
  //   createContent() {}
  //   @Delete()
  //   deleteContent() {}
  //   @Patch()
  //   updateContent() {}
}
