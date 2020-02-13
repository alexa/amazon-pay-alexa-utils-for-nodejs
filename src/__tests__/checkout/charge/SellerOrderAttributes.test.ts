import { SellerOrderAttributesBuilder } from '../../../checkout/charge/SellerOrderAttributesBuilder';

test('one attr', () => {
  const attr = new SellerOrderAttributesBuilder('2').withStoreName('my store').build();
  expect(attr.storeName).toBe('my store');
  expect(attr.customInformation).not.toBeDefined();
  expect(attr.sellerNote).not.toBeDefined();
  expect(attr.sellerOrderId).not.toBeDefined();
});

test('all attrs', () => {
  const attr = new SellerOrderAttributesBuilder('2')
    .withStoreName('my store')
    .withSellerNote('my note')
    .withSellerOrderId('12345')
    .withCustomInformation('so custom')
    .build();
  expect(attr.storeName).toBe('my store');
  expect(attr.customInformation).toBe('so custom');
  expect(attr.sellerNote).toBe('my note');
  expect(attr.sellerOrderId).toBe('12345');
});
