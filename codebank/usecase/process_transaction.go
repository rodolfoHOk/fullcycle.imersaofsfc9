package usecase

import (
	"encoding/json"
	"os"
	"time"

	"github.com/rodolfoHOk/fullcycle.imersaofsfc9/codebank/domain"
	"github.com/rodolfoHOk/fullcycle.imersaofsfc9/codebank/dto"
	"github.com/rodolfoHOk/fullcycle.imersaofsfc9/codebank/infrastructure/kafka"
)

type UseCaseTransaction struct {
	TransactionRepository domain.TransactionRepository
	KafkaProducer kafka.KafkaProducer
}

func NewUseCaseTransaction(transactionRepository domain.TransactionRepository) UseCaseTransaction {
	return UseCaseTransaction{TransactionRepository: transactionRepository}
}

func (u UseCaseTransaction) ProcessTransaction(transactionDTO dto.Transaction) (domain.Transaction, error) {
	creditCard := u.hydrateCreditCard(transactionDTO)
	ccBalanceAndLimit, err := u.TransactionRepository.GetCreditCard(*creditCard)
	if err != nil {
		return domain.Transaction{}, err
	}
	creditCard.ID = ccBalanceAndLimit.ID
	creditCard.Limit = ccBalanceAndLimit.Limit
	creditCard.Balance = ccBalanceAndLimit.Balance

	t := u.newTransaction(transactionDTO, ccBalanceAndLimit)
	t.ProcessAndValidate(creditCard)
	err = u.TransactionRepository.SaveTransaction(*t, *creditCard);
	if err != nil {
		return domain.Transaction{}, err
	}

	transactionDTO.ID = t.ID
	transactionDTO.CreatedAt = t.CreatedAt
	transactionJson, err := json.Marshal(transactionDTO)
	if err != nil {
		return domain.Transaction{}, err
	}
	err = u.KafkaProducer.Publish(string(transactionJson), os.Getenv("KafkaTransactionsTopic"))
	if err != nil {
		return domain.Transaction{}, err
	}

	return *t, nil;
 }

func (UseCaseTransaction) hydrateCreditCard(transactionDTO dto.Transaction) *domain.CreditCard {
	creditCard := domain.NewCreditCard()
	creditCard.Name = transactionDTO.Name
	creditCard.Number = transactionDTO.Number
	creditCard.ExpirationMonth = transactionDTO.ExpirationMonth
	creditCard.ExpirationYear = transactionDTO.ExpirationYear
	creditCard.CVV = transactionDTO.CVV
	return creditCard
}

func (UseCaseTransaction) newTransaction(transactionDTO dto.Transaction, cc domain.CreditCard) *domain.Transaction {
	t := domain.NewTransaction()
	t.CreditCardId = cc.ID
	t.Amount = transactionDTO.Amount
	t.Store = transactionDTO.Store
	t.Description = transactionDTO.Description
	t.CreatedAt = time.Now()
	return t
}
