import { Fund } from 'src/funds/entities/fund.entity';
import { Job } from 'src/jobs/entities/job.entity';
import { Note } from 'src/note/entities/note.entity';
import { Project } from 'src/project/entities/project.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    nullable: false,
    default: '',
  })
  companyName: string;

  @Column({
    type: 'integer',
    array: true,
    name: 'user_rolls',
    default: [2000],
  }) // Define the new array column
  roles: number[];

  @Column({
    type: 'bigint',
    array: true,
    name: 'user_jobs',
    default: [],
  }) // Define the new array column
  jobs: number[];

  @Column({ type: 'integer', default: 0 }) // Default value is set to 0, adjust as needed
  payPerHour: number;

  @Column({
    name: 'email_address',
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
    default: '',
  })
  firstName: string;

  @Column({
    nullable: false,
    default: '',
  })
  lastName: string;

  @Column({
    nullable: false,
    default: 1,
  })
  profileImage: number;

  @Column({
    nullable: false,
    default: 8,
  })
  availableHours: number;

  @Column({
    nullable: false,
    default: 0,
  })
  totalHours: number;

  @OneToMany(() => Job, (job) => job.createdBy)
  createdJobs: Job[];

  @OneToMany(() => Project, (project) => project.clientOwner)
  projects: Project[];

  @OneToMany(() => Note, (note) => note.owner)
  notes: Note[];

  @OneToMany(() => Fund, (fund) => fund.owner)
  funds: Fund[];

  @Column({
    nullable: true,
  })
  staffType: string;

  @Column({
    nullable: true,
  })
  clientsType: string;

  @Column({
    nullable: true,
  })
  position: string;

  @Column({
    nullable: true,
  })
  active: boolean;
}
