import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreditCard } from '../invoices/entities/credit-card.entity';
import { CreditCardService } from '../invoices/credit-card/credit-card.service';
import { EntityNotFoundError } from 'typeorm';

export function CreditCardExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'CreditCardExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CreditCardExistsRule,
    });
  };
}

@ValidatorConstraint({ name: 'Exists', async: true })
@Injectable()
export class CreditCardExistsRule implements ValidatorConstraintInterface {
  constructor(private creditCardService: CreditCardService) {}

  async validate(value: string) {
    if (!value) {
      return false;
    }

    try {
      const result = await this.creditCardService.findOneByNumber(value);
      if (!result) {
        throw new EntityNotFoundError(CreditCard, value);
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  defaultMessage() {
    return 'CreditCard not found';
  }
}
