import { User } from 'src/auth/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  IsNull,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContentType } from './content-type.enum';

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

  @ManyToOne((type) => User, (user) => user.contents, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;
}
