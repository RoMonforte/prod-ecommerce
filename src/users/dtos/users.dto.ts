import { IsString, IsNotEmpty, IsPositive, IsNumber, IsOptional } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
