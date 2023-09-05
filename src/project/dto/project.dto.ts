import { Expose, Type } from 'class-transformer';
import { type } from 'os';
import { Fund } from 'src/funds/entities/fund.entity';
import { JobResponseDto } from 'src/jobs/dto/job.dto';
import { Job } from 'src/jobs/entities/job.entity';
import { Note } from 'src/note/entities/note.entity';
import { UserResponseDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/entities/user.entity';

export class ProjectResponseDto {
    @Expose()
    id: number;
  
    @Expose()
    title: string;
  
    @Expose()
    description: string;
  
    @Expose()
    @Type(() => UserResponseDto) // Transform clientOwner to UserResponseDto
    clientOwner: UserResponseDto; // Change type to UserResponseDto
  
    @Expose()
    @Type(() => JobResponseDto) // Transform jobs to Job[]
    jobs: Job[]
  
    @Expose()
    baseCost: number;
  
    @Expose()
    deadlineDate: Date;

    
  
    // @Expose()
    // completedDate: Date;
  
    // @Expose()
    // notes: Note[];
  
    // @Expose()
    // funds: Fund[];
  }