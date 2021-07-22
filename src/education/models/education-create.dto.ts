import { IsBoolean, IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

export class EducationCreateDto {
  @IsNotEmpty()
  education_institution: string;

  @IsNotEmpty()
  qualification: string;

  @IsNotEmpty()
  started_from: Date;

  @IsNotEmpty()
  finished_in: Date;

  // @IsNotEmpty()
  // member_id?: number;
}
