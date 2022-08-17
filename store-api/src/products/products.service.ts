import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, FindOneOptions, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { validate as validateUuid } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create(createProductDto);
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find();
  }

  async findOne(idOrSlug: string) {
    const where: FindOneOptions<Product> = validateUuid(idOrSlug)
      ? { where: { id: idOrSlug } }
      : { where: { slug: idOrSlug } };
    const product = await this.productRepo.findOne(where);
    if (!product) {
      throw new EntityNotFoundError(Product, idOrSlug);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updateResult = await this.productRepo.update(id, updateProductDto);
    if (!updateResult.affected) {
      throw new EntityNotFoundError(Product, id);
    }
    return this.productRepo.findOne({ where: { id: id } });
  }

  async remove(id: string) {
    const deleteResult = await this.productRepo.delete(id);
    if (!deleteResult.affected) {
      throw new EntityNotFoundError(Product, id);
    }
  }
}
