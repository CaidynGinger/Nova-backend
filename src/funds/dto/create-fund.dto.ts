import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateFundDto {
  @IsNotEmpty()
  @IsNumber()
  expenses: number;

  @IsNotEmpty()
  @IsNumber()
  income: number;

  @IsNotEmpty()
  @IsNumber()
  project: number;
}
