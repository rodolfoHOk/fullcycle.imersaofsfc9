import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { CreditCardService } from './credit-card/credit-card.service';
import { CreditCardController } from './credit-card/credit-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { CreditCard } from './entities/credit-card.entity';
import { CreditCardExistsRule } from 'src/validators/credit-card-exists.rule';
import { CreditCardNotExistsRule } from 'src/validators/credit-card-not-exists.rule';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, CreditCard])],
  controllers: [InvoicesController, CreditCardController],
  providers: [InvoicesService, CreditCardService, CreditCardExistsRule, CreditCardNotExistsRule],
})
export class InvoicesModule {}
