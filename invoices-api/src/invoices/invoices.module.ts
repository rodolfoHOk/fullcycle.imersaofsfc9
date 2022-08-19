import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { CreditCardService } from './credit-card/credit-card.service';
import { CreditCardController } from './credit-card/credit-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { CreditCard } from './entities/credit-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, CreditCard])],
  // Para publicar no Kafka
  // ClientsModule.registerAsync([
  //   {
  //     name: 'KAFKA_SERVICE',
  //     useFactory: () => ({
  //       transport: Transport.KAFKA,
  //       options: {
  //         client: {
  //           clientId: process.env.KAFKA_CLIENT_ID,
  //           brokers: [process.env.KAFKA_HOST],
  //         },
  //         consumer: {
  //           groupId: process.env.KAFKA_CONSUMER_GROUP_ID,
  //         },
  //       },
  //     }),
  //   },
  // ]),
  // ],
  controllers: [InvoicesController, CreditCardController],
  providers: [InvoicesService, CreditCardService],
})
export class InvoicesModule {}
