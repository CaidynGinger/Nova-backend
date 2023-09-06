import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { NoteModule } from './note/note.module';
import { JobsModule } from './jobs/jobs.module';
import entities from 'src';
import { FundsModule } from './funds/funds.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: entities,
        synchronize: true,
        dropSchema: true,
      }),
      inject: [ConfigService],
    }), ProjectModule, UsersModule, JobsModule, NoteModule, FundsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
