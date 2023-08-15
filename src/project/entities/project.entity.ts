import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({
    type: 'integer', 
    array: true, 
    name: 'notes',
    default: [] })
  notes: number[];

  @Column('jsonb', { nullable: true })
  fundingLedger: any[];
}
