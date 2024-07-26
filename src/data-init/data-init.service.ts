import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DataInitService implements OnModuleInit {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async onModuleInit() {
    const categories = await this.categoriesRepository.find();
    if (categories.length === 0) {
      const defaultCategories = [
        {
          id: uuidv4(),
          name: 'Electrónica',
          description: 'Aparatos y circuitos electrónicos',
          active: true,
        },
        {
          id: uuidv4(),
          name: 'Ropa',
          description: 'Prendas de vestir',
          active: true,
        },
        {
          id: uuidv4(),
          name: 'Libros',
          description: 'Libros y revistas',
          active: true,
        },
      ];
      await this.categoriesRepository.save(defaultCategories);
    }
  }
}
