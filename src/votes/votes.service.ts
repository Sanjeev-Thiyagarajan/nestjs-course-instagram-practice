import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { ContentRepository } from 'src/content/content.repository';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Votes } from './vote.entity';
import { VotesRepository } from './vote.repository';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(VotesRepository) private votesRepository: VotesRepository,
    @InjectRepository(ContentRepository)
    private contentRepository: ContentRepository,
  ) {}
  async vote(createVoteDto: CreateVoteDto, user: User) {
    const { content_id, vote_dir } = createVoteDto;
    const query = this.votesRepository
      .createQueryBuilder('votes')
      .leftJoinAndSelect('votes.content', 'content')
      .leftJoinAndSelect('votes.user', 'user')
      .andWhere('votes.user.id = :user_id', { user_id: user.id })
      .andWhere('votes.content.id = :content_id', { content_id });

    const vote = await query.getOne();

    if (vote_dir == 1) {
      if (vote) {
        throw new ConflictException(
          `vote for content: ${content_id} already exists`,
        );
      }

      //   await this.votesRepository
      //     .createQueryBuilder()
      //     .insert()
      //     .into(Votes)
      //     .values([{ user: user.id, content: content_id }]);

      const content = await this.contentRepository.findOne(content_id);

      const newVote = this.votesRepository.create({
        user,
        content,
      });
      await this.votesRepository.save(newVote);
      return newVote;
    } else {
      if (!vote) {
        throw new NotFoundException(
          `Vote for content ${content_id} does not exist`,
        );
      }

      this.votesRepository.remove(vote);
      return;
    }
  }
}
