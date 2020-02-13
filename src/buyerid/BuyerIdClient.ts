import * as Alexa from 'ask-sdk';
import { RequestEnvelope } from 'ask-sdk-model';
import * as https from 'https';
import { Environment } from '../model/Environment';
import { Region } from '../model/Region';
import { Utilities } from '../utilities/Utilities';

export class BuyerIdClient {
  public static getBuyerId(requestEnvelope: RequestEnvelope): Promise<any> {
    const alexaApiEndpoint = requestEnvelope.context.System.apiEndpoint;
    let region = Utilities.alexaAPiEndpointToRegionMapping.get(alexaApiEndpoint);
    if (region === undefined) {
      region = Region.DEFAULT;
    }
    return BuyerIdClient.getBuyerIdForRegion(requestEnvelope, region);
  }

  /**
   * @deprecated Since version 1.1.0. Will be deleted in version 2.0. Use getBuyerId or getBuyerIdForRegion instead.
   */
  public static getBuyerIdForLocale(requestEnvelope: RequestEnvelope): Promise<any> {
    const locale = Alexa.getLocale(requestEnvelope);
    if (locale === '') {
      throw new Error('locale needs to be defined');
    }
    let region = Utilities.regionLocaleMapping.get(locale);
    if (region === undefined) {
      region = Region.DEFAULT;
    }
    return BuyerIdClient.getBuyerIdForRegion(requestEnvelope, region);
  }

  public static getBuyerIdForRegion(requestEnvelope: RequestEnvelope, region: Region): Promise<any> {
    return new Promise((resolve, reject) => {
      const accessToken = Alexa.getApiAccessToken(requestEnvelope);
      const buyeridPath = `${Utilities.getBasePath(Environment.LIVE)}${BuyerIdClient.buyerIdPathSegment}`;
      if (region !== undefined) {
        const options = {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
          hostname: Utilities.regionEndpointMapping.get(region),
          method: 'GET',
          path: buyeridPath,
          port: 443,
        };

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
            resolve(jsonBody.buyerId);
          });
        });

        request.on('error', error => {
          reject(error);
        });

        request.end();
      }
    });
  }

  private static buyerIdPathSegment = 'id';
}
