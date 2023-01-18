import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CreateOrderItemDto } from './../dtos/order-item.dto';
import { OrderItemService } from './../services/order-item.service';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('add product to order')
@Controller('order-item')
export class OrderItemController {
  constructor(private itemsService: OrderItemService) {}

  @Roles(Role.CUSTOMER, Role.ADMIN)
  @Post()
  @ApiOperation({summary: 'Add an specified id product to a specified id order.'})
  create(@Body() payload: CreateOrderItemDto) {
    return this.itemsService.create(payload);
  }
}
