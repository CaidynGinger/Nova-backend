import { Expose, Type } from "class-transformer";
import { UserResponseDto } from "src/users/dto/user.dto";
import { User } from "src/users/entities/user.entity";

export class JobResponseDto {
    @Expose()
    id: number;

    @Expose()
    description: string;

    @Expose()
    assignedUser: User;

    @Expose()
    status: boolean;

    @Expose()
    title: string;

    @Expose()
    workHours: number;

}