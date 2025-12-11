'use strict';

const perform = async (z, bundle) => {
  const body = {
    transactionReference: bundle.inputData.transactionReference
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/void-transaction',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // Authorization header handled globally by your app's auth flow
    },
    body: JSON.stringify(body)
  });

  return response.data;
};

module.exports = {
  key: 'void_transaction',
  noun: 'Void Transaction',

  display: {
    label: 'Void Transaction',
    description: 'Voids a specific transaction using its transaction reference.'
  },

  operation: {
    inputFields: [
      {
        key: 'transactionReference',
        type: 'string',
        required: true,
        label: 'Transaction Reference'
      }
    ],

    perform,

    sample: {
      status: 'voided',
      transactionReference: 'trx_123456',
      message: 'Transaction successfully voided'
    },

    outputFields: [
      { key: 'status', label: 'Status' },
      { key: 'transactionReference', label: 'Transaction Reference' },
      { key: 'message', label: 'Message' }
    ]
  }
};
