import { Get, NotFoundException, Param, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('profiles')
export class ProfileController {
  constructor(private userService: UserService) {}

  @Get('/:first_name')
  async findProfile(@Param('first_name') first_name: string) {
    const user = await this.userService.findOne({ first_name });
    if (!user) {
      throw new NotFoundException('Pepani yemwe mukufunayo palibe');
    }
    return { profile: user };
  }

  @Post('/:first_name/follow')
  followUser(@Param("first_name") first_name: string){
    return this.userService.followUser(first_name)
  }
}

