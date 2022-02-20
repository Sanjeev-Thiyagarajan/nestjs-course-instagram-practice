import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Get('/:id')
  getContentById(@Param('id', ParseIntPipe) id: number): Promise<Content> {
    return this.contentService.getContentById(id);
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
