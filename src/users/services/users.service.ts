import { Injectable, NotFoundException, NotAcceptableException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { User } from '../entities/user.entity';

import { CustomersService } from './customers.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private customersService: CustomersService,
  ) {}


  findAll() {
    return this.userRepo.find({
      relations: ['customer'],
    });

  }

  async findOne(id: any) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found!`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const isUsed = await this.userRepo.find({ where:{username: data.username }})
    if (isUsed.length === 0) {
      const newUser = this.userRepo.create(data);
      const hashPasword = await bcrypt.hash(newUser.password, 10);
      newUser.password =  hashPasword;
      if (data.customerId) {
        const customer = await this.customersService.findOne(data.customerId);
        newUser.customer = customer;
      }
      return this.userRepo.save(newUser);
    }
    throw new NotAcceptableException(`User with username ${data.username} already exists`);
  }

  async update(id: any, changes: UpdateUserDto) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found!`);
    }
    const isUsed = await this.userRepo.find({ where:{username: changes.username }})
    if (isUsed.length === 0) {
      this.userRepo.merge(user, changes);
      return this.userRepo.save(user);
    }
    throw new NotAcceptableException(`User with name ${changes.username} already exists`);
  }

  async remove(id: any) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found!`);
    }
    this.userRepo.delete(id)
    return {
      message: `User with id # ${id} deleted!`
    }
  }

  findByUsername(username: string) {
    return this.userRepo.findOne({where: {username}});
  }
  // async findOneOrder(id: number) {
  //   const user = this.findOne(id);
  //   return {
  //     date: new Date(),
  //     user,
  //     products: await this.productsService.findAll(),

  //   }
  // }

  // getTasks() {
  //   return new Promise((resolve, reject) => {
  //     this.clientPg.query('SELECT * FROM tasks', (err, res) => {
  //       if(err) {
  //         reject(err);
  //       }
  //       resolve(res.rows);
  //     });
  //   });

  // }
}
