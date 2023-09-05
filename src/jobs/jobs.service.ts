import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job, Project, User } from 'src';
import { Repository } from 'typeorm';

@Injectable()
export class JobsService {

  constructor(
    @InjectRepository(Job) private readonly JobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto, project: Project, assignedUser: User) {
    return await this.JobRepository.save({
      ...createJobDto,
      project,
      assignedUser: assignedUser,
    });
  }

  findAll() {
    return this.JobRepository.find({
      relations: ['project', 'assignedUser', ],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
