import { Exclude, Transform } from 'class-transformer';
import { object } from 'joi';
import { userInfo } from 'os';
import { User } from 'src/auth/user.entity';
import { Comments } from 'src/comments/comments.entity';
import { Votes } from 'src/votes/vote.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  IsNull,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContentType } from './content-type.enum';
// import { MediaFile } from './media-file.entity';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  type: ContentType;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.contents, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  //   @Exclude({ toPlainOnly: true })
  @Transform(({ obj }) => obj.user.id, { toPlainOnly: true })
  user: User;

  @OneToMany((type) => Comments, (comments) => comments.content)
  comments: Comments[];

  @OneToMany((type) => Votes, (votes) => votes.content, { eager: true })
  @Transform(({ obj }) => obj.votes.length, { toPlainOnly: true })
  votes: Votes[];

  //   @OneToMany((type) => MediaFile, (mediaFile) => mediaFile.content)
  //   mediaFiles: MediaFile[];
}
