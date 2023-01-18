import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';


@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({summary: 'Get all users in the API.'})
  getUsers() {
    return this.usersService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':userId')
  @ApiOperation({summary: 'With the id get a user and see it more detailed'})
  @HttpCode(HttpStatus.ACCEPTED)
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findOne(userId);
  }

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({summary: 'Create a new user.'})
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);

  }

  @Roles(Role.ADMIN)
  @Put(':id')
  @ApiOperation({summary: 'Edit the data of a user giving their id.'})
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(+id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({summary: 'Delete a user giving their id.'})
  delete(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
