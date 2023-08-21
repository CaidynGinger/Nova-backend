import { Module } from '@nestjs/common';
import { ProjectService } from './services/project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fund, Note, Project } from 'src';
import { UsersModule } from 'src/users/users.module';
import { NoteModule } from 'src/note/note.module';
import { ProjectFundingService } from './services/project.funding.service';
import { ProjectSupportService } from './services/project.support.service';
import { ProjectNoteService } from './services/project.note.service';
import { FundsModule } from 'src/funds/funds.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Note, Fund]),
    UsersModule,
    NoteModule,
    FundsModule
  ],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    ProjectFundingService,
    ProjectSupportService,
    ProjectNoteService,
  ],
  exports: [
    ProjectService,
    ProjectFundingService,
    ProjectSupportService,
    ProjectNoteService,
  ],
})
export class ProjectModule {}
