import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}
  //   @Get()
  //   getAllContent() {}
  //   @Get()
  //   getOneContent() {}
  //   @Post()
  //   createContent() {}
  //   @Delete()
  //   deleteContent() {}
  //   @Patch()
  //   updateContent() {}
}
