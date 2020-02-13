import { ChargePayloadBuilder } from '../../../checkout/charge/ChargePayloadBuilder';
import { Currency } from '../../../model/Currency';
import { PaymentAction } from '../../../model/PaymentAction';

test('charge payload full', () => {
  const payload = new ChargePayloadBuilder(/* version */ '2')
    .withSellerId('ABCD1234ADS')
    .withBillingAgreementId('B02-12345-12345')
    .withPaymentAction(PaymentAction.AUTHORIZEANDCAPTURE)
    .withAuthorizationReferenceId('ref')
    .withAmount('50')
    .withCurrency(Currency.EUR)
    .withTransactionTimeout('0')
    .withSellerAuthorizationNote('my auth note')
    .withSoftDescriptor('my store - Alexa skill')
    .withSellerOrderId('12345')
    .withStoreName('my store')
    .withCustomInformation('so custom')
    .withSellerNote('my note')
    .build();

  expect(payload.sellerId).toBe('ABCD1234ADS');
  expect(payload.billingAgreementId).toBe('B02-12345-12345');
  expect(payload.paymentAction).toBe(PaymentAction.AUTHORIZEANDCAPTURE);
  expect(payload.authorizeAttributes.authorizationReferenceId).toBe('ref');
  expect(payload.authorizeAttributes.authorizationAmount.amount).toBe('50');
  expect(payload.authorizeAttributes.authorizationAmount.currencyCode).toBe(Currency.EUR);
  expect(payload.authorizeAttributes.transactionTimeout).toBe('0');
  expect(payload.authorizeAttributes.sellerAuthorizationNote).toBe('my auth note');
  expect(payload.authorizeAttributes.softDescriptor).toBe('my store - Alexa skill');
  expect(payload.sellerOrderAttributes).toBeDefined();
  if (payload.sellerOrderAttributes) {
    expect(payload.sellerOrderAttributes.sellerOrderId).toBe('12345');
    expect(payload.sellerOrderAttributes.storeName).toBe('my store');
    expect(payload.sellerOrderAttributes.customInformation).toBe('so custom');
    expect(payload.sellerOrderAttributes.sellerNote).toBe('my note');
  }
  expect(payload).toEqual({
    '@type': 'ChargeAmazonPayRequest',
    '@version': '2',
    billingAgreementId: 'B02-12345-12345',
    paymentAction: 'AUTHORIZEANDCAPTURE',
    sellerId: 'ABCD1234ADS',
    authorizeAttributes: {
      '@type': 'AuthorizeAttributes',
      '@version': '2',
      authorizationReferenceId: 'ref',
      authorizationAmount: {
        '@type': 'Price',
        '@version': '2',
        amount: '50',
        currencyCode: 'EUR',
      },
      sellerAuthorizationNote: 'my auth note',
      softDescriptor: 'my store - Alexa skill',
      transactionTimeout: '0',
    },
    sellerOrderAttributes: {
      '@type': 'SellerOrderAttributes',
      '@version': '2',
      customInformation: 'so custom',
      sellerNote: 'my note',
      sellerOrderId: '12345',
      storeName: 'my store',
    },
  });
});

test('charge payload minimal', () => {
  const payload = new ChargePayloadBuilder(/* version */ '2')
    .withSellerId('ABCD1234ADS')
    .withBillingAgreementId('B02-12345-12345')
    .withPaymentAction(PaymentAction.AUTHORIZEANDCAPTURE)
    .withAuthorizationReferenceId('ref')
    .withAmount('50')
    .withCurrency(Currency.EUR)
    .build();

  expect(payload.sellerId).toBe('ABCD1234ADS');
  expect(payload.billingAgreementId).toBe('B02-12345-12345');
  expect(payload.paymentAction).toBe(PaymentAction.AUTHORIZEANDCAPTURE);
  expect(payload.authorizeAttributes.authorizationReferenceId).toBe('ref');
  expect(payload.authorizeAttributes.authorizationAmount.amount).toBe('50');
  expect(payload.authorizeAttributes.authorizationAmount.currencyCode).toBe(Currency.EUR);

  expect(payload).toEqual({
    '@type': 'ChargeAmazonPayRequest',
    '@version': '2',
    billingAgreementId: 'B02-12345-12345',
    paymentAction: 'AUTHORIZEANDCAPTURE',
    sellerId: 'ABCD1234ADS',
    authorizeAttributes: {
      '@type': 'AuthorizeAttributes',
      '@version': '2',
      authorizationReferenceId: 'ref',
      authorizationAmount: {
        '@type': 'Price',
        '@version': '2',
        amount: '50',
        currencyCode: 'EUR',
      },
    },
  });
});

test('charge payload minimal + sellerOrderAtrribute', () => {
  const payload = new ChargePayloadBuilder(/* version */ '2')
    .withSellerId('ABCD1234ADS')
    .withBillingAgreementId('B02-12345-12345')
    .withPaymentAction(PaymentAction.AUTHORIZEANDCAPTURE)
    .withAuthorizationReferenceId('ref')
    .withAmount('50')
    .withCurrency(Currency.EUR)
    .withStoreName('my store')
    .build();

  expect(payload.sellerId).toBe('ABCD1234ADS');
  expect(payload.billingAgreementId).toBe('B02-12345-12345');
  expect(payload.paymentAction).toBe(PaymentAction.AUTHORIZEANDCAPTURE);
  expect(payload.authorizeAttributes.authorizationReferenceId).toBe('ref');
  expect(payload.authorizeAttributes.authorizationAmount.amount).toBe('50');
  expect(payload.authorizeAttributes.authorizationAmount.currencyCode).toBe(Currency.EUR);
  expect(payload.sellerOrderAttributes).toBeDefined();
  if (payload.sellerOrderAttributes) {
    expect(payload.sellerOrderAttributes.storeName).toBe('my store');
  }

  expect(payload).toEqual({
    '@type': 'ChargeAmazonPayRequest',
    '@version': '2',
    billingAgreementId: 'B02-12345-12345',
    paymentAction: 'AUTHORIZEANDCAPTURE',
    sellerId: 'ABCD1234ADS',
    authorizeAttributes: {
      '@type': 'AuthorizeAttributes',
      '@version': '2',
      authorizationReferenceId: 'ref',
      authorizationAmount: {
        '@type': 'Price',
        '@version': '2',
        amount: '50',
        currencyCode: 'EUR',
      },
    },
    sellerOrderAttributes: {
      '@type': 'SellerOrderAttributes',
      '@version': '2',
      storeName: 'my store',
    },
  });
});
