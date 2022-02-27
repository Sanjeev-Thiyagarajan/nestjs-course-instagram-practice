import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetCommentFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  user_id?: number;

  @IsOptional()
  @IsNumber()
  content_id?: number;
}
