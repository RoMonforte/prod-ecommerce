import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/categories.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne(id, {
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`Category with id #${id} not found!`);
    }
    return category;
  }

  async create(data: CreateCategoryDto) {
    const isUsed = await this.categoryRepo.find({ where: { name: data.name } });
    if (isUsed.length === 0) {
      const newCategory = this.categoryRepo.create(data);
      return this.categoryRepo.save(newCategory);
    }
    throw new NotAcceptableException(
      `Category with name ${data.name} already exists`,
    );
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with id #${id} not found!`);
    }
    const isUsed = await this.categoryRepo.find({
      where: { name: changes.name },
    });
    if (isUsed.length === 0) {
      this.categoryRepo.merge(category, changes);
      return this.categoryRepo.save(category);
    }
    throw new NotAcceptableException(
      `Brand with name ${changes.name} already exists`,
    );
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with id #${id} not found!`);
    }
    this.categoryRepo.delete(id);
    return {
      message: `Category with id # ${id} deleted!`,
    };
  }
}
