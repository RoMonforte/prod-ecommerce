import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customers.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepo.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with id #${id} not found!`);
    }
    return customer;
  }

  async create(data: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(data);
    return this.customerRepo.save(newCustomer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.customerRepo.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with id #${id} not found!`);
    }
    this.customerRepo.merge(customer, changes);
    return this.customerRepo.save(customer);
  }

  async remove(id: number) {
    const customer = await this.customerRepo.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with id #${id} not found!`);
    }
    this.customerRepo.delete(id);
    return {
      message: `Customer with id # ${id} deleted!`,
    };
  }
}
