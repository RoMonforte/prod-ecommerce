import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
  ValidateIf
} from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty( {description: 'The name of the product'})
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @IsPositive()
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly brandId: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  readonly categoriesId: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {

  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsPositive()
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice: number;
}
