import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateFundingDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsString()
  description: number;

  @IsNotEmpty()
  @IsNumber()
  createdBy: number; // Assuming you provide the user ID here
}
