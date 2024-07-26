import { DataSource } from 'typeorm';
import { Category } from './src/categories/category.entity';
import { Product } from './src/products/product.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'mysql-testingjp15.alwaysdata.net',
  port: 3306,
  username: '353532_test',
  password: '_*!!!353532_test',
  database: 'testingjp15_zafirotest',
  entities: [Category, Product],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
