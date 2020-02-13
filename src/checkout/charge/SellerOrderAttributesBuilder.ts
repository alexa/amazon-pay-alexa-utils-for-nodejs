import { interfaces } from 'ask-sdk-model';
import SellerOrderAttributes = interfaces.amazonpay.model.v1.SellerOrderAttributes;

export class SellerOrderAttributesBuilder {
  private readonly DUMMY: string = 'dummy';

  private readonly version: string;
  private readonly type: string;

  // control flags
  private needsSellerOrderAttributes = false;

  // optional SellerOrderAttributes
  private sellerOrderId: string = this.DUMMY;
  private sellerNote: string = this.DUMMY;
  private storeName: string = this.DUMMY;
  private customInformation: string = this.DUMMY;

  constructor(version: string) {
    // version can be used to decide for the right fromat in future
    this.version = version;
    this.type = 'SellerOrderAttributes';
  }

  public withSellerOrderId(sellerOrderId: string): SellerOrderAttributesBuilder {
    this.needsSellerOrderAttributes = true;
    this.sellerOrderId = sellerOrderId;
    return this;
  }

  public setSellerOrderId(sellerOrderId: string): SellerOrderAttributesBuilder {
    return this.withSellerOrderId(sellerOrderId);
  }

  public withSellerNote(sellerNote: string): SellerOrderAttributesBuilder {
    this.needsSellerOrderAttributes = true;
    this.sellerNote = sellerNote;
    return this;
  }

  public setSellerNote(sellerNote: string): SellerOrderAttributesBuilder {
    return this.withSellerNote(sellerNote);
  }

  // sellerAttributes
  public withStoreName(storeName: string): SellerOrderAttributesBuilder {
    this.needsSellerOrderAttributes = true;
    this.storeName = storeName;
    return this;
  }

  public setStoreName(storeName: string): SellerOrderAttributesBuilder {
    return this.withStoreName(storeName);
  }

  public withCustomInformation(customInformation: string): SellerOrderAttributesBuilder {
    this.needsSellerOrderAttributes = true;
    this.customInformation = customInformation;
    return this;
  }

  public setCustomInformation(customInformation: string): SellerOrderAttributesBuilder {
    return this.withCustomInformation(customInformation);
  }

  public build(): SellerOrderAttributes {
    let orderAtrributes = {};

    if (this.needsSellerOrderAttributes) {
      orderAtrributes = {
        '@type': 'SellerOrderAttributes',
        '@version': this.version,
      };
      if (this.customInformation !== this.DUMMY) {
        orderAtrributes = Object.assign(orderAtrributes, { customInformation: this.customInformation });
      }
      if (this.sellerNote !== this.DUMMY) {
        orderAtrributes = Object.assign(orderAtrributes, { sellerNote: this.sellerNote });
      }
      if (this.sellerOrderId !== this.DUMMY) {
        orderAtrributes = Object.assign(orderAtrributes, { sellerOrderId: this.sellerOrderId });
      }
      if (this.storeName !== this.DUMMY) {
        orderAtrributes = Object.assign(orderAtrributes, { storeName: this.storeName });
      }
    }

    return JSON.parse(JSON.stringify(orderAtrributes));
  }
}
