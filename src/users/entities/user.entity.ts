import { Job } from 'src/jobs/entities/job.entity';
import { Note } from 'src/note/entities/note.entity';
import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
    type: 'integer', 
    array: true, 
    name: 'user_rolls',
    default: [2000] }) // Define the new array column
  rolls: number[];

  @Column({ 
    type: 'bigint', 
    array: true, 
    name: 'user_jobs',
    default: [] }) // Define the new array column
  jobs: number[];

  @Column({ type: 'integer', default: 0 }) // Default value is set to 0, adjust as needed
  payPerHour: number;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @OneToMany(() => Job, job => job.createdBy)
  @JoinColumn({ name: 'user_id' })
  createdJobs: Job[];

  @OneToMany(() => Project, project => project.clientOwner)
  @JoinColumn({ name: 'user_id' })
  projects: Project[];

  @OneToMany(() => Note, note => note.owner)
  @JoinColumn({ name: 'user_id' })
  notes: Note[];
}
