import { AuthorizeAttributesBuilder } from '../../../checkout/charge/AuthorizeAttributesBuilder';
import { Currency } from '../../../model/Currency';

test('required attributes', () => {
  const attributes = new AuthorizeAttributesBuilder('2')
    .withAuthorizationReferenceId('ref')
    .withAmount('50')
    .withCurrency(Currency.EUR)
    .build();
  expect(attributes.authorizationReferenceId).toBe('ref');
  expect(attributes.authorizationAmount.amount).toBe('50');
  expect(attributes.authorizationAmount.currencyCode).toBe(Currency.EUR);

  expect(attributes.sellerAuthorizationNote).not.toBeDefined();
  expect(attributes.softDescriptor).not.toBeDefined();
  expect(attributes.transactionTimeout).not.toBeDefined();
});

test('all attributes', () => {
  const attributes = new AuthorizeAttributesBuilder('2')
    .withAuthorizationReferenceId('ref')
    .withAmount('50')
    .withCurrency(Currency.EUR)
    .withSellerAuthorizationNote('auth note')
    .withSoftDescriptor('soft')
    .withTransactionTimeout('0')
    .build();
  expect(attributes.authorizationReferenceId).toBe('ref');
  expect(attributes.authorizationAmount.amount).toBe('50');
  expect(attributes.authorizationAmount.currencyCode).toBe(Currency.EUR);

  expect(attributes.sellerAuthorizationNote).toBe('auth note');
  expect(attributes.softDescriptor).toBe('soft');
  expect(attributes.transactionTimeout).toBe('0');
});
