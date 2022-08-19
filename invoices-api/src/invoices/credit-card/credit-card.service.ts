import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditCard } from '../entities/credit-card.entity';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';

@Injectable()
export class CreditCardService {
  constructor(
    @InjectRepository(CreditCard)
    private creditCardRepo: Repository<CreditCard>,
  ) {}

  create(createCreditCardDto: CreateCreditCardDto) {
    const creditCard = this.creditCardRepo.create(createCreditCardDto);
    return this.creditCardRepo.save(creditCard);
  }

  findAll() {
    return this.creditCardRepo.find();
  }

  findOne(id: string) {
    return this.creditCardRepo.findOneOrFail({ where: { id: id } });
  }

  remove(id: string) {
    return `This action removes a #${id} CreditCard`;
  }
}
