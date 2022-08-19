import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { EntityNotFoundError } from 'typeorm';

export function ProductExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'ProductExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ProductExistsRule,
    });
  };
}

@ValidatorConstraint({ name: 'Exists', async: true })
@Injectable()
export class ProductExistsRule implements ValidatorConstraintInterface {
  constructor(private productsService: ProductsService) {}

  async validate(value: string) {
    if (!value) {
      return false;
    }

    try {
      const result = await this.productsService.findOne(value);
      if (!result) {
        throw new EntityNotFoundError(Product, value);
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  defaultMessage() {
    return 'Product not found';
  }
}
