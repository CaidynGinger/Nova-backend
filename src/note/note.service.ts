import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note, Project, User } from 'src';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {

  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto, project: Project, user: User) {
    return await this.noteRepository.save({...createNoteDto, project, owner:user});
  }

  async findAll() {
    return await this.noteRepository.find();
  }

  async findOne(id: number) {
    return await this.noteRepository.findOne({where : {id: id}});
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.findOne(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    Object.assign(note, updateNoteDto);
    return this.noteRepository.save(note);
  }

  async remove(id: number) {
    const note = await this.findOne(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    await this.noteRepository.delete(id);
    return note;
  }
}
