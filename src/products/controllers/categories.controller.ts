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

import { CategoriesService } from 'src/products/services/categories.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/categories.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';



@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Public()
  @Get()
  @ApiOperation({summary: 'Get all categories in the API.'})
  getProducts() {
    return this.categoriesService.findAll();
  }

  @Public()
  @Get(':categoryId')
  @ApiOperation({summary: 'With the id get a category and see it more detailed'})
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.findOne(categoryId);
  }

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({summary: 'Create a new category.'})
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }


  @Roles(Role.ADMIN)
  @Put(':id')
  @ApiOperation({summary: 'Edit the data of a category giving their id.'})
  update(@Param('id') id: string, @Body() payload: UpdateCategoryDto) {
    return this.categoriesService.update(+id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({summary: 'Delete a category giving their id.'})
  delete(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
