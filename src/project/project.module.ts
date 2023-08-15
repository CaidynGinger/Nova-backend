import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note, Project } from 'src';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Note])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
