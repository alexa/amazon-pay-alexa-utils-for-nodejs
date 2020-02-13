import * as Alexa from 'ask-sdk';
import { RequestEnvelope } from 'ask-sdk-model';
import * as https from 'https';
import { Environment } from '../model/Environment';
import { Region } from '../model/Region';
import { Utilities } from '../utilities/Utilities';

interface IHeader {
  Accept: string;
  Authorization: string;
  [key: string]: string;
}

export class BuyerAddressClient {
  public static getBuyerAddress(
    requestEnvelope: RequestEnvelope,
    sellerId: string,
    environment?: Environment,
    sandboxEmail?: string,
  ): Promise<any> {
    const alexaApiEndpoint = requestEnvelope.context.System.apiEndpoint;
    let region = Utilities.alexaAPiEndpointToRegionMapping.get(alexaApiEndpoint);
    if (region === undefined) {
      region = Region.DEFAULT;
    }
    return BuyerAddressClient.getBuyerAddressForRegion(requestEnvelope, region, sellerId, environment, sandboxEmail);
  }

  /**
   * @deprecated Since version 1.1.0. Will be deleted in version 2.0. Use getBuyerAdress or getBuyerAdressForRegion instead.
   */
  public static getBuyerAddressForLocale(
    requestEnvelope: RequestEnvelope,
    sellerId: string,
    environment?: Environment,
    sandboxEmail?: string,
  ): Promise<any> {
    const locale = Alexa.getLocale(requestEnvelope);
    if (locale === '') {
      throw new Error('locale needs to be defined');
    }
    let region = Utilities.regionLocaleMapping.get(locale);
    if (region === undefined) {
      region = Region.DEFAULT;
    }
    return BuyerAddressClient.getBuyerAddressForRegion(requestEnvelope, region, sellerId, environment, sandboxEmail);
  }

  public static getBuyerAddressForRegion(
    requestEnvelope: RequestEnvelope,
    region: Region,
    sellerId: string,
    environment?: Environment,
    sandboxEmail?: string,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (environment === undefined) {
        environment = Environment.LIVE;
      }

      if (environment === Environment.SANDBOX && sandboxEmail === undefined) {
        throw new Error('sandbox email needs to be defined for the sandbox environment');
      }

      const accessToken = Alexa.getApiAccessToken(requestEnvelope);
      const addressPath = `${Utilities.getBasePath(environment)}${
        BuyerAddressClient.addressPathSegment
      }?sellerId=${sellerId}`;
      if (region !== undefined) {
        const header: IHeader = {
          Accept: 'application/json',
          Authorization: 'Bearer ' + accessToken,
        };
        const options = {
          headers: header,
          hostname: Utilities.regionEndpointMapping.get(region),
          method: 'GET',
          path: addressPath,
          port: 443,
        };
        if (environment === Environment.SANDBOX && sandboxEmail !== undefined) {
          options.headers['x-amz-pay-sandbox-email-id'] = sandboxEmail;
        }

        const request = https.request(options, response => {
          const { statusCode } = response;

          if (statusCode !== 200) {
            response.resume();
            reject(new Error(`Status Code: ${statusCode}`));
          }

          let body = '';

          response.on('data', chunk => {
            body += chunk;
          });
          response.on('end', () => {
            const jsonBody = JSON.parse(body);
            resolve(jsonBody);
          });
        });

        request.on('error', error => {
          reject(error);
        });

        request.end();
      }
    });
  }

  private static addressPathSegment = 'addresses';
}
