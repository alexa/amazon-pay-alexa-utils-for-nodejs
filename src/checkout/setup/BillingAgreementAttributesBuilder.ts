import { interfaces } from 'ask-sdk-model';
import BillingAgreementAttributes = interfaces.amazonpay.model.v1.BillingAgreementAttributes;
import Price = interfaces.amazonpay.model.v1.Price;

import { BillingAgreementType } from '../../model/BillingAgreementType';
import { Currency } from '../../model/Currency';

export class BillingAgreementAttributesBuilder {
  private readonly DUMMY: string = 'dummy';

  private readonly version: string;
  private readonly type: string;

  // control flags
  private addSellerBillingAgreementAttributes: boolean = false;
  private neeToGenerate: boolean = false;

  private billingAgreementType: BillingAgreementType = BillingAgreementType.NOT_DEFINED;
  private subscriptionAmount: string = this.DUMMY;
  private subscriptionCurrency: Currency = Currency.NOT_DEFINED;
  private sellerNote: string = this.DUMMY;
  private platformId: string = this.DUMMY;

  // sellerAttributes
  private storeName: string = this.DUMMY;
  private customInformation: string = this.DUMMY;
  private sellerBillingAgreementId: string = this.DUMMY;

  constructor(version: string) {
    // version can be used to decide for the right fromat in future
    this.version = version;
    this.type = 'BillingAgreementAttributes';
  }

  public withBillingAgreementType(billingAgreementType: BillingAgreementType): BillingAgreementAttributesBuilder {
    this.neeToGenerate = true;
    this.billingAgreementType = billingAgreementType;
    return this;
  }

  public setBillingAgreementType(billingAgreementType: BillingAgreementType): BillingAgreementAttributesBuilder {
    return this.withBillingAgreementType(billingAgreementType);
  }

  public withSubscriptionAmount(amount: string): BillingAgreementAttributesBuilder {
    this.neeToGenerate = true;
    this.subscriptionAmount = amount;
    return this;
  }

  public setSubscriptionAmount(amount: string): BillingAgreementAttributesBuilder {
    return this.withSubscriptionAmount(amount);
  }

  public withSubscriptionCurrency(currency: Currency): BillingAgreementAttributesBuilder {
    this.neeToGenerate = true;
    this.subscriptionCurrency = currency;
    return this;
  }

  public setSubscriptionCurrency(currency: Currency): BillingAgreementAttributesBuilder {
    return this.withSubscriptionCurrency(currency);
  }

  public withSellerNote(sellerNote: string): BillingAgreementAttributesBuilder {
    this.sellerNote = sellerNote;
    this.neeToGenerate = true;
    return this;
  }

  public setSellerNote(sellerNote: string): BillingAgreementAttributesBuilder {
    return this.withSellerNote(sellerNote);
  }

  public withPlatformId(platformId: string): BillingAgreementAttributesBuilder {
    this.platformId = platformId;
    this.neeToGenerate = true;
    return this;
  }

  public setPlatformId(platformId: string): BillingAgreementAttributesBuilder {
    return this.withPlatformId(platformId);
  }

  public withStoreName(storeName: string): BillingAgreementAttributesBuilder {
    this.neeToGenerate = true;
    this.addSellerBillingAgreementAttributes = true;
    this.storeName = storeName;
    return this;
  }

  public setStoreName(storeName: string): BillingAgreementAttributesBuilder {
    return this.withStoreName(storeName);
  }

  public withCustomInformation(customInformation: string): BillingAgreementAttributesBuilder {
    this.neeToGenerate = true;
    this.addSellerBillingAgreementAttributes = true;
    this.customInformation = customInformation;
    return this;
  }

  public setCustomInformation(customInformation: string): BillingAgreementAttributesBuilder {
    return this.withCustomInformation(customInformation);
  }

  public withSellerBillingAgreementId(sellerBillingAgreementId: string): BillingAgreementAttributesBuilder {
    this.neeToGenerate = true;
    this.addSellerBillingAgreementAttributes = true;
    this.sellerBillingAgreementId = sellerBillingAgreementId;
    return this;
  }

  public setSellerBillingAgreementId(sellerBillingAgreementId: string): BillingAgreementAttributesBuilder {
    return this.withSellerBillingAgreementId(sellerBillingAgreementId);
  }

  public build(): BillingAgreementAttributes {
    let attributes = {};
    if (this.neeToGenerate) {
      if (
        this.billingAgreementType === BillingAgreementType.CIT &&
        (this.subscriptionAmount !== this.DUMMY || this.subscriptionCurrency !== Currency.NOT_DEFINED)
      ) {
        throw new Error('SubscriptionAmount and SubscriptionCurrency only defined for MerchantInitiatedTransactions');
      }
      if (
        (this.subscriptionAmount !== this.DUMMY && this.subscriptionCurrency === Currency.NOT_DEFINED) ||
        (this.subscriptionAmount === this.DUMMY && this.subscriptionCurrency !== Currency.NOT_DEFINED)
      ) {
        throw new Error('Both of SubscriptionAmount and SubscriptionCurrency need to be defined or both left empty');
      }
      attributes = {
        '@type': this.type,
        '@version': this.version,
      };
      if (this.sellerNote !== this.DUMMY) {
        attributes = Object.assign(attributes, { sellerNote: this.sellerNote });
      }
      if (this.platformId !== this.DUMMY) {
        attributes = Object.assign(attributes, { platformId: this.platformId });
      }
      if (this.billingAgreementType !== BillingAgreementType.NOT_DEFINED) {
        attributes = Object.assign(attributes, { billingAgreementType: this.billingAgreementType });
      }

      if (this.subscriptionAmount !== this.DUMMY) {
        // currency must be set as ell, due to precondition above
        const subscriptionAmountObject = {
          '@type': 'Price',
          '@version': this.version,
          amount: this.subscriptionAmount,
          currencyCode: this.subscriptionCurrency,
        };
        attributes = Object.assign(attributes, { subscriptionAmount: subscriptionAmountObject });
      }

      if (this.addSellerBillingAgreementAttributes) {
        let innerAttributes = {
          '@type': 'SellerBillingAgreementAttributes',
          '@version': this.version,
        };

        if (this.storeName !== this.DUMMY) {
          innerAttributes = Object.assign(innerAttributes, { storeName: this.storeName });
        }
        if (this.customInformation !== this.DUMMY) {
          innerAttributes = Object.assign(innerAttributes, { customInformation: this.customInformation });
        }
        if (this.sellerBillingAgreementId !== this.DUMMY) {
          innerAttributes = Object.assign(innerAttributes, {
            sellerBillingAgreementId: this.sellerBillingAgreementId,
          });
        }

        const sellerAttributes = {
          sellerBillingAgreementAttributes: innerAttributes,
        };

        attributes = Object.assign(attributes, sellerAttributes);
      }
    }
    return JSON.parse(JSON.stringify(attributes));
  }
}
