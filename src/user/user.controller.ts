import { UserInfo } from 'src/utils/userInfo.decorator';

import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SigninDto } from './dto/signin.dto';
import {SignupDto} from "./dto/signup.to";
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UpdateDto } from './dto/update.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return await this.userService.signup(signupDto.name, signupDto.email, signupDto.password);
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    
    return await this.userService.signin(signinDto.email, signinDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getEmail(@UserInfo() user: User) {
    return { email: user.email };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("myProfile")
  async myProfile(@UserInfo() user: User){
    const myProfile = await this.userService.myProfile(user.id);

    return { 
      name: myProfile.name +"#"+ myProfile.id,
      email: myProfile.email,
      role : myProfile.role==0?"user":"admin",
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put("myProfile")
  async updateMyProfile(@UserInfo() user: User, @Body() updateDto: UpdateDto){
     await this.userService.updateMyProfile(user.id, updateDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete("myProfile")
  async deleteMyProfile(@UserInfo() user: User){
    await this.userService.deleteMyProfile(user.id);
  }


}