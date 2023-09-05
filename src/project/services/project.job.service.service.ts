import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJobDto } from 'src/jobs/dto/create-job.dto';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { JobsService } from 'src/jobs/jobs.service';
import { UsersService } from 'src/users/users.service';
import { filter } from 'rxjs';

@Injectable()
export class ProjectJobServiceService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @Inject(JobsService) private readonly jobsService: JobsService,
        @Inject(UsersService) private readonly usersService: UsersService,
    ) {}

    async addFundsToProject(id: number, createJobDto: CreateJobDto) {
        const project = await this.projectRepository.findOne({ where: { id: id } });
        if (!project) {
          throw new NotFoundException('project not found');
        }
        const assignedUser = await this.usersService.findOne(createJobDto.assignedUserId);
        return await this.jobsService.create(createJobDto, project, assignedUser);
        // return this.projectService.findOne(id);

      }

    async findProjectJobs(id: number) {
        const project = await this.projectRepository.findOne({ where: { id: id } });
        // return project  
        // filter(jobs => jobs.project.id === id) {
        //     return jobs
        // }

        const jobs = await this.jobsService.findAll();
        const projectJobs = jobs.filter(jobs => jobs.project.id.toString() === id.toString())

        return projectJobs

        
    }
}
