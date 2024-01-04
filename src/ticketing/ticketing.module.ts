import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ticketing } from './entities/ticketing.entity';
import { TicketingController } from './ticketing.controller';
import { TicketingService } from './ticketing.service';
import { Show } from 'src/show/entities/show.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticketing,Show,User])],
  providers: [TicketingService],
  controllers: [TicketingController],
})
export class TicketingModule {}