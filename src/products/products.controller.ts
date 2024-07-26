import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({
    status: 200,
    description: 'Se obtuvo exitosamente todos los productos',
  })
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener producto por UUID' })
  @ApiResponse({
    status: 200,
    description: 'Se obtuvo exitosamente el producto',
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({
    status: 201,
    description: 'El producto ha sido creado exitosamente',
  })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar producto' })
  @ApiResponse({
    status: 200,
    description: 'El producto se ha actualizado correctamente.',
  })
  async update(@Param('id') id: string, @Body() product: Product) {
    return this.productsService.update(id, product);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({
    status: 204,
    description: 'El producto ha sido eliminado exitosamente',
  })
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Get('active-categories')
  @ApiOperation({ summary: 'Recuperar productos por categorías activas' })
  @ApiResponse({
    status: 200,
    description: 'Se obtuvo exitosamente los productos por categoría activa',
  })
  async findProductsByActiveCategories() {
    return this.productsService.findProductsByActiveCategories();
  }

  @Get('sizes')
  @ApiOperation({ summary: 'Obtener productos por talla' })
  @ApiResponse({
    status: 200,
    description: 'Se obtuvo exitosamente los productos por tamaño',
  })
  async findProductsBySize() {
    return this.productsService.findProductsBySize();
  }
}
