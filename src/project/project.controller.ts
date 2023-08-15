import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  // add note to project

  @Post(':id/notes')
  addNote(
    @Param('id', ParseIntPipe) id: number,
    @Body() createNoteDto: CreateNoteDto,
  ) {
    return this.projectService.addNoteToProject(id, createNoteDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.remove(id);
  }
}
