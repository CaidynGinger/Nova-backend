import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { CreateFundDto } from 'src/funds/dto/create-fund.dto';
import { UsersService } from 'src/users/users.service';
import { FundsService } from 'src/funds/funds.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectService } from './project.service';

@Injectable()
export class ProjectFundingService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @Inject(UsersService) private readonly userService: UsersService,
        @Inject(FundsService) private readonly fundsService: FundsService,
        private readonly projectService: ProjectService,
    ) {}


    async addFundsToProject(id: number, createFundingDto: CreateFundDto, userId: number) {
        const project = await this.projectRepository.findOne({ where: { id: id } });
        if (!project) {
          throw new NotFoundException('project not found');
        }
        const user = await this.userService.findOne(userId);
        await this.fundsService.create(createFundingDto, project, user);
        return this.projectService.findOne(id);
      }

      async removeFundsFromProject(id: number, fundsId: number) {
        const project = await this.projectRepository.findOne({ where: { id } });
        if (!project) {
          throw new NotFoundException('project not found');
        }
        await this.fundsService.remove(fundsId);
        return this.projectService.findOne(id);
      }

    // async addNoteToProject(id: number, createNoteDto: CreateNoteDto, userId: number) {
    //     const project = await this.projectRepository.findOne({ where: { id: id } });
    //     if (!project) {
    //       throw new NotFoundException('project not found');
    //     }
    //     const user = await this.userService.findOne(userId);
    //     await this.noteService.create(createNoteDto, project, user);
    //     return this.projectRepository.findOne({
    //       where: { id: id },
    //       relations: ['notes', 'clientOwner'],
    //     });
    //   }
}
