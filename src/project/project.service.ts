import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src'
import { Note } from 'src'
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
@Injectable()
export class ProjectService {

  constructor(
    @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>
  ) {}

  create(createProjectDto: CreateProjectDto) {
    const newProject = this.projectRepository.create(createProjectDto);
    return this.projectRepository.save(newProject);
  }

  async findAll() {
    const projectList = await this.projectRepository.find();
    array.forEach(element => {
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
      }
    });
    return projectList
  }

  async findOne(id: number) {
    return await this.projectRepository.findOne({ where: { id: id } });
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
    return await this.projectRepository.delete(id);
  }

  async addNoteToProject(id: number, createNoteDto: CreateNoteDto) {
    const project = await this.findOne(id);
    if (!project) {
      throw new NotFoundException('project not found');
    }
    const newNote = this.noteRepository.create(createNoteDto);
    await this.noteRepository.save(newNote);

    const updatedProject = {
      ...project,
      notes: [...project.notes, newNote.id]
    }
    console.log(updatedProject);
    return this.projectRepository.save(updatedProject);
  }
}
