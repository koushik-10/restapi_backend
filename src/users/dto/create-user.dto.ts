import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}
