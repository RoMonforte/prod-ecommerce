import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between , FindConditions} from 'typeorm';

import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto
} from 'src/products/dtos/products.dto';

import { Product } from './../entities/product.entity';
import { BrandsService } from './brands.service';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    private brandsService: BrandsService,
  ) {}

  findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindConditions<Product> = {};
      const { limit, offset } = params;
      const { maxPrice, minPrice } = params;
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found!`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const isUsed = await this.productRepo.find({ where: { name: data.name } });
    if (isUsed.length === 0) {
      const newProduct = this.productRepo.create(data);
      if (data.brandId) {
        const brand = await this.brandRepo.findOne(data.brandId);
        newProduct.brand = brand;
      }
      if (data.categoriesId) {
        const categories = await this.categoryRepo.findByIds(data.categoriesId);
        newProduct.categories = categories;
      }
      return this.productRepo.save(newProduct);
    }
    throw new NotAcceptableException(
      `Product with name ${data.name} already exists`,
    );
  }

  async update(id: any, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found!`);
    }
    if (changes.brandId) {
      const brand = await this.brandRepo.findOne(changes.brandId);
      product.brand = brand;
    }
    if (changes.categoriesId) {
      const categories = await this.categoryRepo.findByIds(
        changes.categoriesId,
      );
      product.categories = categories;
    }

    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async removeCategoryofProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepo.save(product);
  }

  async addCategoryOfProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    const category = await this.categoryRepo.findOne(categoryId);
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  async remove(id: any) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id #${id} not found!`);
    }
    this.productRepo.delete(id);
    return {
      message: `Product with id # ${id} deleted!`,
    };
  }
}
