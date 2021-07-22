import { IsBoolean, IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

export class MemberCreateDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  family_name: string;

  @IsNotEmpty()
  given_names: string;

//   @IsDateString()
  date_of_birth?: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  fax?: string;

  @IsBoolean()
  is_active?: boolean;

  @IsBoolean()
  is_approved?: boolean;
}
