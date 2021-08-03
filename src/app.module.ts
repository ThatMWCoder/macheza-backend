import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/models/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ArticleModule } from './article/article.module';
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
      dropSchema: false,
      logging: false,
      entities: [User],
    }),
    AuthModule,
    CommonModule,
    ArticleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
