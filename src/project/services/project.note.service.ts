import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NoteService } from 'src/note/note.service';
import { UsersService } from 'src/users/users.service';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoteDto } from 'src/note/dto/create-note.dto';
import { Note } from 'src/note/entities/note.entity';

@Injectable()
export class ProjectNoteService {

    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @Inject(UsersService) private readonly userService: UsersService,
        @Inject(NoteService) private readonly noteService: NoteService,
      ) {}

    async addNoteToProject(id: number, createNoteDto: CreateNoteDto, userId: number) {
        const project = await this.projectRepository.findOne({ where: { id: id } });
        if (!project) {
          throw new NotFoundException('project not found');
        }
        const user = await this.userService.findOne(userId);
        await this.noteService.create(createNoteDto, project, user);
        return this.projectRepository.findOne({
          where: { id: id },
          relations: ['notes', 'clientOwner'],
        });
      }
    
      async updateNote(
        id: number,
        noteId: number,
        updateNoteDto: CreateNoteDto,
      ): Promise<Note> {
        const project = await this.projectRepository.findOne({ where: { id: id } });
        if (!project) {
          throw new NotFoundException('project not found');
        }
        const note = await this.noteService.findOne(noteId);
        if (!note) {
          throw new NotFoundException('note not found');
        }
        Object.assign(note, updateNoteDto);
        return this.noteService.update(noteId, updateNoteDto);
      }
    
      async removeNoteFromProject(id: number, noteId: number) {
        const project = await this.projectRepository.findOne({ where: { id: id } });
        if (!project) {
          throw new NotFoundException('project not found');
        }
        await this.noteService.remove(noteId);
        return this.projectRepository.findOne({
          where: { id: id },
          relations: ['notes'],
        });
      }
}
