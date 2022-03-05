import { Exclude, Transform } from 'class-transformer';
import { userInfo } from 'os';
import { User } from 'src/auth/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Content } from './content.entity';

@Entity()
export class MediaFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  key: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @ManyToOne(() => Content, (content) => content.mediaFiles, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  //   @Exclude({ toPlainOnly: true })
  content: Content;
}
