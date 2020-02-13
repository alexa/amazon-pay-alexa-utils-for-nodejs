import { Environment } from '../model/Environment';
import { Region } from '../model/Region';

export class Utilities {
  public static alexaAPiEndpointToPayEndpointMapping = new Map([
    ['https://api.amazonalexa.com', 'pay-api.amazon.com'],
    ['https://api.eu.amazonalexa.com', 'pay-api.amazon.eu'],
    ['https://api.fe.amazonalexa.com', 'pay-api.amazon.jp'],
  ]);

  public static alexaAPiEndpointToRegionMapping = new Map([
    ['https://api.amazonalexa.com', Region.NA],
    ['https://api.eu.amazonalexa.com', Region.EU],
    ['https://api.fe.amazonalexa.com', Region.FE],
  ]);

  public static regionEndpointMapping = new Map([
    [Region.EU, 'pay-api.amazon.eu'],
    [Region.UK, 'pay-api.amazon.eu'],
    [Region.NA, 'pay-api.amazon.com'],
    [Region.FE, 'pay-api.amazon.jp'],
  ]);

  public static regionLocaleMapping = new Map([
    ['de-DE', Region.EU],
    ['fr-FR', Region.EU],
    ['en-GB', Region.UK],
    ['it-IT', Region.EU],
    ['es-ES', Region.EU],
    ['en-US', Region.NA],
    ['es-US', Region.NA],
    ['en-CA', Region.NA],
    ['fr-CA', Region.NA],
    ['ja-JP', Region.FE],
  ]);

  public static getBasePath(environment: Environment) {
    return `/${environment.toLowerCase()}/v1/buyer/`;
  }
}
