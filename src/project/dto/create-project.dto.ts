import { IsNotEmpty, IsOptional, IsDateString, IsArray, IsString, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  clientOwner: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  jobs: number[];

  @IsNotEmpty()
  @IsDateString()
  createdDate: Date;

  @IsOptional()
  @IsDateString()
  deadlineDate: Date;

  @IsOptional()
  @IsDateString()
  completedDate: Date;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  notes: number[];

  fundingLedger: any[]; // Since the column is jsonb, validation might vary, adjust as needed
}