import { BillingAgreementAttributesBuilder } from '../../../checkout/setup/BillingAgreementAttributesBuilder';
import { BillingAgreementType } from '../../../model/BillingAgreementType';
import { Currency } from '../../../model/Currency';

test('no input, empty object out', () => {
  let result = new BillingAgreementAttributesBuilder('2').build();

  expect(result).toEqual({});
});

test('no SellerAttributes', () => {
  let result = new BillingAgreementAttributesBuilder('2')
    .setSellerNote('my note')
    .withPlatformId('ABCDE')
    .build();

  expect(result).toEqual({
    '@type': 'BillingAgreementAttributes',
    '@version': '2',
    sellerNote: 'my note',
    platformId: 'ABCDE',
  });

  expect(result.sellerNote).toBe('my note');
  expect(result.platformId).toBe('ABCDE');
});

test('only SellerAttributes', () => {
  let result = new BillingAgreementAttributesBuilder('2')
    .setSellerBillingAgreementId('12345')
    .withStoreName('my store')
    .withCustomInformation('so custom')
    .build();
  expect(result).toEqual({
    '@type': 'BillingAgreementAttributes',
    '@version': '2',
    sellerBillingAgreementAttributes: {
      '@type': 'SellerBillingAgreementAttributes',
      '@version': '2',
      storeName: 'my store',
      sellerBillingAgreementId: '12345',
      customInformation: 'so custom',
    },
  });

  let sellerAttributes = result.sellerBillingAgreementAttributes;
  if (sellerAttributes) {
    expect(sellerAttributes).toBeDefined();
    expect(sellerAttributes.customInformation).toBe('so custom');
    expect(sellerAttributes.sellerBillingAgreementId).toBe('12345');
    expect(sellerAttributes.storeName).toBe('my store');
  }
});

test('full version', () => {
  let result = new BillingAgreementAttributesBuilder('2')
    .withCustomInformation('so custom')
    .withPlatformId('ABCDE')
    .withSellerBillingAgreementId('12345')
    .withBillingAgreementType(BillingAgreementType.MIT)
    .withSellerNote('my note')
    .withStoreName('my store')
    .build();
  expect(result).toEqual({
    '@type': 'BillingAgreementAttributes',
    '@version': '2',
    sellerNote: 'my note',
    platformId: 'ABCDE',
    billingAgreementType: 'MerchantInitiatedTransaction',
    sellerBillingAgreementAttributes: {
      '@type': 'SellerBillingAgreementAttributes',
      '@version': '2',
      storeName: 'my store',
      sellerBillingAgreementId: '12345',
      customInformation: 'so custom',
    },
  });

  expect(result.sellerNote).toBe('my note');
  expect(result.platformId).toBe('ABCDE');

  // TODO: add this in, once the interface on the ASK SDK was updated
  // expect(result.billingAgreementType).toBe(BillingAgreementType.MIT);

  let sellerAttributes = result.sellerBillingAgreementAttributes;
  if (sellerAttributes) {
    expect(sellerAttributes).toBeDefined();
    expect(sellerAttributes.customInformation).toBe('so custom');
    expect(sellerAttributes.sellerBillingAgreementId).toBe('12345');
    expect(sellerAttributes.storeName).toBe('my store');
  }
});

test('check BillingAgreementType is not set by default', () => {
  let result = new BillingAgreementAttributesBuilder('2')
    .setSellerNote('my note')
    .withPlatformId('ABCDE')
    .build();

  expect(result).toEqual({
    '@type': 'BillingAgreementAttributes',
    '@version': '2',
    sellerNote: 'my note',
    platformId: 'ABCDE',
  });

  expect(result.sellerNote).toBe('my note');
  expect(result.platformId).toBe('ABCDE');

  // TODO: add this in, once the interface on the ASK SDK was updated
  //expect(result.billingAgreementType).toBeUndefined();
});

test('check BillingAgreementType is set to CIT, hen CIT is given', () => {
  let result = new BillingAgreementAttributesBuilder('2')
    .setSellerNote('my note')
    .withPlatformId('ABCDE')
    .withBillingAgreementType(BillingAgreementType.CIT)
    .build();

  expect(result).toEqual({
    '@type': 'BillingAgreementAttributes',
    '@version': '2',
    billingAgreementType: 'CustomerInitiatedTransaction',
    sellerNote: 'my note',
    platformId: 'ABCDE',
  });

  expect(result.sellerNote).toBe('my note');
  expect(result.platformId).toBe('ABCDE');

  // TODO: add this in, once the interface on the ASK SDK was updated
  //expect(result.billingAgreementType).toBe(BillingAgreementType.CIT);
});

