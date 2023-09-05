import { Fund } from 'src/funds/entities/fund.entity';
import { Note } from 'src/note/entities/note.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

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
  clientOwner: User; // client

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
  notes: Note[];

  @OneToMany(() => Fund, fund => fund.project, { cascade: true })
  funds: Fund[];

  @Column({ type: 'integer', nullable: true })
  profile: number
}
