import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Votes } from './vote.entity';
import { VotesRepository } from './vote.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ContentRepository } from 'src/content/content.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([VotesRepository, ContentRepository]),
    AuthModule,
  ],
  providers: [VotesService],
  controllers: [VotesController],
})
export class VotesModule {}
