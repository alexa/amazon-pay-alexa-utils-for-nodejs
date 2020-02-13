import { interfaces } from 'ask-sdk-model';
import SendRequestDirective = interfaces.connections.SendRequestDirective;

export abstract class AbstractDirectiveBuilder<T, V> {
  protected type: string = 'Connections.SendRequest';

  protected payloadBuilder: T;
  protected token: string;

  constructor(payloadBuilder: T, token: string) {
    this.payloadBuilder = payloadBuilder;
    this.token = token;
  }

  public abstract get Token(): string;
  public abstract get Payload(): V;
  public abstract get PayloadBuilder(): T;
  public abstract build(): SendRequestDirective;
}
