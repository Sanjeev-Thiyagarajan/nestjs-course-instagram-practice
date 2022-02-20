import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ContentType } from '../content-type.enum';

export class GetContentFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
  @IsOptional()
  @IsEnum(ContentType)
  type?: ContentType;
}
