import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';

import { ProductsModule } from 'src/products/products.module';

import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';
import { Order } from './entities/order.entity';

import { OrderItem } from './entities/order-item.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderItemService } from './services/order-item.service';
import { Product } from 'src/products/entities/product.entity';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem, Product]),
  ],
  controllers: [
    CustomersController,
    UsersController,
    OrdersController,
    OrderItemController,
    ProfileController,
  ],
  providers: [CustomersService, UsersService, OrdersService, OrderItemService],
  exports: [UsersService],
})
export class UsersModule {}
