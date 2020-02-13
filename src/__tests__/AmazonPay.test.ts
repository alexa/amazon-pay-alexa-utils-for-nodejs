import * as AmazonPay from '../AmazonPay';
import { Currency } from '../model/Currency';
import { SandboxSetting } from '../model/SandboxSetting';
import { PaymentAction } from '../model/PaymentAction';
import { BillingAgreementType } from '../model/BillingAgreementType';

test('setupPayload full', () => {
  const payload = AmazonPay.setupPayload(/*version*/ '2')
    .withSellerId('ABCD1234ADS')
    .withCountryOfEstablishment('DE')
    .withLedgerCurrency(Currency.EUR)
    .withCheckoutLanguage('en_GB')
    .withCustomInformation('so custom')
    .withPlatformId('ABCDE')
    .withBillingAgreementType(BillingAgreementType.CIT)
    .withSellerBillingAgreementId('12345')
    .withSellerNote('my note')
    .withStoreName('my store')
    .shippingNeeded(true)
    .onSandbox(new SandboxSetting('mysandbox@email.test'))
    .build();

  expect(payload).toEqual({
    '@type': 'SetupAmazonPayRequest',
    '@version': '2',
    countryOfEstablishment: 'DE',
    ledgerCurrency: 'EUR',
    needAmazonShippingAddress: true,
    sellerId: 'ABCD1234ADS',
    sandboxCustomerEmailId: 'mysandbox@email.test',
    sandboxMode: true,
    checkoutLanguage: 'en_GB',
    billingAgreementAttributes: {
      '@type': 'BillingAgreementAttributes',
      '@version': '2',
      billingAgreementType: 'CustomerInitiatedTransaction',
      sellerNote: 'my note',
      platformId: 'ABCDE',
      sellerBillingAgreementAttributes: {
        '@type': 'SellerBillingAgreementAttributes',
        '@version': '2',
        storeName: 'my store',
        customInformation: 'so custom',
        sellerBillingAgreementId: '12345',
      },
    },
  });
  expect(payload['@type']).toBe('SetupAmazonPayRequest');
  expect(payload['@version']).toBe('2');
  expect(payload.checkoutLanguage).toBe('en_GB');
  expect(payload.sellerId).toBe('ABCD1234ADS');
  expect(payload.countryOfEstablishment).toBe('DE');
  expect(payload.ledgerCurrency).toBe(Currency.EUR);
  expect(payload.needAmazonShippingAddress).toBe(true);
  expect(payload.sandboxMode).toBe(true);
  expect(payload.sandboxCustomerEmailId).toBe('mysandbox@email.test');

  expect(payload.billingAgreementAttributes).toBeDefined();
  const billingAgreementAttributes = payload.billingAgreementAttributes;
  if (billingAgreementAttributes) {
    expect(billingAgreementAttributes.platformId).toBe('ABCDE');
    expect(billingAgreementAttributes.sellerNote).toBe('my note');
    expect(billingAgreementAttributes.sellerBillingAgreementAttributes).toBeDefined();
    const sellerAttributes = billingAgreementAttributes.sellerBillingAgreementAttributes;
    if (sellerAttributes) {
      expect(sellerAttributes.customInformation).toBe('so custom');
      expect(sellerAttributes.sellerBillingAgreementId).toBe('12345');
      expect(sellerAttributes.storeName).toBe('my store');
    }
  }
});

test('setupPayload minimal', () => {
  const payload = AmazonPay.setupPayload(/*version*/ '2')
    .withSellerId('ABCD1234ADS')
    .withCountryOfEstablishment('DE')
    .withLedgerCurrency(Currency.EUR)
    .build();

  expect(payload['@type']).toBe('SetupAmazonPayRequest');
  expect(payload['@version']).toBe('2');
  expect(payload.checkoutLanguage).toBeUndefined();
  expect(payload.sellerId).toBe('ABCD1234ADS');
  expect(payload.countryOfEstablishment).toBe('DE');
  expect(payload.ledgerCurrency).toBe(Currency.EUR);
  expect(payload.needAmazonShippingAddress).toBe(false);
  expect(payload.sandboxMode).toBeUndefined();
  expect(payload.sandboxCustomerEmailId).toBeUndefined();
});

test('charge payload full', () => {
  const payload = AmazonPay.chargePayload(/* version */ '2')
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
  const payload = AmazonPay.chargePayload(/* version */ '2')
    .withSellerId('ABCD1234ADS')
    .withBillingAgreementId('B02-12345-12345')
    .withPaymentAction(PaymentAction.AUTHORIZEANDCAPTURE)
    .withAuthorizationReferenceId('ref')
    .withAmount('50')
    .withCurrency(Currency.EUR)
    .build();

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
  const payload = AmazonPay.chargePayload(/* version */ '2')
    .withSellerId('ABCD1234ADS')
    .withBillingAgreementId('B02-12345-12345')
    .withPaymentAction(PaymentAction.AUTHORIZEANDCAPTURE)
    .withAuthorizationReferenceId('ref')
    .withAmount('50')
    .withCurrency(Currency.EUR)
    .withStoreName('my store')
    .build();

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

test('setup directive', () => {
  const payloadBuilder = AmazonPay.setupPayload('2')
    .withSellerId('ABCD1234ADS')
    .withCountryOfEstablishment('DE')
    .withLedgerCurrency(Currency.EUR);

  const directive = AmazonPay.setupDirective(payloadBuilder, 'token').build();

  expect(directive.type).toBe('Connections.SendRequest');
  expect(directive.name).toBe('Setup');
  expect(directive.payload).toEqual(payloadBuilder.build());
  expect(directive.token).toBe('token');
});

test('charge directive', () => {
  const payloadBuilder = AmazonPay.chargePayload('2')
    .withSellerId('ABCD1234ADS')
    .withBillingAgreementId('B02-12345-12345')
    .withAmount('50')
    .withCurrency(Currency.EUR)
    .withAuthorizationReferenceId('ref')
    .withPaymentAction(PaymentAction.AUTHORIZE);

  const directive = AmazonPay.chargeDirective(payloadBuilder, 'token').build();

  expect(directive.type).toBe('Connections.SendRequest');
  expect(directive.name).toBe('Charge');
  expect(directive.payload).toEqual(payloadBuilder.build());
  expect(directive.token).toBe('token');
});
