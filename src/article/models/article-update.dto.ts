import { IsArray, IsOptional, IsString } from 'class-validator';

export class ArticleUpdateDTO {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  body: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tag_list: string[];
}
