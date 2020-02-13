import { BuyerIdClient } from '../../buyerid/BuyerIdClient';

test('has needed methods', () => {
  expect(BuyerIdClient).toHaveProperty('getBuyerId');
  expect(BuyerIdClient).toHaveProperty('getBuyerIdForLocale');
  expect(BuyerIdClient).toHaveProperty('getBuyerIdForRegion');
});
