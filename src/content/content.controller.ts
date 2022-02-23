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
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
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
    @GetUser() user: User,
  ): Promise<Content> {
    return this.contentService.createContent(createContentDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteContent(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.contentService.deleteContent(id, user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateContent(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContentDto: UpdateContentDto,
    @GetUser() user: User,
  ): Promise<Content> {
    return this.contentService.updateContent(id, updateContentDto, user);
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
