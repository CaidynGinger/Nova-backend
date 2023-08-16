import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project, User } from 'src';
import { Note } from 'src';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    const newProject = this.projectRepository.create(createProjectDto);
    return this.projectRepository.save(newProject);
  }
  async findAll() {
    const projectList = await this.projectRepository.find({
      select: ['notes'],
      relations: ['notes'],
    });
    return projectList;
  }

  async findOne(id: number) {
    return await this.projectRepository.findOne({ where: { id: id }, relations: ['notes'],});
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(id);
    if (!project) {
      throw new NotFoundException('project not found');
    }
    Object.assign(project, updateProjectDto);
    return this.projectRepository.save(project);
  }

  async remove(id: number) {
    const project = await this.findOne(id);
    if (!project) {
      throw new NotFoundException('project not found');
    }
    await this.projectRepository.delete(id);
    return project
  }

  async addNoteToProject(id: number, createNoteDto: CreateNoteDto) {
    const project = await this.projectRepository.findOne({ where: { id: id } });
    if (!project) {
      throw new NotFoundException('project not found');
    }

    const newNote = this.noteRepository.create({
      ...createNoteDto,
      project: project,
    });
    await this.noteRepository.save(newNote);

    return this.projectRepository.findOne({
      where: { id: id },
      relations: ['notes'],
    });

    // return this.projectRepository.findOne(id);
  }
}
