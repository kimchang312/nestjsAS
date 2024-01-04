import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Show } from './show.entity';
//import { Ticketing } from 'src/ticketing/entities/ticketing.entities';

@Entity({
    name: 'showDates',
  })
  export class ShowDate {
    @PrimaryGeneratedColumn()
    id: number;
   
    @ManyToOne(()=>Show,(show)=>show.id,)
    @JoinColumn({name:"showId"})
    show:Show;
  }