import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member } from './models/member.entity';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    CommonModule,
    AuthModule
],
  controllers: [MemberController, UploadController],
  providers: [MemberService],
})
export class MemberModule {}
