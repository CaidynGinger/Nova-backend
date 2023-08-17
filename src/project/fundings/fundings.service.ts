import { Injectable } from '@nestjs/common';
import { CreateFundingDto } from './dto/create-funding.dto';
import { UpdateFundingDto } from './dto/update-funding.dto';
import { Funding } from './entities/funding.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Project } from '../entities/project.entity';

@Injectable()
export class FundingsService {

  constructor(
    @InjectRepository(Funding) private readonly fundingRepository: Repository<Funding>,
  ) {}


  async create(createFundingDto: CreateFundingDto, User: User, Project: Project) {
    return null
    // return await this.fundingRepository.save{...createFundingDto, project, owner:user};
  }

  findAll() {
    return `This action returns all fundings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} funding`;
  }

  update(id: number, updateFundingDto: UpdateFundingDto) {
    return `This action updates a #${id} funding`;
  }

  remove(id: number) {
    return `This action removes a #${id} funding`;
  }
}
