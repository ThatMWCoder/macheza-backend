import { IsBoolean, IsDateString, IsEmail } from 'class-validator';

export class MemberUpdateDto {

  title?: string;

  family_name?: string;

  given_names?: string;

  date_of_birth?: string;

  gender: string;

  @IsEmail()
  email?: string;

  fax?: string;

  @IsBoolean()
  is_active?: boolean;

  @IsBoolean()
  is_approved?: boolean;
}
