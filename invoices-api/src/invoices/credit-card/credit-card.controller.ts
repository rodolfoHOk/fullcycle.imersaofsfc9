import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreditCardService } from './credit-card.service';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';

@Controller('credit-cards')
export class CreditCardController {
  constructor(private readonly creditCardService: CreditCardService) {}

  @Post()
  create(@Body() createCreditCardDto: CreateCreditCardDto) {
    return this.creditCardService.create(createCreditCardDto);
  }

  @Get()
  findAll() {
    return this.creditCardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creditCardService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creditCardService.remove(id);
  }
}
