import { User } from 'src/user/entities/user.entity';

import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserInfo } from '../utils/userInfo.decorator';
import { TicketingDto } from './dto/ticketing.dto';
import { TicketingService } from './ticketing.service';


@Controller('ticketing')
export class TicketingController {
  constructor(private readonly ticketingService: TicketingService) {}

  @Get(':showId')
  async getAllTicketing(@Param('showId') showId: number) {
    return await this.ticketingService.getTicketingsByShowId(showId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':showId')
  async createTicketing(
    @UserInfo() user: User,
    @Param('showId') showId: number,
    @Body() ticketingDto: TicketingDto,
  ) {
   const ticketingShow= await this.ticketingService.createTicketing(
      showId,
      user.id,
      ticketingDto.date,
    );
    return ticketingShow;
  }
/*
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateTicketing(
    @UserInfo() user: User,
    @Param('id') id: number,
    @Body() ticketingDto: TicketingDto,
  ) {
    await this.ticketingService.updateTicketing(
      id,
      user.id,
      ticketingDto.date,
    );
  }
*/
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteTicketing(@UserInfo() user: User, @Param('id') id: number) {
    await this.ticketingService.deleteTicketing(id, user.id);
  }
}