test('check BillingAgreementType is set to MIT, when MIT is given', () => {
  let result = new BillingAgreementAttributesBuilder('2')
    .setSellerNote('my note')
    .withPlatformId('ABCDE')
    .withBillingAgreementType(BillingAgreementType.MIT)
    .build();

  expect(result).toEqual({
    '@type': 'BillingAgreementAttributes',
    '@version': '2',
    billingAgreementType: 'MerchantInitiatedTransaction',
    sellerNote: 'my note',
    platformId: 'ABCDE',
  });

  expect(result.sellerNote).toBe('my note');
  expect(result.platformId).toBe('ABCDE');

  // TODO: add this in, once the interface on the ASK SDK was updated
  //expect(result.billingAgreementType).toBe(BillingAgreementType.CIT);
});

test('check BillingAgreementType is MIT and subscriptionAmount is set', () => {
  let result = new BillingAgreementAttributesBuilder('2')
    .setSellerNote('my note')
    .withPlatformId('ABCDE')
    .withBillingAgreementType(BillingAgreementType.MIT)
    .withSubscriptionAmount('19.99')
    .withSubscriptionCurrency(Currency.EUR)
    .build();

  expect(result).toEqual({
    '@type': 'BillingAgreementAttributes',
    '@version': '2',
    billingAgreementType: 'MerchantInitiatedTransaction',
    subscriptionAmount: {
      '@type': 'Price',
      '@version': '2',
      amount: '19.99',
      currencyCode: 'EUR',
    },
    sellerNote: 'my note',
    platformId: 'ABCDE',
  });

  expect(result.sellerNote).toBe('my note');
  expect(result.platformId).toBe('ABCDE');

  // TODO: add this in, once the interface on the ASK SDK was updated
  //expect(result.billingAgreementType).toBe(BillingAgreementType.CIT);
  // TODO: also check for amount when added to interface
});

test('check BillingAgreementType is MIT and subscriptionCurrency cannot be set, if subscriptionAmount is missing', () => {
  expect(() => {
    let result = new BillingAgreementAttributesBuilder('2')
      .setSellerNote('my note')
      .withPlatformId('ABCDE')
      .withBillingAgreementType(BillingAgreementType.MIT)
      .withSubscriptionCurrency(Currency.EUR)
      .build();
  }).toThrowError('Both of SubscriptionAmount and SubscriptionCurrency need to be defined or both left empty');
});

test('check BillingAgreementType is MIT and subscriptionAmount cannot be set, if subscriptionCurrency is missing', () => {
  expect(() => {
    let result = new BillingAgreementAttributesBuilder('2')
      .setSellerNote('my note')
      .withPlatformId('ABCDE')
      .withBillingAgreementType(BillingAgreementType.MIT)
      .withSubscriptionAmount('19.99')
      .build();
  }).toThrowError('Both of SubscriptionAmount and SubscriptionCurrency need to be defined or both left empty');
});

test('check BillingAgreementType is CIT and subscriptionAmount cannot be set', () => {
  expect(() => {
    let result = new BillingAgreementAttributesBuilder('2')
      .setSellerNote('my note')
      .withPlatformId('ABCDE')
      .withBillingAgreementType(BillingAgreementType.CIT)
      .withSubscriptionAmount('19.99')
      .build();
  }).toThrowError('SubscriptionAmount and SubscriptionCurrency only defined for MerchantInitiatedTransactions');
});

test('check BillingAgreementType is CIT and subscriptionCurrency cannot be set', () => {
  expect(() => {
    let result = new BillingAgreementAttributesBuilder('2')
      .setSellerNote('my note')
      .withPlatformId('ABCDE')
      .withBillingAgreementType(BillingAgreementType.CIT)
      .withSubscriptionCurrency(Currency.EUR)
      .build();
  }).toThrowError('SubscriptionAmount and SubscriptionCurrency only defined for MerchantInitiatedTransactions');
});
