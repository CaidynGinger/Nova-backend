import {
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsArray,
  IsString,
  IsNumber,
} from 'class-validator';
import { Note } from 'src/note/entities/note.entity';
import { Funding } from '../fundings/entities/funding.entity';

export class ProjectCreateRequest {
  /**
   * An identifier that uniquely represents the project. Auto-generated.
   */
  @IsNotEmpty()
  @IsNumber()
  id: number;

  /**
   * A succinct and descriptive title of the project.
   */
  @IsNotEmpty()
  @IsString()
  title: string;

  /**
   * A detailed explanation of the project's goals, scope, and objectives.
   */
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
   * The unique identifier of the client who owns or initiated the project.
   */
  @IsNotEmpty()
  @IsNumber()
  clientOwner: number;

  /**
   * An array of identifiers representing individual jobs or tasks associated with the project.
   * Can be empty if no jobs are associated.
   */
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  jobs: number[];

  /**
   * The timestamp indicating when the project was initially created.
   */
  @IsNotEmpty()
  @IsDateString()
  createdDate: Date;

  /**
   * The timestamp representing the project's deadline for completion.
   * This field is optional and can be omitted if no specific deadline exists.
   */
  @IsOptional()
  @IsDateString()
  deadlineDate: Date;

  /**
   * The timestamp indicating when the project was completed.
   * This field is optional and can be omitted if the project is not yet completed.
   */
  @IsOptional()
  @IsDateString()
  completedDate: Date;

  /**
   * An array of supplementary notes related to the project.
   * Notes provide additional context and information about the project.
   * This field is optional and can be omitted if there are no notes.
   */
  @IsOptional()
  @IsArray()
  notes: Note[];

  

  /**
   * #An array containing ledger entries documenting financial transactions associated with the project's funding.
   * #The structure of the entries may vary depending on the project's financial tracking system.
   * #This field is required, but validation might vary due to JSONB data type.
   */
  @IsNotEmpty()
  fundingLedger: Funding[]; // Since the column is jsonb, validation might vary, adjust as needed
}
