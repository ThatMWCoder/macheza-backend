import {
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

@Controller('profiles')
export class ProfileController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/:first_name')
  async findProfile(@Param('first_name') first_name: string) {
    const profile = await this.userService.findOne({ first_name });
    if (!profile) {
      throw new NotFoundException('Pepani yemwe mukufunayo palibe');
    }
    return { profile };
  }

  @UseGuards(AuthGuard)
  @Post('/:first_name/follow')
  async followUser(
    @Param('first_name') first_name: string,
    @Req() request: Request,
  ) {
    const id = await this.authService.userId(request);
    const user = await this.userService.findOne(id);
    const profile = await this.userService.followUser(user, first_name);
    return { profile };
  }

  @Delete('/:first_name/follow')
  async unfollowUser(
    @Param('first_name') first_name: string,
    @Req() request: Request,
  ) {
    const id = await this.authService.userId(request);
    const user = await this.userService.findOne(id);
    const profile = await this.userService.unfollowUser(user, first_name);
    return { profile };
  }
}
