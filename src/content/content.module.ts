import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ContentController } from './content.controller';
import { ContentRepository } from './content.repository';
import { ContentService } from './content.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContentRepository]), AuthModule],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
