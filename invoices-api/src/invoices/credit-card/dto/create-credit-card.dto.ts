import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { CreditCardNotExists } from 'src/validators/credit-card-not-exists.rule';

export class CreateCreditCardDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @CreditCardNotExists()
  @MaxLength(16)
  @MinLength(16)
  @IsString()
  @IsNotEmpty()
  number: string;
}
