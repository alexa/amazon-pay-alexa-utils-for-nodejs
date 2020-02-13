import { BuyerAddressClient } from '../../buyerAddress/BuyerAddressClient';

test('has needed methods', () => {
  expect(BuyerAddressClient).toHaveProperty('getBuyerAddress');
  expect(BuyerAddressClient).toHaveProperty('getBuyerAddressForLocale');
  expect(BuyerAddressClient).toHaveProperty('getBuyerAddressForRegion');
});
