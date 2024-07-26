import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product, Sizes } from './entities/product.entity';
import { LoggerService } from '../logger/logger.service';
import { Category } from '../categories/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    private readonly loggerService: LoggerService,
  ) {}

  async findAll(): Promise<Product[]> {
    this.loggerService.log('Obteniendo todos los productos');
    return this.productsRepository.find({ relations: ['category'] });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      this.loggerService.warn(`Producto con UUID ${id} no encontrado`);
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }
    this.loggerService.log(`Obteniendo producto con UUID: ${id}`);
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, ...rest } = createProductDto;
    const category = await this.categoriesRepository.findOneBy({
      id: categoryId,
    });
    if (!category) {
      this.loggerService.error(`Categoría con id ${categoryId} no encontrada`);
      throw new HttpException('Categoría no encontrada', HttpStatus.NOT_FOUND);
    }
    const product = this.productsRepository.create({
      id: uuidv4(),
      ...rest,
      category,
    });
    this.loggerService.log('Creando un nuevo producto');
    return this.productsRepository.save(product);
  }

  async update(id: string, product: Product): Promise<Product> {
    if (!(product.size in Sizes)) {
      this.loggerService.error('El tamaño proporcionado no es válido');
      throw new HttpException('Tamaño no válido', HttpStatus.BAD_REQUEST);
    }
    const existingProduct = await this.findOne(id);
    if (!existingProduct) {
      this.loggerService.warn(`Producto con uuid ${id} no encontrado`);
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }
    this.loggerService.log(`Actualizando producto con uuid: ${id}`);
    await this.productsRepository.update(id, product);
    return this.productsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    const existingProduct = await this.findOne(id);
    if (!existingProduct) {
      this.loggerService.warn(`Producto con uuid ${id} no encontrado`);
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }
    this.loggerService.log(`Eliminar producto con uuid: ${id}`);
    await this.productsRepository.delete(id);
  }

  async findProductsByActiveCategories(): Promise<Product[]> {
    const products = await this.productsRepository.find({
      relations: ['category'],
      where: {
        category: {
          active: true,
        },
      },
    });
    if (products.length === 0) {
      throw new HttpException('No se encontraron datos', HttpStatus.NOT_FOUND);
    }
    return products;
  }

  async findProductsBySize(): Promise<Product[]> {
    const products = await this.productsRepository
      .createQueryBuilder('product')
      .where('product.size IN (:...sizes)', {
        sizes: [Sizes.MEDIUM, Sizes.LARGE],
      })
      .getMany();
    if (products.length === 0) {
      throw new HttpException('No se encontraron datos', HttpStatus.NOT_FOUND);
    }
    return products;
  }
}
