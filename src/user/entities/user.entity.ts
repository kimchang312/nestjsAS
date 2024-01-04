import { Column, Entity, Index, OneToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

import { Role } from '../types/userRole.type';
import { Show } from 'src/show/entities/show.entity';
import { Ticketing } from 'src/ticketing/entities/ticketing.entity';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'bigint', default:1000000, nullable: true })
  point: number;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;


  @OneToMany(() => Ticketing, (ticketing) => ticketing.user)
  ticketings: Ticketing[];

}