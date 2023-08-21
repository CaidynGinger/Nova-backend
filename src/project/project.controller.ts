import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
  Headers
} from '@nestjs/common';
import { ProjectService } from './services/project.service';
import { ProjectCreateRequest } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateNoteDto } from '../note/dto/create-note.dto';

import {
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ProjectResponseDto } from './dto/project.dto';
import { ProjectNoteService } from './services/project.note.service';
import { CreateFundDto } from 'src/funds/dto/create-fund.dto';
import { ProjectFundingService } from './services/project.funding.service';

// @Serialize(ProjectResponseDto)
@Controller('projects')
@ApiTags('Projects')
@ApiResponse({
  status: 400,
  description:
    'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
})
@ApiResponse({
  status: 401,
  description:
    'Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.',
})
@ApiResponse({
  status: 403,
  description:
    'The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the clients identity is known to the server.',
})
@ApiResponse({
  status: 500,
  description:
    'The server has encountered a situation it does not know how to handle.',
})
@ApiResponse({
  status: 200,
  description: 'The server worked',
})
@ApiResponse({
  status: 201,
  description: 'The server worked and an item was created',
})
export class ProjectController {
  constructor(private readonly projectService: ProjectService,
    private readonly projectsNoteService: ProjectNoteService,
    private readonly projectFundingService: ProjectFundingService,
    ) {}

  /**
   * Retrieves a list of all projects.
   */
  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  /**
   * Retrieves details of a specific project.
   *
   * An identifier that uniquely represents the project.
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findOne(id);
  }

  @Post()
  async create(
    @Body() ProjectCreateRequest: ProjectCreateRequest) {
    return await this.projectService.create(ProjectCreateRequest);
  }

  @Put(':id')
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

  // notes

  @Get(':id/notes')
  getNotes(@Param('id', ParseIntPipe) id: number) {
    return null;
  }
  @Get(':id/notes/:noteId')
  getNote(@Param('id', ParseIntPipe) id: number) {
    return null;
  }
  // add note to project
  @Post(':id/notes')
  async addNote(
    @Headers('user_id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() createNoteDto: CreateNoteDto,
  ) {
    return await this.projectsNoteService.addNoteToProject(id, createNoteDto, userId);
  }

  @Put(':id/notes/:noteId')
  updateNote(
    @Param('id', ParseIntPipe) id: number,
    @Param('noteId', ParseIntPipe) noteId: number,
    @Body() createNoteDto: CreateNoteDto,
  ) {
    return this.projectsNoteService.updateNote(id, noteId, createNoteDto);
  }

   /**
   * Deletes a specific note associated with a project.
   *
   * @param id An identifier that uniquely represents the project.
   * @param noteId An identifier that uniquely represents the note.
   */
   @Delete(':id/notes/:noteId')
   deleteNote(
     @Param('id', ParseIntPipe) id: number,
     @Param('noteId', ParseIntPipe) noteId: number,
   ) {
      return this.projectsNoteService.removeNoteFromProject(id, noteId);
     // Implementation details
   }



  //  funds

  @Get(':id/funds')
  getFunds(@Param('id', ParseIntPipe) id: number) {
    return null;
  }

  @Post(':id/funds')
  async createFund(
    @Headers('user_id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() createFundDto: CreateFundDto,
    ) {
    return await this.projectFundingService.addFundsToProject(id, createFundDto, userId);
  }

  @Delete(':id/funds/:fundsId')
  async deleteFunds(
     @Param('id', ParseIntPipe) id: number,
     @Param('fundsId', ParseIntPipe) fundsId: number,
   ) {
      return this.projectFundingService.removeFundsFromProject(id, fundsId);
     // Implementation details
   }
}
