import { Note } from 'src/note/entities/note.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Funding } from '../fundings/entities/funding.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'project_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
    name: 'project_title',
  })
  title: string;

  @Column({
    nullable: false,
    default: '',
  })
  description: string;

  @ManyToOne(() => User, user => user.projects, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  clientOwner: User;

  @Column({
    type: 'integer', 
    array: true, 
    name: 'project_jobs',
    default: [] })
  jobs: number[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  deadlineDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedDate: Date;

  @OneToMany(() => Note, note => note.project, { cascade: true })
  @JoinColumn({ name: 'project_id' })
  notes: Note[];

  @OneToMany(() => Funding, funding => funding.project)
  @JoinColumn({ name: 'project_id' })
  fundingLedger: Funding[];
}
