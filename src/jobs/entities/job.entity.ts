import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, project => project.jobs)
  project: Project;

  @Column()
  description: string;

  @Column({ type: 'date', nullable: true })
  createdDate: Date;

  @Column({ type: 'date', nullable: true })
  deadlineDate: Date;

  @Column({ type: 'date', nullable: true })
  completedDate: Date;

  @ManyToOne(() => User, user => user.createdJobs)
  createdBy: User; // admin

  @ManyToOne(() => User, user => user.jobs)
  createdFor: User; // staff 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}





