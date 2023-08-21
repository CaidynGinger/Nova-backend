import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateFundDto {
  @IsOptional()
  @IsNumber()
  id: number;

  // @IsNotEmpty()
  // @IsString()
  // type: string;

  @IsNotEmpty()
  @IsNumber()
  expenses: number;

  @IsNotEmpty()
  @IsNumber()
  income: number;

  @IsNotEmpty()
  @IsNumber()
  project: number;

  // @IsNotEmpty()
  // @IsNumber()
  // createdBy: number; // Assuming you provide the user ID here
}
