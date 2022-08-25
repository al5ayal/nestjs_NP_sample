import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entites/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findById(id: number) {
    return await this.productRepository.findOne({
      where: { id: id },
    });
  }

  async createProduct(productData): Promise<any> {
    const product = new Product();
    const newProduct = { ...product, ...productData };
    return this.productRepository.save(newProduct);
  }

  async updateProduct(product): Promise<any> {
    return await this.productRepository.update(product.id, product);
  }

  async deleteProduct(id): Promise<any> {
    return await this.productRepository.delete(id);
  }

  async getAll() {
    return await this.productRepository.find({ order: { id: 'DESC' } });
  }
}
