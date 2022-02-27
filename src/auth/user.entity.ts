import { Exclude } from 'class-transformer';
import { Content } from 'src/content/content.entity';
import { Votes } from 'src/votes/vote.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany((type) => Content, (content) => content.user)
  contents: Content[];

  @OneToMany((type) => Votes, (votes) => votes.content)
  votes: Votes[];
}
