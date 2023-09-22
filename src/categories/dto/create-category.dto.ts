import { MinLength, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @MinLength(1)
  @IsNotEmpty()
  @IsString()
  name: string;
}
