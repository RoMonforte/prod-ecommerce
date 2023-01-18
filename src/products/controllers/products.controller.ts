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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ProductsService } from '../services/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from 'src/products/dtos/products.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  @ApiOperation({summary: 'Get all products in the API'})
  getProducts(
    @Query() params: FilterProductsDto,
  ) {

    return this.productsService.findAll(params);
  }

  @Public()
  @Get(':productId')
  @ApiOperation({summary: 'With the id get a product and see it more detailed'})
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({summary: 'Create a new product.'})
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  @ApiOperation({summary: 'Edit the data of a product giving their id.'})
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload);
  }

  @Roles(Role.ADMIN)
  @Put(':id/category/add/:categoryId')
  @ApiOperation({summary: 'Add a category of a product giving their id.'})
  addCategory(@Param('id') id: number, @Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.productsService.addCategoryOfProduct(id, categoryId);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({summary: 'Delete a product giving their id.'})
  delete(@Param('id') id: number) {
    return this.productsService.remove(id);
  }

  @Roles(Role.ADMIN)
  @Delete(':id/category/remove/:categoryId')
  @ApiOperation({summary: 'Remove a category of a product giving their id.'})
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.removeCategoryofProduct(id, categoryId);
  }
}
