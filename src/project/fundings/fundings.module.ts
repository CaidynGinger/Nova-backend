import { Module } from '@nestjs/common';
import { FundingsService } from './fundings.service';
import { FundingsController } from './fundings.controller';
import { Funding } from 'src';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Funding])],
  controllers: [FundingsController],
  providers: [FundingsService],
  exports: [FundingsService],
})
export class FundingsModule {}
