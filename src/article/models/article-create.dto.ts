import { IsArray, IsString } from 'class-validator';

export class ArticleCreateDTO {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({each: true})
  tag_list: string[];
}
