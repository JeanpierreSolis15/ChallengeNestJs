import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), LoggerModule],
  providers: [CategoriesService],
  controllers: [CategoriesController],
  exports: [TypeOrmModule],
})
export class CategoriesModule {}
