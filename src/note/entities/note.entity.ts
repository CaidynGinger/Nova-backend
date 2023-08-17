import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => User, user => user.notes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  owner: User;

  @ManyToOne(() => Project, (project) => project.notes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  project: Project;
}
