import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard())
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User,
  ) {
    return this.commentsService.createComment(createCommentDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteComment(@Param('id') id: number, @GetUser() user: User) {
    return this.commentsService.deleteComment(id, user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateComment(
    @Param('id') id: number,
    @GetUser() user: User,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(id, updateCommentDto, user);
  }

  @Get('/:id')
  getCommentById(@Param('id') id: number) {
    return this.commentsService.getCommentById(id);
  }
}
