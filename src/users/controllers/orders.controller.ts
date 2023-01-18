import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { OrdersService } from './../services/orders.service';
import { CreateOrderDto, UpdateOrderDto } from './../dtos/order.dto';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}


  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({summary: 'Get all orders in the API.'})
  findAll() {
    return this.orderService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  @ApiOperation({summary: 'With the id get an order and see it more detailed'})
  get(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({summary: 'Create an new order.'})
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  @ApiOperation({summary: 'Edit the data of an order giving their id.'})
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.orderService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({summary: 'Delete an order giving their id.'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(+id);
  }
}
