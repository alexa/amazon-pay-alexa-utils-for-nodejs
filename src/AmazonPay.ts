import { RequestEnvelope } from 'ask-sdk-model';

import { BuyerAddressClient } from './buyerAddress/BuyerAddressClient';
import { BuyerIdClient } from './buyerid/BuyerIdClient';
import { ChargeDirectiveBuilder } from './checkout/charge/ChargeDirectiveBuilder';
import { ChargePayloadBuilder } from './checkout/charge/ChargePayloadBuilder';
import { SetupDirectiveBuilder } from './checkout/setup/SetupDirectiveBuilder';
import { SetupPayloadBuilder } from './checkout/setup/SetupPayloadBuilder';
import { Environment } from './model/Environment';
import { Region } from './model/Region';
import { PermissionCardBuilder } from './permissions/PermissionCardBuilder';
import { PermissionManager } from './permissions/PermissionManager';

export function askForPermissionCard(speechText: string): PermissionCardBuilder {
  return PermissionManager.get().askForPermissionCard(speechText);
}

export function chargeDirective(payloadBuilder: ChargePayloadBuilder, token: string): ChargeDirectiveBuilder {
  return new ChargeDirectiveBuilder(payloadBuilder, token);
}

export function chargePayload(version: string): ChargePayloadBuilder {
  return new ChargePayloadBuilder(version);
}

export function getBuyerId(requestEnvelope: RequestEnvelope): Promise<any> {
  return BuyerIdClient.getBuyerId(requestEnvelope);
}
/**
 * @deprecated Since version 1.1.0. Will be deleted in version 2.0. Use getBuyerId or getBuyerIdForRegion instead.
 */
export function getBuyerIdForLocale(requestEnvelope: RequestEnvelope): Promise<any> {
  return BuyerIdClient.getBuyerIdForLocale(requestEnvelope);
}

export function getBuyerIdForRegion(requestEnvelope: RequestEnvelope, region: Region): Promise<any> {
  return BuyerIdClient.getBuyerIdForRegion(requestEnvelope, region);
}

export function getBuyerAddress(
  requestEnvelope: RequestEnvelope,
  sellerId: string,
  environment?: Environment,
  sandboxEmail?: string,
): Promise<any> {
  return BuyerAddressClient.getBuyerAddress(requestEnvelope, sellerId, environment, sandboxEmail);
}

/**
 * @deprecated Since version 1.1.0. Will be deleted in version 2.0. Use getDefaultAddress or getDefaultAddressForRegion instead.
 */
export function getBuyerAddressForLocale(
  requestEnvelope: RequestEnvelope,
  sellerId: string,
  environment?: Environment,
  sandboxEmail?: string,
): Promise<any> {
  return BuyerAddressClient.getBuyerAddressForLocale(requestEnvelope, sellerId, environment, sandboxEmail);
}

export function getBuyerAddressForRegion(
  requestEnvelope: RequestEnvelope,
  region: Region,
  sellerId: string,
  environment?: Environment,
  sandboxEmail?: string,
): Promise<any> {
  return BuyerAddressClient.getBuyerAddressForRegion(requestEnvelope, region, sellerId, environment, sandboxEmail);
}

export function isAmazonPayPermissionGranted(requestEnvelope: RequestEnvelope): boolean {
  return PermissionManager.get().isPurchasingAndPayEnabled(requestEnvelope);
}

export function setupDirective(payloadBuilder: SetupPayloadBuilder, token: string): SetupDirectiveBuilder {
  return new SetupDirectiveBuilder(payloadBuilder, token);
}

export function setupPayload(version: string): SetupPayloadBuilder {
  return new SetupPayloadBuilder(version);
}
