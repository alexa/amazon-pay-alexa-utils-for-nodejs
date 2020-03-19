# amazonpay-alexa-utils

<p align="center">
  <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/avs/docs/ux/branding/mark1._TTH_.png">
  <br/>
  <h1 align="center">Amazon Pay Alexa Utils for Node.js</h1>
  <p align="center"><a href="https://travis-ci.org/alexa/amazon-pay-alexa-utils-for-nodejs"><img src="https://travis-ci.org/alexa/amazon-pay-alexa-utils-for-nodejs.svg?branch=master"></a></p>
</p>

The Amazon Pay Alexa Utils package simplifies creating Amazon Pay related payloads and Directives for skills created with the ASK SDK v2 for Node.js.
It also offers the Amazon Pay specific APIs to retrieve Buyer Ids and Shipping Addresses and supports with a simple way to handle permissions.

To install it into your project, simply execute `npm i amazon-pay-alexa-utils --save`

## Setup API

Build payloads for setup operations the easy way -  no need to know the payload structure. The builder will take care to give you the right format.


Learn more about the [Amazon Pay Setup API](https://developer.amazon.com/de/docs/amazon-pay/amazon-pay-apis-for-alexa.html#setup)

```javascript
const AmazonPay = require('@amazonpay/amazon-pay-alexa-utils');

const payload = AmazonPay.setupPayload(/*version*/ '2')
    .withSellerId('ABCD1234ADS')
    .withCountryOfEstablishment('DE')
    .withLedgerCurrency('EUR')
    .withCheckoutLanguage('en_GB')
    .withBillingAgreementType('MerchantInitiatedTransaction')
    .withSubscriptionAmount('19.99')
    .withSubscriptionCurrency('EUR')
    .withCustomInformation('so custom')
    .withPlatformId('ABCDE')
    .withSellerBillingAgreementId('12345')
    .withSellerNote('my note')
    .withStoreName('my store')
    .shippingNeeded(true)
    .onSandbox({'eMail': 'mysandbox@email.test'}))
    .build();

console.log(JSON.stringify(payload))


{  
    "@type":"SetupAmazonPayRequest",
    "@version":"2",
    "countryOfEstablishment":"DE",
    "ledgerCurrency":"EUR",
    "needAmazonShippingAddress":true,
    "sellerId":"ABCD1234ADS",
    "sandboxCustomerEmailId":"mysandbox@email.test",
    "sandboxMode":true,
    "checkoutLanguage":"en_GB",
    "billingAgreementAttributes":{  
        "@type":"BillingAgreementAttributes",
        "@version":"2",
        "sellerNote":"my note",
        "platformId":"ABCDE",
        "billingAgreementType":"MerchantInitiatedTransaction",
        "subscriptionAmount":{
            "@type":"Price",
            "@version":"2",
            "amount":"19.99",
            "currencyCode":"EUR"
        },
        "sellerBillingAgreementAttributes":{  
            "@type":"SellerBillingAgreementAttributes",
            "@version":"2",
            "storeName":"my store",
            "customInformation":"so custom",
            "sellerBillingAgreementId":"12345"
        }
    }
} 
```

## Charge API

Build payloads for charge operations the easy way -  no need to know the payload structure. The builder will take care to give you the right format.


Learn more about the [Amazon Pay Charge API](https://developer.amazon.com/de/docs/amazon-pay/amazon-pay-apis-for-alexa.html#charge)

```javascript
const AmazonPay = require('@amazonpay/amazon-pay-alexa-utils');

const payload = AmazonPay.chargePayload(/* version */ '2')
    .withSellerId('ABCD1234ADS')
    .withBillingAgreementId('B02-12345-12345')
    .withPaymentAction('AUTHORIZEANDCAPTURE')
    .withAuthorizationReferenceId('ref')
    .withAmount('50')
    .withCurrency('EUR')
    .withTransactionTimeout('0')
    .withSellerAuthorizationNote('my auth note')
    .withSoftDescriptor('my store - Alexa skill')
    .withSellerOrderId('12345')
    .withStoreName('my store')
    .withCustomInformation('so custom')
    .withSellerNote('my note')
    .build();

console.log(JSON.stringify(payload))

{
    '@type': 'ChargeAmazonPayRequest',
    '@version': '2',
    'billingAgreementId': 'B02-12345-12345',
    'paymentAction': 'AUTHORIZEANDCAPTURE',
    'sellerId': 'ABCD1234ADS',
    'authorizeAttributes': {
      '@type': 'AuthorizeAttributes',
      '@version': '2',
      'authorizationReferenceId': 'ref',
      'authorizationAmount': {
        '@type': 'Price',
        '@version': '2',
        'amount': '50',
        'currencyCode': 'EUR',
      },
      'sellerAuthorizationNote': 'my auth note',
      'softDescriptor': 'my store - Alexa skill',
      'transactionTimeout': '0',
    },
    'sellerOrderAttributes': {
      '@type': 'SellerOrderAttributes',
      '@version': '2',
      'customInformation': 'so custom',
      'sellerNote': 'my note',
      'sellerOrderId': '12345',
      'storeName': 'my store',
    },
  }
```

## Directives

Directives allow you to execute Amazon Pay operations. Just pass in the right payload and the DirectiveBuilder will hand you the correct directive to execute.

### Setup

```javascript
const AmazonPay = require('@amazonpay/amazon-pay-alexa-utils');

const payloadBuilder = AmazonPay.setupPayload(/* version */ '2')
    .withSellerId('ABCD1234ADS')
    .withCountryOfEstablishment('DE')
    .withLedgerCurrency('EUR');

const directive = AmazonPay
    .setupDirective(payloadBuilder, 'token')
    .build();

console.log(JSON.stringify(directive));

    {
      "name": "Setup",
      "payload": {
        "@type": "SetupAmazonPayRequest",
        "@version": "2",
        "countryOfEstablishment": "DE",
        "ledgerCurrency": "EUR",
        "needAmazonShippingAddress": false,
        "sellerId": "ABCD1234ADS"
      },
      "token": "token",
      "type": "Connections.SendRequest"
    }


```

### Charge

```javascript
const AmazonPay = require('@amazonpay/amazon-pay-alexa-utils');

const payloadBuilder = AmazonPay.chargePayload(/* version */ '2')
    .withSellerId('ABCD1234ADS')
    .withBillingAgreementId('B02-12345-12345')
    .withAmount('50')
    .withCurrency('EUR')
    .withAuthorizationReferenceId('ref')
    .withPaymentAction('AUTHORIZE');

const directive = AmazonPay
    .chargeDirective(payloadBuilder, 'token')
    .build();

    console.log(JSON.stringify(directive));

    {
      "name": "Charge",
      "payload": {
        "@type": "ChargeAmazonPayRequest",
        "@version": "2",
        "billingAgreementId": "B02-12345-12345",
        "paymentAction": "AUTHORIZE",
        "sellerId": "ABCD1234ADS",
        "authorizeAttributes": {
          "@type": "AuthorizeAttributes",
          "@version": "2",
          "authorizationAmount": {
            "@type": "Price",
            "@version": "2",
            "amount": "50",
            "currencyCode": "EUR"
          },
          "authorizationReferenceId": "ref"
        }
      },
      "token": "token",
      "type": "Connections.SendRequest"
    }

```

## Permissions

### Get Permission Status

Knowing if a custoemr has accepted Amazon Pay permissions is essential. The following method makes this job as easy as possible for you.

```javascript
const AmazonPay = require('@amazonpay/amazon-pay-alexa-utils');

const permissionIsGranted = AmazonPay.isAmazonPayPermissionGranted(handlerInput.requestEnvelope);

```


### Ask For Permissions - send card andprompt
```javascript
const AmazonPay = require('@amazonpay/amazon-pay-alexa-utils');

const response = AmazonPay.askForPermissionCard('Spoken message to ask for permission enablement')
  .withAdditionalPermissions(['alexa::profile:email:read', 'alexa::profile:name:read'])
  .send(handlerInput.responseBuilder);
```

## Amazon Pay Buyer Address API

Amazon Pay helps you fullfilling your oders seamlessly, by - among others - offering delivery address data via the Amazon Pay payment objects. Sometimes, this is too late in the flow to personalize the experience.
The Amazon Pay Buyer Address API was introduced to help you out. Retrieve the default shipping address of the current buyer via a simple GET request whenever you need it.

Please check for granted Amazon Pay permissions first.

Learn more about the [Amazon Pay Buyer Address API](https://developer.amazon.com/de/docs/amazon-pay/amazon-pay-apis-for-alexa.html#buyer_address).
```javascript
  const AmazonPay = require('@amazonpay/amazon-pay-alexa-utils');

  async handle: {
  ...

  // use this to have the current locale decide for the region to use
  const buyerAddress = await AmazonPay.getBuyerAddress(requestEnvelope, sellerId);
  
  // if you want to specify the region yourself
  const buyerAddress = await AmazonPay.getBuyerAddressForRegion(requestEnvelope, region, sellerId);
  ...
  
  // if you want to test in sandbox mode
  const buyerAddress = await AmazonPay.getBuyerAddressForRegion(requestEnvelope, sellerId, 'sandbox', 'mysandbox@email.test');
  
  }
```

## Amazon Pay Buyer Id

The Amazon Pay Buyer Id allows you to personalize the experience immediately for Amazon Pay customers already known to you - without asking them to link accounts.
The Id is static, even if a customer deactivated the skill in the past and is consistent across channels.
Use this simple abstraction to retrieve it.

Please check for granted Amazon Pay permission first.

Learn more about the [Amazon Pay Buyer Id API](https://developer.amazon.com/de/docs/amazon-pay/amazon-pay-apis-for-alexa.html#buyer_id).
```javascript
  const AmazonPay = require('@amazonpay/amazon-pay-alexa-utils');

  async handle: {
  ...

  // use this to have the current locale decide for the region to use
  const buyerId = await AmazonPay.getBuyerId(requestEnvelope);
  
  // if you want to specify the region yourself
  const buyerId = await AmazonPay.getBuyerIdForRegion(requestEnvelope, region);
  ...
  }
```