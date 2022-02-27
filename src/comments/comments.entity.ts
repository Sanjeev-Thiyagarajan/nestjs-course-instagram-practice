import { Transform } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Content } from 'src/content/content.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// import { MediaFile } from './media-file.entity';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

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

  @ManyToOne(() => Content, (content) => content.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  content: Content;
}
