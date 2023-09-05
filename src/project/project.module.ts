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
import { ProjectJobServiceService } from './services/project.job.service.service';
import { JobsModule } from 'src/jobs/jobs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Note, Fund]),
    UsersModule,
    NoteModule,
    FundsModule,
    JobsModule,
  ],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    ProjectFundingService,
    ProjectSupportService,
    ProjectNoteService,
    ProjectJobServiceService,
  ],
  exports: [
    ProjectService,
    ProjectFundingService,
    ProjectSupportService,
    ProjectNoteService,
  ],
})
export class ProjectModule {}
