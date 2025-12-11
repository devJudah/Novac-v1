'use strict';

const perform = async (z, bundle) => {
  const reference = bundle.inputData.reference;

  const response = await z.request({
    url: `https://api.novacpayment.com/api/v1/refund/${encodeURIComponent(reference)}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bundle.authData.secretKey}`
    }
  });

  return response.data;
};

module.exports = {
  key: 'retrieve_refund',
  noun: 'Refund',

  display: {
    label: 'Retrieve Refund',
    description: 'Retrieves details of a refund by its reference.'
  },

  operation: {
    inputFields: [
      {
        key: 'reference',
        label: 'Refund Reference',
        type: 'string',
        required: true,
        helpText: 'The unique identifier of the refund to retrieve.'
      }
    ],

    perform,

    sample: {
      refund_reference: 'refund_123456',
      status: 'completed',
      amount: 100,
      currency: 'USD',
      transaction_reference: 'trx_654321',
      customer_note: 'Customer requested refund.',
      merchant_note: 'Refund processed successfully.'
    },

    outputFields: [
      { key: 'refund_reference', label: 'Refund Reference' },
      { key: 'status', label: 'Status' },
      { key: 'amount', label: 'Refunded Amount' },
      { key: 'currency', label: 'Currency' },
      { key: 'transaction_reference', label: 'Original Transaction Reference' },
      { key: 'customer_note', label: 'Customer Note' },
      { key: 'merchant_note', label: 'Merchant Note' }
    ]
  }
};
