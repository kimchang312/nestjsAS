import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Ticketing } from 'src/ticketing/entities/ticketing.entity';
//import { Ticketing } from 'src/ticketing/entities/ticketing.entities';

@Entity({
    name: 'shows',
  })
  export class Show {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', nullable: false })
    name: string;
  
    @Column({ type: 'varchar', nullable: false })
    description: string;

    @Column({ type: 'simple-array', nullable: false })
    showDate: string[];

    @Column({ type: 'varchar', nullable: false })
    showLocation: string; 

    @Column({ type: 'bigint', nullable: false })
    seatImformation: number|string;

    @Column({ type: 'varchar', nullable: false })
    seatPoint: number;

    @Column({ type: 'varchar', nullable: false })
    showCategory: string;

    @Column({ type: 'varchar', nullable: false })
    showImg: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Ticketing, (ticketing) => ticketing.show)
    ticketings: Ticketing[];

  }