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

import { CustomersService } from 'src/users/services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/users/dtos/customers.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Public()
  @Get()
  @ApiOperation({summary: 'Get all customers in the API.'})
  getUsers() {
    return this.customersService.findAll();
  }

  @Public()
  @Get(':customerId')
  @ApiOperation({summary: 'With the id get a customer and see it more detailed'})
  @HttpCode(HttpStatus.ACCEPTED)
  getUser(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.customersService.findOne(customerId);
  }

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({summary: 'Create a new customer.'})
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);

  }

  @Roles(Role.ADMIN)
  @Put(':id')
  @ApiOperation({summary: 'Edit the data of a customer giving their id.'})
  update(@Param('id') id: string, @Body() payload: UpdateCustomerDto) {
    return this.customersService.update(+id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({summary: 'Delete a customer giving their id.'})
  delete(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
