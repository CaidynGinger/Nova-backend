import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job, Project, User } from 'src';
import { Repository } from 'typeorm';

@Injectable()
export class JobsService {

  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto, project: Project, assignedUser: User) {
    return await this.jobRepository.save({
      ...createJobDto,
      project,
      assignedUser: assignedUser,
    });
  }

  findAll() {
    return this.jobRepository.find({
      relations: ['project', 'assignedUser'],
    });
  }

  async findOne(id: number) {
    return await this.jobRepository.findOne({ where: { taskId: id } });
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    const job = await this.findOne(id);
    if (!job) {
      throw new NotFoundException('Fund not found');
    }
    Object.assign(job, updateJobDto);
    return this.jobRepository.save(job);
  }

  async changeJobStatus(id: number) {
    const job = await this.findOne(id);
    if (!job) {
      throw new NotFoundException('Fund not found');
    }
    job.status = !job.status;
    return this.jobRepository.save(job);
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
