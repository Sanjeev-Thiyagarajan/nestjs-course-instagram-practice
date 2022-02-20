import { Length } from 'class-validator';

export class CreateContentDto {
  @Length(3, 100)
  text: string;
}
