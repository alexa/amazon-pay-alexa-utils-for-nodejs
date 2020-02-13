import { Utilities } from '../../utilities/Utilities';
import { Environment } from '../../model/Environment';

test('resolves path per environment', () => {
  expect(Utilities.getBasePath(Environment.LIVE)).toBe('/live/v1/buyer/');
  expect(Utilities.getBasePath(Environment.SANDBOX)).toBe('/sandbox/v1/buyer/');
});

test('has needed methods', () => {
  expect(Utilities).toHaveProperty('regionEndpointMapping');
  expect(Utilities).toHaveProperty('regionLocaleMapping');
  expect(Utilities).toHaveProperty('getBasePath');
});
