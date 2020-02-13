import { interfaces } from 'ask-sdk-model';
import AuthorizeAttributes = interfaces.amazonpay.model.v1.AuthorizeAttributes;

import { Currency } from '../../model/Currency';

export class AuthorizeAttributesBuilder {
  private readonly DUMMY: string = 'dummy';

  private readonly version: string;
  private readonly type: string;

  private authorizationReferenceId: string = this.DUMMY;
  private authorizationAmount: string = this.DUMMY;
  private currency: Currency = Currency.NOT_DEFINED;

  // control flags
  private needsoptionalAuthAttributes = false;

  // optional arguments on AuthorizeAttributes
  private sellerAuthorizationNote: string = this.DUMMY;
  private softDescriptor: string = this.DUMMY;
  private transactionTimeout: string = this.DUMMY;

  constructor(version: string) {
    // version can be used to decide for the right fromat in future
    this.version = version;
    this.type = 'AuthorizeAttributes';
  }

  public withAuthorizationReferenceId(referenceId: string): AuthorizeAttributesBuilder {
    this.authorizationReferenceId = referenceId;
    return this;
  }

  public setAuthorizationReferenceId(referenceId: string): AuthorizeAttributesBuilder {
    return this.withAuthorizationReferenceId(referenceId);
  }

  public withAmount(amount: string): AuthorizeAttributesBuilder {
    this.authorizationAmount = amount;
    return this;
  }

  public setAmount(amount: string): AuthorizeAttributesBuilder {
    return this.withAmount(amount);
  }

  public withCurrency(currency: Currency): AuthorizeAttributesBuilder {
    this.currency = currency;
    return this;
  }

  public setCurrency(currency: Currency): AuthorizeAttributesBuilder {
    return this.withCurrency(currency);
  }

  public withSellerAuthorizationNote(note: string): AuthorizeAttributesBuilder {
    this.needsoptionalAuthAttributes = true;
    this.sellerAuthorizationNote = note;
    return this;
  }

  public setSellerAuthorizationNote(note: string): AuthorizeAttributesBuilder {
    return this.withSellerAuthorizationNote(note);
  }

  public withSoftDescriptor(softDescriptor: string): AuthorizeAttributesBuilder {
    this.needsoptionalAuthAttributes = true;
    this.softDescriptor = softDescriptor;
    return this;
  }

  public setSoftDescriptor(softDescriptor: string): AuthorizeAttributesBuilder {
    return this.withSoftDescriptor(softDescriptor);
  }

  public withTransactionTimeout(transactionTimeout: string): AuthorizeAttributesBuilder {
    this.needsoptionalAuthAttributes = true;
    this.transactionTimeout = transactionTimeout;
    return this;
  }

  public setTransactionTimeout(transactionTimeout: string): AuthorizeAttributesBuilder {
    return this.withTransactionTimeout(transactionTimeout);
  }

  public build(): AuthorizeAttributes {
    if (this.authorizationReferenceId === this.DUMMY) {
      throw new Error('authorizationReferenceId is required');
    }
    if (this.authorizationAmount === this.DUMMY) {
      throw new Error('authorizationAmount is required');
    }
    if (this.currency === Currency.NOT_DEFINED) {
      throw new Error('currency is required');
    }

    let authAttributes = {
      '@type': 'AuthorizeAttributes',
      '@version': this.version,
      authorizationAmount: {
        '@type': 'Price',
        '@version': this.version,
        amount: this.authorizationAmount,
        currencyCode: this.currency,
      },
      authorizationReferenceId: this.authorizationReferenceId,
    };

    if (this.needsoptionalAuthAttributes) {
      if (this.sellerAuthorizationNote !== this.DUMMY) {
        authAttributes = Object.assign(authAttributes, { sellerAuthorizationNote: this.sellerAuthorizationNote });
      }
      if (this.softDescriptor !== this.DUMMY) {
        authAttributes = Object.assign(authAttributes, { softDescriptor: this.softDescriptor });
      }
      if (this.transactionTimeout !== this.DUMMY) {
        authAttributes = Object.assign(authAttributes, { transactionTimeout: this.transactionTimeout });
      }
    }

    return JSON.parse(JSON.stringify(authAttributes));
  }
}
