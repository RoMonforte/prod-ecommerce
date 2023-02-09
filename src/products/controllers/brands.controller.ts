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
  Query
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { BrandsService } from 'src/products/services/brands.service';
import { CreateBrandDto, UpdateBrandDto, FilterBrandsDto } from 'src/products/dtos/brands.dto';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Public()
  @Get()
  @ApiOperation({summary: 'List of all brands in the API'})
  getUsers(@Query() params: FilterBrandsDto,) {
    return this.brandsService.findAll(params);
  }

  @Public()
  @Get(':brandId')
  @ApiOperation({summary: 'With the id get a brand and see it more detailed'})
  @HttpCode(HttpStatus.ACCEPTED)
  getUser(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.brandsService.findOne(brandId);
  }

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({summary: 'Create a new brand'})
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);

  }

  @Roles(Role.ADMIN)
  @Put(':id')
  @ApiOperation({summary: 'Edit the data of a brand giving their id.'})
  update(@Param('id') id: string, @Body() payload: UpdateBrandDto) {
    return this.brandsService.update(+id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({summary: 'Delete a brand with their id.'})
  delete(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}
