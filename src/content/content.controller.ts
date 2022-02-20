import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { Content } from './content.entity';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}
  @Get()
  getAllContent(): Promise<Content[]> {
    return this.contentService.getAllContent();
  }

  @Post()
  createContent(@Body() createContentDto: CreateContentDto): Promise<Content> {
    return this.contentService.createContent(createContentDto);
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
