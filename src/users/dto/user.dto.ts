import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  rolls: number[];

  @Expose()
  jobs: number[];

  @Expose()
  payPerHour: number;

  @Expose()
  createdJobs: number[];

  @Expose()
  projects: number[];

  @Expose()
  notes: number[];

  // Other fields you want to expose
}