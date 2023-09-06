import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, UsePipes, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from './auth/auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from 'src/users/dto/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { StaffUserResponseDto } from './dto/staff.dto';
import { ClientsUserResponseDto } from './dto/clients.dto';
import { JobsService } from 'src/jobs/jobs.service';

// @Serialize(UserResponseDto)
@Controller('users')
@ApiTags('Users')
@ApiResponse({
  status: 400,
  description:
    'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
})
@ApiResponse({
  status: 401,
  description:
    'Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.',
})
@ApiResponse({
  status: 403,
  description:
    'The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401 Unauthorized, the clients identity is known to the server.',
})
@ApiResponse({
  status: 500,
  description:
    'The server has encountered a situation it does not know how to handle.',
})
@ApiResponse({
  status: 200,
  description: 'The server worked',
})
@ApiResponse({
  status: 201,
  description: 'The server worked and an item was created',
})
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly authService: AuthService,
    ) {}

  // @Post('/signup')
  // @UsePipes(ValidationPipe)
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.signup(createUserDto);
  // }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  signin(@Body() updateUserDto: UpdateUserDto) {
    return this.authService.signin(updateUserDto);
  }

  

  // staff 
  // create staff
  @Post('/staff')
  @UsePipes(ValidationPipe)
  staffCreate(@Body() createUserDto: CreateUserDto) {
    const staffUser = this.usersService.staffCreate(createUserDto);
    return this.authService.signup(staffUser);
    // return this.authService.signup(staffUser);
  }
  // get staff
  @Get('/staff')
  @Serialize(StaffUserResponseDto)
  @UsePipes(ValidationPipe)
  findStaffUsers() {
    return this.usersService.findStaff();
  }
  // clients
  @Post('/clients')
  @UsePipes(ValidationPipe)
  clientsCreate(@Body() createUserDto: CreateUserDto) {
    const staffUser = this.usersService.clientsCreate(createUserDto);
    return this.authService.signup(staffUser);
    // return this.authService.signup(staffUser);
  }
  @Get('/clients')
  @Serialize(ClientsUserResponseDto)
  @UsePipes(ValidationPipe)
  findClientUsers() {
    return this.usersService.findClientUsers();
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findUsersById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Get(':id/jobs')
  async getJobs(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getJobsByUserId(id);
  }
}
