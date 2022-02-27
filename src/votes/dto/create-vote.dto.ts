import { IsInt, Length, Max, Min } from 'class-validator';

export class CreateVoteDto {
  @IsInt()
  content_id: number;

  @IsInt()
  @Min(0)
  @Max(1)
  vote_dir: number;
}
