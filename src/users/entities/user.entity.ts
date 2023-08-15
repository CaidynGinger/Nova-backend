import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @Column({ 
    type: 'integer', 
    array: true, 
    name: 'user_rolls',
    default: [2000] }) // Define the new array column
  rolls: number[];

  @Column({ 
    type: 'bigint', 
    array: true, 
    name: 'user_jobs',
    default: [] }) // Define the new array column
  jobs: number[];

  @Column({ type: 'integer', default: 0 }) // Default value is set to 0, adjust as needed
  payPerHour: number;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;
}
