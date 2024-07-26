import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
import { Sizes } from '../entities/product.entity';

export class CreateProductDto {
  @ApiProperty({ description: 'El UUID del producto' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  code: string;

  @ApiProperty({ description: 'El nombre del producto' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'El UUID de la categoría a la que pertenece el producto.',
  })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ description: 'El precio del producto' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ enum: Sizes, description: 'El tamaño del producto' })
  @IsEnum(Sizes)
  @IsNotEmpty()
  size: Sizes;
}
