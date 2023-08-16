import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Note } from './notes.entity';

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

  @Column({
    type: 'integer',
    nullable: false,
  })
  clientOwner: number;

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

  // @Column({
  //   type: 'integer', 
  //   array: true, 
  //   name: 'notes',
  //   default: [] })
  // notes: number[];

  @Column('jsonb', { nullable: true })
  fundingLedger: any[];
}
