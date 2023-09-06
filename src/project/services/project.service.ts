import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProjectCreateRequest } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project, User } from 'src';
import { Note } from 'src';
import { Repository, serialize } from 'typeorm';
import { CreateNoteDto } from '../../note/dto/create-note.dto';
import { NoteService } from 'src/note/note.service';
import { UsersService } from 'src/users/users.service';
import { UserResponseDto } from '../../users/dto/user.dto';
import { ProjectSupportService } from './project.support.service';
// import { UsersService } from 'src/users/users.service';
@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @Inject(UsersService) private readonly userService: UsersService,
    @Inject(NoteService) private readonly noteService: NoteService,

    private readonly projectSupportService: ProjectSupportService,

  ) {}

  async create(projectCreateRequest: ProjectCreateRequest) {
    const user = await  this.userService.findOne(projectCreateRequest.clientOwner);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const project = await this.projectRepository.save({...projectCreateRequest, clientOwner: user});
    // project.clientOwner = UserResponseDto
    return project;
  
  }

  async findAll() {
    const projectList = await this.projectRepository.find({
      select: ['notes', 'clientOwner', 'funds'  , 'jobs'],
      relations: ['notes', 'clientOwner', 'funds', 'jobs' ],
    });
    return projectList;
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({
      where: { id },
      select: ['notes', 'clientOwner', 'funds'  , 'jobs'],
      relations: ['notes', 'clientOwner', 'funds', 'jobs' ],
    });
    if (!project) {
      throw new NotFoundException('project not found');
    }
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(id);
    if (!project) {
      throw new NotFoundException('project not found');
    }
    if (updateProjectDto.clientOwner) {
      await this.projectSupportService.changeProjectOwner(project, updateProjectDto.clientOwner);
    }
    Object.assign(project, updateProjectDto);
    await this.projectRepository.save(project);
    return this.findOne(id);
  }

  async remove(id: number) {
    const project = await this.findOne(id);
    if (!project) {
      throw new NotFoundException('project not found');
    }
    await this.projectRepository.delete(id);
    return project;
  }

  

  // async updateNote(
  //   id: number,
  //   noteId: number,
  //   updateNoteDto: CreateNoteDto,
  // ): Promise<Note> {
  //   const project = await this.projectRepository.findOne({ where: { id: id } });
  //   if (!project) {
  //     throw new NotFoundException('project not found');
  //   }
  //   const note = await this.noteService.findOne(noteId);
  //   if (!note) {
  //     throw new NotFoundException('note not found');
  //   }
  //   Object.assign(note, updateNoteDto);
  //   // return this.noteService.update(noteId, note);
  //   return null
  // }

  // supporting functions

  
}


