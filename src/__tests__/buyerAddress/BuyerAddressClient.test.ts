/* 
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/

import { BuyerAddressClient } from '../../buyerAddress/BuyerAddressClient';

test('has needed methods', () => {
  expect(BuyerAddressClient).toHaveProperty('getBuyerAddress');
  expect(BuyerAddressClient).toHaveProperty('getBuyerAddressForLocale');
  expect(BuyerAddressClient).toHaveProperty('getBuyerAddressForRegion');
});
