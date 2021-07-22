import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './models/user-create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserUpdateDto } from './models/user-update.dto';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  allUsers(@Query('page') page: number = 1) {
    return this.userService.paginate(page, ['role']);
  }

  @Post()
  async createUser(@Body() body: UserCreateDto): Promise<User> {
    const password = await bcrypt.hash('123456', 12);

    const { role_id, ...data } = body;
    return this.userService.create({
      ...data,
      password,
      role: { id: body.role_id },
    });
  }
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.userService.findOne({ id }, ['role']);
  }

  @Put('info')
  async updateInfo(
    @Body() body: UserUpdateDto, 
    @Req() request: Request
    ) {
    const id = await this.authService.userId(request);
    await this.userService.update(id, body);
    return this.userService.findOne({ id });
  }

  @Put('change-password')
  async updatePassword(
    @Req() request: Request,
    @Body("password") password: string,
    @Body("password_confirm") password_confirm: string,
  ) {

    if (password!==password_confirm) {
      throw new BadRequestException("Passwords do not match")

    }

    const hashed = await bcrypt.hash(password, 12)

    const id = await this.authService.userId(request);
    await this.userService.update(id, { 
      password: hashed
    });
    return this.userService.findOne({ id });
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() body: UserUpdateDto) {
    const { role_id, ...data } = body;
    await this.userService.update(id, {
      ...data,
      role: { id: role_id },
    });
    return this.userService.findOne({ id });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
