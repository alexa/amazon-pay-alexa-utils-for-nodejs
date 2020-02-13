import { interfaces } from 'ask-sdk-model';
import SendRequestDirective = interfaces.connections.SendRequestDirective;
import ChargeAmazonPayRequest = interfaces.amazonpay.request.ChargeAmazonPayRequest;

import { AbstractDirectiveBuilder } from '../AbstractDirectiveBuilder';
import { ChargePayloadBuilder } from './ChargePayloadBuilder';

export class ChargeDirectiveBuilder extends AbstractDirectiveBuilder<ChargePayloadBuilder, ChargeAmazonPayRequest> {
  private name = 'Charge';

  constructor(payloadBuilder: ChargePayloadBuilder, correlationToken: string) {
    super(payloadBuilder, correlationToken);
  }

  public get Token(): string {
    return this.token;
  }

  public get Payload(): ChargeAmazonPayRequest {
    return this.payloadBuilder.build();
  }

  public get PayloadBuilder(): ChargePayloadBuilder {
    return this.payloadBuilder;
  }

  public build(): SendRequestDirective {
    const directive = {
      name: this.name,
      payload: this.payloadBuilder.build(),
      token: this.token,
      type: this.type,
    };

    return JSON.parse(JSON.stringify(directive));
  }
}
