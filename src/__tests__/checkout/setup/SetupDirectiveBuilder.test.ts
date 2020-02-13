import { SetupPayloadBuilder } from '../../../checkout/setup/SetupPayloadBuilder';
import { Currency } from '../../../model/Currency';
import { SetupDirectiveBuilder } from '../../../checkout/setup/SetupDirectiveBuilder';

test('setup directive', () => {
  const payloadBuilder = new SetupPayloadBuilder('2')
    .withSellerId('ABCD1234ADS')
    .withCountryOfEstablishment('DE')
    .withLedgerCurrency(Currency.EUR);

  const directive = new SetupDirectiveBuilder(payloadBuilder, 'token').build();

  expect(directive.type).toBe('Connections.SendRequest');
  expect(directive.name).toBe('Setup');
  expect(directive.payload).toEqual(payloadBuilder.build());
  expect(directive.token).toBe('token');
});
