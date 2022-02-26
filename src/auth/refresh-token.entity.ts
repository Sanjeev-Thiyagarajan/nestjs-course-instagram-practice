import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class RefreshToken {
  @PrimaryColumn()
  refreshToken: string;

  @ManyToOne(() => User, (user) => user.contents, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;
}
