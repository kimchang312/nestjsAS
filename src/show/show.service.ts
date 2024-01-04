import _ from 'lodash';
import { parse } from 'papaparse';
import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdateShowDto } from './dto/update-show.dto';
import { Show } from './entities/show.entity';
import { CreateShowDto } from './dto/create-show.dto';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
  ) {}

  async findAll(): Promise<Show[]> {
    return await this.showRepository.find({
      select: ['id', 'name'],
    });
  }

  async findOne(id: number) {
    const oneShow= await this.verifyShowById(id);
    if(oneShow.seatImformation==0){
      await this.showRepository.update({id},{seatImformation:"좌석없음"})
    }
    return oneShow;
  }

  async create(createShowDto: CreateShowDto,id:number) {

    await this.showRepository.save({
      ...createShowDto,
      adminId:id,
    })
    
  }

  async update(id: number, updateShowDto: UpdateShowDto) {
    await this.verifyShowById(id);
    await this.showRepository.update({ id }, updateShowDto);
  }

  async delete(id: number) {
    await this.verifyShowById(id);
    await this.showRepository.delete({ id });
  }

  private async verifyShowById(id: number) {
    const show = await this.showRepository.findOneBy({ id });
    if (_.isNil(show)) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }

    return show;
  }
}