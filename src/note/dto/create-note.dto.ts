import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNoteDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  note: string;

  @IsNotEmpty()
  @IsString()
  owner: number;
}