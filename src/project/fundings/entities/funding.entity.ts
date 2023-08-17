import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Funding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  amount: number;

  @Column()
  description: number;

  @ManyToOne(() => User)
  createdBy: User;

  @ManyToOne(() => Project, (project) => project.fundingLedger, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  project: Project;
  }