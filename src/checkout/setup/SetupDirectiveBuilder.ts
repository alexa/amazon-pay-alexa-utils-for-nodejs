import { interfaces } from 'ask-sdk-model';
import SendRequestDirective = interfaces.connections.SendRequestDirective;
import SetupAmazonPayRequest = interfaces.amazonpay.request.SetupAmazonPayRequest;

import { AbstractDirectiveBuilder } from '../AbstractDirectiveBuilder';
import { SetupPayloadBuilder } from './SetupPayloadBuilder';

export class SetupDirectiveBuilder extends AbstractDirectiveBuilder<SetupPayloadBuilder, SetupAmazonPayRequest> {
  private name = 'Setup';

  constructor(payloadBuilder: SetupPayloadBuilder, correlationToken: string) {
    super(payloadBuilder, correlationToken);
  }

  public get Token(): string {
    return this.token;
  }

  public get Payload(): SetupAmazonPayRequest {
    return this.payloadBuilder.build();
  }

  public get PayloadBuilder(): SetupPayloadBuilder {
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
