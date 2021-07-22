import {
  Body,
  ClassSerializerInterceptor,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Controller, Query } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { MemberService } from './member.service';
import { MemberCreateDto } from './models/member-create.dto';
import { MemberUpdateDto } from './models/member-update.dto';
import { Member } from './models/member.entity';
import { Request } from 'express';


@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('members')
export class MemberController {
  constructor(
    private memberService: MemberService,
    private authService: AuthService,
  ) {}

  @Get()
  async allMembers(@Query('page') page = 1) {
    return this.memberService.paginate(page);
  }

  @Post()
  async createMember(@Body() body: MemberCreateDto, @Req() request: Request) {
    const user_id = await this.authService.userId(request);
    return this.memberService.create({
      title: body.title,
      family_name: body.family_name,
      given_names: body.given_names,
      gender: body.gender,
      email: body.email,
      is_active: body.is_active,
      is_approved: body.is_approved,
      date_of_birth: body.date_of_birth,
      fax: body.fax,
      created_by: { id: user_id}
    });
  }

  @Get(':id')
  async getMember(@Param('id') id: number) {
    return this.memberService.findOne({ id }, ['created_by']);
  }

  @Put(':id')
  async updateMember(@Param('id') id: number, @Body() body: MemberUpdateDto) {
    await this.memberService.update(id, body);
    return this.memberService.findOne({ id });
  }

  @Delete(':id')
  async deleteMember(@Param('id') id: number) {
    return await this.memberService.delete(id);
  }
}
