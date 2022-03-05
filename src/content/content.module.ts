import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ContentController } from './content.controller';
import { ContentRepository } from './content.repository';
import { ContentService } from './content.service';
import { MediaFileRepository } from './media-file.repository';
import { MediaFileService } from './media-file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContentRepository, MediaFileRepository]),
    AuthModule,
  ],
  controllers: [ContentController],
  providers: [ContentService, MediaFileService],
})
export class ContentModule {}
