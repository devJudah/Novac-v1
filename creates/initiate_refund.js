'use strict';

const perform = async (z, bundle) => {
  const body = {
    reference: bundle.inputData.reference,
    customer_note: bundle.inputData.customer_note,
    merchant_note: bundle.inputData.merchant_note
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/refund',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bundle.authData.secretKey}`
    },
    body: JSON.stringify(body)
  });

  return response.data;
};

module.exports = {
  key: 'initiate_refund',
  noun: 'Refund',

  display: {
    label: 'Initiate Refund',
    description: 'Initiate a full refund for a payment using Novac API.'
  },

  operation: {
    inputFields: [
      { key: 'reference', label: 'Transaction Reference', required: true, type: 'string' },
      { key: 'customer_note', label: 'Customer Note', required: false, type: 'string' },
      { key: 'merchant_note', label: 'Merchant Note', required: false, type: 'string' }
    ],

    perform,

    sample: {
      status: 'success',
      refund_reference: 'refund_123456',
      message: 'Refund initiated successfully.'
    },

    outputFields: [
      { key: 'status', label: 'Status' },
      { key: 'refund_reference', label: 'Refund Reference' },
      { key: 'message', label: 'Message' }
    ]
  }
};
