import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/entities/category.entity';
import { Product } from './products/entities/product.entity';
import { DataInitService } from './data-init/data-init.service';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-testingjp15.alwaysdata.net',
      port: 3306,
      username: '353532_test',
      password: '_*!!!353532_test',
      database: 'testingjp15_zafirotest',
      entities: [Category, Product],
      synchronize: false,
    }),
    CategoriesModule,
    ProductsModule,
    LoggerModule,
  ],
  providers: [DataInitService],
})
export class AppModule {}