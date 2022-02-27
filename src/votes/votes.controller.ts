import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
import { VotesService } from './votes.service';

@Controller('votes')
export class VotesController {
  constructor(private votesService: VotesService) {}

  @Patch()
  @UseGuards(AuthGuard())
  vote(@Body() createVoteDto: CreateVoteDto, @GetUser() user: User) {
    return this.votesService.vote(createVoteDto, user);
  }
}
