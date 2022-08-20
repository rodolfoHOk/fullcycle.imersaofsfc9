import { Type } from 'class-transformer';
import {
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreditCardExists } from 'src/validators/credit-card-exists.rule';

export class CreateInvoiceDto {
  @CreditCardExists()
  @IsString()
  @IsNotEmpty()
  credit_card_number: string;

  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsISO8601()
  @IsNotEmpty()
  payment_date: Date;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  store: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class KafkaCreateInvoiceDto {
  @Type(() => CreateInvoiceDto)
  @ValidateNested()
  @IsObject()
  @IsNotEmpty()
  value: CreateInvoiceDto;
}
