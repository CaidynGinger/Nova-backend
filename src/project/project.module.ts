import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note, Project } from 'src';
import { UsersModule } from 'src/users/users.module';
import { NoteModule } from 'src/note/note.module';
// import { UsersService } from 'src/users/users.service';
import { FundingsModule } from './fundings/fundings.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Note]), UsersModule, NoteModule, FundingsModule],
  controllers: [ProjectController],
  providers: [ ProjectService]
})
export class ProjectModule {}
