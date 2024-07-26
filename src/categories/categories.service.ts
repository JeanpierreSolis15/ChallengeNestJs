import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { LoggerService } from '../logger/logger.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    private readonly loggerService: LoggerService,
  ) {}

  findAll(): Promise<Category[]> {
    this.loggerService.log('Obteniendo todas las categorías');
    return this.categoriesRepository.find();
  }

  findOne(id: string): Promise<Category> {
    return this.categoriesRepository.findOneBy({ id });
  }

  create(category: Category): Promise<Category> {
    category.id = uuidv4();
    this.loggerService.log('Creando una nueva categoría');
    return this.categoriesRepository.save(category);
  }

  async update(id: string, category: Category): Promise<Category> {
    await this.categoriesRepository.update(id, category);
    return this.categoriesRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}
