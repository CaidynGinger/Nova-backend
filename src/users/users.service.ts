import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  staffCreate(createUserDto: CreateUserDto) {
    createUserDto = {
      ...createUserDto,
      roles: [4000]
    }
    return createUserDto
  }

  async findStaff() {
    return await this.userRepository
      .createQueryBuilder('user')
      .where(':roleId = ANY(user.roles)', { roleId: 4000 }) // Use the ANY operator for array
      .getMany();
  }

  async findClientUsers() {
    return await this.userRepository
      .createQueryBuilder('user')
      .where(':roleId = ANY(user.roles)', { roleId: 3000 }) // Use the ANY operator for array
      .getMany();
  }

  // async findUsersByType(userType: string) {
  //   let userTypeNumber = 3000

  //   if (userType === "staff") {
  //     userTypeNumber = 4000
  //   }
  //   return await this.userRepository
  //     .createQueryBuilder('user')
  //     .where(':roleId = ANY(user.roles)', { roleId: userTypeNumber }) // Use the ANY operator for array
  //     .getMany();
  // }

  clientsCreate(createUserDto: CreateUserDto) {
    createUserDto = {
      ...createUserDto,
      roles: [3000],
      password: 'password'
    }
    return createUserDto
  }

  // who am i request 
  async whoAmI(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user
  }

  async findByEmail(email: string) {
    return await this.userRepository.find({ where: { email: email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return await this.userRepository.delete(id);
  }
}
