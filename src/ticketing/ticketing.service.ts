import _ from 'lodash';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Ticketing } from './entities/ticketing.entity';
import { Show } from 'src/show/entities/show.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TicketingService {
  constructor(
    @InjectRepository(Ticketing)
    private ticketingRepository: Repository<Ticketing>,
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getTicketingsByShowId(showId: number) {

    const show = await this.showRepository.findOne({
      where: {
        id: showId,
      },
    });

    if (!show) {
      throw new NotFoundException('해당 공연을 찾을 수 없습니다.');
    }
    console.log(show);

    return await this.ticketingRepository.find({
      where: {
        show_id: showId,
      },
    });
  }

  async createTicketing(showId: number, userId: number, ticketing: string) {

    const show = await this.showRepository.findOne({
      where: {
        id: showId,
      },
    });

    const checkShowDate= show.showDate.find(date=>date==ticketing);
    if(!checkShowDate){
      throw new NotFoundException('해당 공연의 공연일을 찾을 수 없습니다.');
    }

    await this.ticketingRepository.save({
      show_id: showId,
      user_id: userId,
      ticketing,
    });

    const updateSeat:number= Number(show.seatImformation)-1;
     
    const updatePoint:number = (await this.userRepository.findOne({where:{id:userId},})).point- show.seatPoint;

    await this.showRepository.update({id:showId},{seatImformation:updateSeat})
    await this.userRepository.update({id:userId},{point:updatePoint})

    const ticketingShow={
      date:ticketing,
      location:show.showLocation,
      point:show.seatPoint,
    }
    return ticketingShow;
  }
/*
  async updateTicketing(id: number, userId: number, ticketing: string) {
    await this.verifyTicketing(id, userId);
    await this.ticketingRepository.update({ id, user_id: userId }, { ticketing });
  }*/
 
  async deleteTicketing(id: number, userId: number) {
    await this.verifyTicketing(id, userId);
    

    await this.ticketingRepository.delete({ id, user_id: userId });
   
  }

  private async verifyTicketing(id: number, userId: number) {
    const ticketing = await this.ticketingRepository.findOne({
      where: {
        id,
      },
    });

    if (_.isNil(ticketing) || ticketing.user_id !== userId) {
      throw new NotFoundException(
        '해당 애매를 찾을 수 없거나 수정/삭제할 권한이 없습니다.',
      );
    }
  }
}
