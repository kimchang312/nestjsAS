import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Show } from '../../show/entities/show.entity';
import { User } from '../../user/entities/user.entity';

@Entity({
  name: 'ticketings',
})
export class Ticketing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ticketing: string;

  @ManyToOne(() => User, (user) => user.ticketings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'bigint', name: 'user_id' })
  user_id: number;

  @ManyToOne(() => Show, (show) => show.ticketings, {
  onDelete: 'CASCADE',
  })
  show: Show;

  @Column({ type: 'bigint', name: 'show_id' })
  show_id: number;
}