import { ResponseBuilder } from 'ask-sdk';
import { Response } from 'ask-sdk-model';

export class PermissionCardBuilder {
  private speechText: string;
  private payPermission: string = 'payments:autopay_consent';
  private permissions: string[];

  constructor(speechText: string) {
    this.speechText = speechText;
    this.permissions = new Array<string>();
  }

  public withAdditionalPermissions(permissions: string[] = new Array<string>()): PermissionCardBuilder {
    this.permissions = permissions;
    return this;
  }

  public send(responseBuilder: ResponseBuilder): Response {
    const permissions = this.permissions.concat(this.payPermission);
    return responseBuilder
      .speak(this.speechText)
      .withAskForPermissionsConsentCard(permissions)
      .getResponse();
  }
}
