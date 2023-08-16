import { IsNotEmpty, IsOptional, IsDateString, IsArray, IsString, IsNumber } from 'class-validator';
import { Note } from '../entities/notes.entity';

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
  @IsString()
  notes: Note[];

  fundingLedger: any[]; // Since the column is jsonb, validation might vary, adjust as needed
}