import { Expose } from 'class-transformer';

export class ClientsUserResponseDto {
  @Expose()
  id: number;

  // @Expose()
  // profileImage: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  clientsType: string;

  @Expose()
  availableHours: number;

  // @Expose()
  // payPerHour: number;

  @Expose()
  active: boolean;

  // @Expose()
  // position: string;

  // @Expose()
  // jobs: number[];

  //   @Expose()
  //   createdJobs: number[];

  //   @Expose()
  //   projects: number[];

  //   @Expose()
  //   notes: number[];

  // Other fields you want to expose
}
