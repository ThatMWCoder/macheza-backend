import { IsEmail, IsOptional, MaxLength } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  first_name?: string;

  @IsOptional()
  last_name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MaxLength(100)
  bio?: string;

  image?: string | null;
}
