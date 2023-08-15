import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note, Project, User } from 'src';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Note, User])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
