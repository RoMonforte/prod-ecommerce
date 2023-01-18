import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
