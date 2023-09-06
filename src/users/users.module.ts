import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src';
import { AuthService } from './auth/auth.service';
import { JobsModule } from 'src/jobs/jobs.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JobsModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService, AuthService], // Export the service here
})
export class UsersModule {}
