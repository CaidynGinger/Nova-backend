import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'note_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  title: string;

  @Column({
    nullable: false,
    default: '',
  })
  note: string;

  @Column({
    nullable: false,
  })
  owner: number;

  @ManyToOne(() => Project, (project) => project.notes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  project: Project;
}
