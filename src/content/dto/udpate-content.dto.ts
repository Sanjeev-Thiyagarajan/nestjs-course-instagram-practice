import { IsOptional, Length } from 'class-validator';

export class UpdateContentDto {
  @IsOptional()
  @Length(3, 100)
  text?: string;
}
