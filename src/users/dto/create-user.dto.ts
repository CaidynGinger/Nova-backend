import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @MinLength(3)
  username: string;

  @IsOptional()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsArray()
  @IsNumber() // This ensures each item in the array is a number
  roles: number[];

  @IsOptional()
  jobs: []

  @IsOptional()
  payPerHour: number
}
