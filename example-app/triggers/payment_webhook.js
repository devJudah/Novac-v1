module.exports = {
  key: 'payment_webhook',
  noun: 'Payment Webhook',

  

  display: {
    label: 'New Payment Webhook Event',
    description:
      'Triggers when Novac sends a payment-related webhook event (e.g., payment successful, failed, reversed, abandoned, wallet funding, or bank transfer).'
  },

  operation: {
    type: 'hook',
    performSubscribe: async (z, bundle) => {
       const hookUrl = bundle.targetUrl; // Zapier-generated webhook URL
       z.console.log('Your Zapier webhook URL is:', hookUrl);
      // Normally, send this hookUrl to your API to register the webhook
      // Example: await z.request({ url: 'https://api.novac.com/webhooks', method: 'POST', body: { url: hookUrl, events: ['payment'] } });
      return { id: 'novac-hook-id', url: hookUrl }; // id is required
    },

    performUnsubscribe: async (z, bundle) => {
      const hookId = bundle.subscribeData.id;
      // Delete webhook from your API
      // await z.request({ url: `https://api.novac.com/webhooks/${hookId}`, method: 'DELETE' });
      return {};
    },

    perform: async (z, bundle) => {
      // Handles webhook POST requests; returns cleaned data to Zapier
      return [bundle.cleanedRequest];
    },

    sample: {
      data: {
        id: 12345,
        card: {
          type: 'VISA',
          token: 'tok_xxxx',
          issuer: 'GTBank',
          country: 'NG',
          last4Digits: '1234',
          first6Digits: '412345'
        },
        amount: 300,
        domain: 'live',
        status: 'successful',
        channel: 'card',
        currency: 'NGN',
        customer: {
          id: 9812,
          name: 'Jane Doe',
          email: 'jane@example.com',
          customerCode: 'CUS_123XYZ'
        },
        requestIp: '197.111.100.5',
        redirectUrl: 'https://merchant-site.com/redirect',
        chargedAmount: 310,
        transactionFee: 10,
        transferDetail: {
          bankCode: '058',
          bankName: 'GTBank',
          sessionId: 'sess_882122',
          accountNumber: '0123456789',
          originatorName: 'Jane Doe',
          creditAccountName: 'GTBank Main',
          originatorAccountNumber: '0123456789'
        },
        checkoutMetadata: '{}',
        authorizationCode: 'AUTH_9821',
        paymentDescriptor: 'NOVAC',
        gatewayResponseCode: '00',
        transactionReference: 'trx_1492812'
      },
      notify: 'transaction',
      notifyType: 'successful'
    },

    outputFields: [
      { key: 'data__id', label: 'Transaction ID' },
      { key: 'data__status', label: 'Status' },
      { key: 'data__amount', label: 'Amount' },
      { key: 'data__currency', label: 'Currency' },
      { key: 'data__transactionReference', label: 'Transaction Reference' },
      { key: 'data__domain', label: 'Domain' },
      { key: 'data__channel', label: 'Channel' },
      { key: 'data__customer__id', label: 'Customer ID' },
      { key: 'data__customer__name', label: 'Customer Name' },
      { key: 'data__customer__email', label: 'Customer Email' },
      { key: 'data__customer__customerCode', label: 'Customer Code' },
      { key: 'data__card__type', label: 'Card Type' },
      { key: 'data__card__token', label: 'Card Token' },
      { key: 'data__card__issuer', label: 'Card Issuer' },
      { key: 'data__card__country', label: 'Card Country' },
      { key: 'data__card__last4Digits', label: 'Card Last 4 Digits' },
      { key: 'data__card__first6Digits', label: 'Card First 6 Digits' },
      { key: 'data__requestIp', label: 'Request IP' },
      { key: 'data__redirectUrl', label: 'Redirect URL' },
      { key: 'data__chargedAmount', label: 'Charged Amount' },
      { key: 'data__transactionFee', label: 'Transaction Fee' },
      { key: 'data__transferDetail__bankCode', label: 'Bank Code' },
      { key: 'data__transferDetail__bankName', label: 'Bank Name' },
      { key: 'data__transferDetail__sessionId', label: 'Session ID' },
      { key: 'data__transferDetail__accountNumber', label: 'Account Number' },
      { key: 'data__transferDetail__originatorName', label: 'Originator Name' },
      { key: 'data__transferDetail__creditAccountName', label: 'Credit Account Name' },
      { key: 'data__transferDetail__originatorAccountNumber', label: 'Originator Account Number' },
      { key: 'data__checkoutMetadata', label: 'Checkout Metadata' },
      { key: 'data__authorizationCode', label: 'Authorization Code' },
      { key: 'data__paymentDescriptor', label: 'Payment Descriptor' },
      { key: 'data__gatewayResponseCode', label: 'Gateway Response Code' },
      { key: 'notify', label: 'Notification Type' },
      { key: 'notifyType', label: 'Notification Status' }
    ]
  }
};
