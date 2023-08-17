import { Inject, Injectable } from '@nestjs/common';
import { Project } from '../entities/project.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProjectSupportService {

    constructor(
        @Inject(UsersService) private readonly userService: UsersService,
    ) {}

    async changeProjectOwner(project: Project, newOwnerId: number) {
        const newOwner = await this.userService.findOne(newOwnerId);
        project.clientOwner = newOwner;
      }
}
