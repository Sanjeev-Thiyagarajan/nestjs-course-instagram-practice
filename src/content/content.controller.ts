import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { Content } from './content.entity';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { GetContentFilterDto } from './dto/get-content-filter.dto';
import { UpdateContentDto } from './dto/udpate-content.dto';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Get()
  @UseGuards(AuthGuard())
  getAllContent(@Query() filterDto: GetContentFilterDto): Promise<Content[]> {
    return this.contentService.getContent(filterDto);
  }

  @Get('/:id')
  getContentById(@Param('id', ParseIntPipe) id: number): Promise<Content> {
    return this.contentService.getContentById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  createContent(
    @Body() createContentDto: CreateContentDto,
    @Req() req,
  ): Promise<Content> {
    const { user } = req;
    return this.contentService.createContent(createContentDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteContent(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.contentService.deleteContent(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateContent(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContentDto: UpdateContentDto,
  ): Promise<Content> {
    return this.contentService.updateContent(id, updateContentDto);
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
