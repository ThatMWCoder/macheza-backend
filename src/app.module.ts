import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/models/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/models/role.entity';
import { PermissionModule } from './permission/permission.module';
import { Permission } from './permission/models/permission.entity';
import { AbstractService } from './common/abstract.service';
import { MemberModule } from './member/member.module';
import { Member } from './member/models/member.entity';
import { EducationModule } from './education/education.module';
import { Education } from './education/models/education.entity';
import "dotenv/config"

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      logging: false,
      entities: [User, Role, Permission, Member, Education],
    }),
    AuthModule,
    CommonModule,
    RoleModule,
    PermissionModule,
    MemberModule,
    EducationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
