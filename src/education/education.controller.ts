import {
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
import { Request } from 'express';
import { MemberUpdateDto } from 'src/member/models/member-update.dto';
import { EducationService } from './education.service';
import { AuthService } from 'src/auth/auth.service';
import { EducationCreateDto } from './models/education-create.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('members/:id/education')
export class EducationController {
  constructor(
    private educationService: EducationService,
    private authService: AuthService,
  ) {}

  @Get()
  async allEducation(@Query('page') page = 1) {
    return this.educationService.paginate(page, ['member']);
  }

  @Post()
  async createEducation(
    @Param('id') id: number,
    @Body() body: EducationCreateDto,
    @Req() request: Request,
  ) {
    const user_id = await this.authService.userId(request);
    return this.educationService.create({
      education_institution: body.education_institution,
      started_from: body.started_from,
      finished_in: body.finished_in,
      qualification: body.qualification,
      member: Number(id),
      created_by: { id: user_id },
    });
  }

  @Get(':id')
  async getMember(@Param('id') id: number) {
    return this.educationService.findOne({ id }, ['created_by', 'member']);
  }

  @Put(':id')
  async updateMember(@Param('id') id: number, @Body() body: MemberUpdateDto) {
    await this.educationService.update(id, body);
    return this.educationService.findOne({ id });
  }

  @Delete(':id')
  async deleteMember(@Param('id') id: number) {
    return await this.educationService.delete(id);
  }
}
