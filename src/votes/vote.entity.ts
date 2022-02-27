import { Transform } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Content } from 'src/content/content.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// import { MediaFile } from './media-file.entity';

@Entity()
export class Votes {
  @ManyToOne(() => User, (user) => user.votes, {
    nullable: false,
    onDelete: 'CASCADE',
    primary: true,
  })
  @Transform(({ obj }) => obj.user.id, { toPlainOnly: true })
  user: User;

  @ManyToOne(() => Content, (content) => content.votes, {
    nullable: false,
    onDelete: 'CASCADE',
    primary: true,
  })
  @Transform(({ obj }) => obj.content.id, { toPlainOnly: true })
  content: Content;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  //   @Exclude({ toPlainOnly: true })
}
