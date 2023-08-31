import { Expose } from 'class-transformer';

export class StaffUserResponseDto {
  @Expose()
  id: number;

  @Expose()
  profileImage: string;

  @Expose()
  email: number[];

  @Expose()
  username: string;

  @Expose()
  payPerHour: number;

  @Expose()
  staffType: string;

  @Expose()
  position: string;

  @Expose()
  jobs: number[];

  @Expose()
  availableHours: number;
  
  @Expose()
  active: boolean;

  //   @Expose()
  //   createdJobs: number[];

  //   @Expose()
  //   projects: number[];

  //   @Expose()
  //   notes: number[];

  // Other fields you want to expose
}
