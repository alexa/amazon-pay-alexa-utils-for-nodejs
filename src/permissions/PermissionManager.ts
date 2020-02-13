import { RequestEnvelope } from 'ask-sdk-model';

import { PermissionCardBuilder } from './PermissionCardBuilder';

export class PermissionManager {
  public static get(): PermissionManager {
    if (!PermissionManager.instance) {
      PermissionManager.instance = new PermissionManager();
    }
    return PermissionManager.instance;
  }
  private static instance: PermissionManager;

  private constructor() {}

  public askForPermissionCard(speechText: string): PermissionCardBuilder {
    return new PermissionCardBuilder(speechText);
  }

  public isPurchasingAndPayEnabled(requestEnvelope: RequestEnvelope): boolean {
    const permissions = requestEnvelope.context.System.user.permissions;
    if (permissions && permissions.scopes) {
      const pay = permissions.scopes['payments:autopay_consent'];
      return pay.status === 'GRANTED';
    }
    return false;
  }
}
