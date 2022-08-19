import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
// import { CreditCard } from 'src/invoices/entities/credit-card.entity';
// import { NotExists } from 'src/validators/not-exists.rule';

export class CreateCreditCardDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  // @NotExists(CreditCard, 'number')
  @MaxLength(16)
  @MinLength(16)
  @IsString()
  @IsNotEmpty()
  number: string;
}
