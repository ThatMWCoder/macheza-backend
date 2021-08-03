import {
  BadRequestException,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { HttpCode } from '@nestjs/common';
import { User } from './models/user.entity';

@Controller('profiles')
export class ProfileController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/:username')
  @UseGuards(AuthGuard)
  async findProfile(
    @Param('username') username: string,
    @Req() request: Request,
  ) {
    const id = await this.authService.userId(request);
    const user = await this.userService.findOne(id);
    const profile = await this.userService.findByUsername(username);
    if (!profile) {
      throw new NotFoundException('Pepani yemwe mukufunayo palibe');
    }
    return { profile };
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post('/:username/follow')
  async followUser(
    @Param('username') username: string,
    @Req() request: Request,
  ) {
    const id = await this.authService.userId(request);
    const user = await this.userService.findOne(id);
    const profile = await this.userService.followUser(user, username);
    return { profile };
  }

  @Delete('/:username/follow')
  async unfollowUser(
    @Param('username') username: string,
    @Req() request: Request,
  ) {
    const id = await this.authService.userId(request);
    const user = await this.userService.findOne(id);
    const profile = await this.userService.unfollowUser(user, username);
    return { profile };
  }
}
