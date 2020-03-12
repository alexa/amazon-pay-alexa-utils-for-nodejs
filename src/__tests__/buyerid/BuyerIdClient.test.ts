/* 
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/

import { BuyerIdClient } from '../../buyerid/BuyerIdClient';

test('has needed methods', () => {
  expect(BuyerIdClient).toHaveProperty('getBuyerId');
  expect(BuyerIdClient).toHaveProperty('getBuyerIdForLocale');
  expect(BuyerIdClient).toHaveProperty('getBuyerIdForRegion');
});
