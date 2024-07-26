import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { LoggerModule } from 'src/logger/logger.module';
import { CategoriesModule } from 'src/categories/categories.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    LoggerModule,
    CategoriesModule,
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
