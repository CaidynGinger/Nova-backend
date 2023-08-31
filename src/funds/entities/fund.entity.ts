import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fund {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'note_id',
  })
  id: number;

  @Column({
    type: 'integer',
    default: 0,
  })
  expenses: number;
  @Column({
    type: 'integer',
    default: 0,
  })
  income: number;

  @Column({
    type: 'text',
  })
  note: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @ManyToOne(() => Project, (project) => project.funds, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  project: Project;

  @ManyToOne(() => User, (user) => user.funds, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  owner: User;  
}
