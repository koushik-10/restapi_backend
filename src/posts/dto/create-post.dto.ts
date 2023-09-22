import { IsString, IsNotEmpty, MinLength } from 'class-validator';
export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;
  @IsNotEmpty()
  @MinLength(3)
  body: string;
  categories: string[];
}
