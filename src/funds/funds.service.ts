import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFundDto } from './dto/create-fund.dto';
import { UpdateFundDto } from './dto/update-fund.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project, User, Fund } from 'src';

@Injectable()
export class FundsService {


  constructor(
    @InjectRepository(Fund) private readonly fundRepository: Repository<Fund>,
  ) {}

  async create(createFundDto: CreateFundDto, project: Project, user: User) {
    return await this.fundRepository.save({...createFundDto, project, owner:user});
  }

  async findAll() {
    return await this.fundRepository.find(
      {
        relations: ['project', 'owner'],
      },
    );
  }

  async findOne(id: number) {
    return await this.fundRepository.findOne({where : {id: id}});
  }

  async update(id: number, updateFundDto: UpdateFundDto) {
    const fund = await this.findOne(id);
    if (!fund) {
      throw new NotFoundException('Fund not found');
    }
    Object.assign(fund, updateFundDto);
    return this.fundRepository.save(fund);
  }

  async remove(id: number) {
    const fund = await this.findOne(id);
    if (!fund) {
      throw new NotFoundException('Fund not found');
    }
    await this.fundRepository.delete(id);
    return fund; 
  }
}
