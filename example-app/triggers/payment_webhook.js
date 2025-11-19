module.exports = {
  key: 'payment_webhook',
  noun: 'Payment Webhook',

  display: {
    label: 'New Payment Webhook Event',
    description: 'Triggers when Novac sends a webhook event (e.g., payment success, failed, etc.).'
  },

  operation: {
    type: 'hook', // this is critical
    performSubscribe: async (z, bundle) => {
      // Optionally register user's webhook endpoint with Novac, if required (auto in your case)
      return {};
    },
    performUnsubscribe: async (z, bundle) => {
      // Optionally remove the webhook endpoint with Novac
      return {};
    },
    perform: async (z, bundle) => {
      // This gets called when the webhook fires. Return payload to initialize Zap.
      return [bundle.cleanedRequest];
    },
    // sample and outputFields can help Zapier users test and set up their Zaps
    sample: {
      data: {
        status: 'successful',
        amount: 1000,
        currency: 'NGN',
        transactionReference: 'trx_123',
        // ...other fields
      },
      notify: 'transaction',
      notifyType: 'successful'
    },
    outputFields: [
      { key: 'data__status', label: 'Status' },
      { key: 'data__transactionReference', label: 'Transaction Reference' },
      // Add further output fields from the webhook structure as needed
    ]
  }
};
