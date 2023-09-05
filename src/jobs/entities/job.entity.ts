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

  @ManyToOne(() => User, user => user.jobs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  assignedUser: User;

  @Column({
    default: false,
  })
  status: boolean;

  @Column()
  title: string;

  @Column()
  workHours: number;
}





