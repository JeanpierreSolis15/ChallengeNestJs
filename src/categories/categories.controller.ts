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
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  @ApiResponse({
    status: 200,
    description: 'Se obtuvo exitosamente todas las categorías',
  })
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por UUID' })
  @ApiResponse({
    status: 200,
    description: 'Se obtuvo exitosamente la categoría',
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  async findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiResponse({
    status: 201,
    description: 'La categoría ha sido creada exitosamente',
  })
  async create(@Body() category: Category) {
    return this.categoriesService.create(category);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar categoría' })
  @ApiResponse({
    status: 200,
    description: 'La categoría se ha actualizado correctamente',
  })
  async update(@Param('id') id: string, @Body() category: Category) {
    return this.categoriesService.update(id, category);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar categoría' })
  @ApiResponse({
    status: 204,
    description: 'La categoría ha sido eliminada exitosamente',
  })
  async remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
