import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';

import {
  Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UpdateShowDto } from './dto/update-show.dto';
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { User } from 'src/user/entities/user.entity';


@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Get() //조회는 누구든지 가능하게 하려고 가드 안넣음
  async findAll() {
    return await this.showService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.showService.findOne(id);
  }
 

  @UseGuards(RolesGuard) 
  @Roles(Role.Admin)
  @Post()
  async create(@Body() createShowDto: CreateShowDto,@UserInfo() user: User) {
    await this.showService.create(createShowDto,user.id);
  }
  
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateShowDto: UpdateShowDto) {
    await this.showService.update(id, updateShowDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.showService.delete(id);
  }
}