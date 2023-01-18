import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  findAll() {
    return this.brandRepo.find();
  }

  async findOne(id: number) {
    const brand = await this.brandRepo.findOne(id, {
      relations: ['products'],
    });
    if (!brand) {
      throw new NotFoundException(`Brand with id #${id} not found!`);
    }
    return brand;
  }

  async create(data: CreateBrandDto) {
    const isUsed = await this.brandRepo.find({ where: { name: data.name } });
    if (isUsed.length === 0) {
      const newBrand = this.brandRepo.create(data);
      return this.brandRepo.save(newBrand);
    }
    throw new NotAcceptableException(
      `Brand with name ${data.name} already exists`,
    );
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.brandRepo.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand with id #${id} not found!`);
    }
    const isUsed = await this.brandRepo.find({ where: { name: changes.name } });
    if (isUsed.length === 0) {
      this.brandRepo.merge(brand, changes);
      return this.brandRepo.save(brand);
    }
    throw new NotAcceptableException(
      `Brand with name ${changes.name} already exists`,
    );
  }

  async remove(id: number) {
    const brand = await this.brandRepo.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand with id #${id} not found!`);
    }
    this.brandRepo.delete(id);
    return {
      message: `Brand with id # ${id} deleted!`,
    };
  }
}
