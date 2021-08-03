import { IsEmail, IsOptional, MaxLength } from 'class-validator';

export class UserUpdateDto {
 
  @IsOptional()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @MaxLength(256)
  bio?: string;

  @IsOptional()
  image: string | null;
}
