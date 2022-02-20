import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ContentType } from './content-type.enum';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  type: ContentType;
}
