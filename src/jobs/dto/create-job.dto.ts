import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';
export class CreateJobDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  assignedUserId: number;

  @IsNumber()
  @IsNotEmpty()
  workHours: number;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
