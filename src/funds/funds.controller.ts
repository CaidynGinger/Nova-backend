import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FundsService } from './funds.service';
import { CreateFundDto } from './dto/create-fund.dto';
import { UpdateFundDto } from './dto/update-fund.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('funds')
@ApiTags('Funds')
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
export class FundsController {
  constructor(private readonly fundsService: FundsService) {}

  @Get()
  findAll() {
    return this.fundsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.fundsService.findOne(id);
  }
}
