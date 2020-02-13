import { ChargeDirectiveBuilder } from '../../../checkout/charge/ChargeDirectiveBuilder';

import { ChargePayloadBuilder } from '../../../checkout/charge/ChargePayloadBuilder';
import { Currency } from '../../../model/Currency';
import { PaymentAction } from '../../../model/PaymentAction';

test('charge directive', () => {
  const payloadBuilder = new ChargePayloadBuilder('2')
    .withSellerId('ABCD1234ADS')
    .withBillingAgreementId('B02-12345-12345')
    .withAmount('50')
    .withCurrency(Currency.EUR)
    .withAuthorizationReferenceId('ref')
    .withPaymentAction(PaymentAction.AUTHORIZE);

  const directive = new ChargeDirectiveBuilder(payloadBuilder, 'token').build();

  expect(directive.type).toBe('Connections.SendRequest');
  expect(directive.name).toBe('Charge');
  expect(directive.payload).toEqual(payloadBuilder.build());
  expect(directive.token).toBe('token');
});
