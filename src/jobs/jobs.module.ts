import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [JobsController],
  providers: [JobsService]
})
export class JobsModule {}
