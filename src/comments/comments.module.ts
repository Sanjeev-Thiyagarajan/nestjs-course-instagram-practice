import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Content } from 'src/content/content.entity';
import { ContentModule } from 'src/content/content.module';
import { CommentsRepository } from './conmment.repository';
import { ContentRepository } from 'src/content/content.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsRepository, ContentRepository]),
    AuthModule,
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
