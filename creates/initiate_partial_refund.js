'use strict';

const perform = async (z, bundle) => {
  const body = {
    reference: bundle.inputData.reference,
    amount: bundle.inputData.amount,
    customer_note: bundle.inputData.customer_note,
    merchant_note: bundle.inputData.merchant_note
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/partial-refund',
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
  key: 'initiate_partial_refund',
  noun: 'Partial Refund',

  display: {
    label: 'Initiate Partial Refund',
    description: 'Initiate a partial refund for a payment using Novac API.'
  },

  operation: {
    inputFields: [
      { key: 'reference', label: 'Transaction Reference', required: true, type: 'string' },
      { key: 'amount', label: 'Refund Amount', required: true, type: 'number' },
      { key: 'customer_note', label: 'Customer Note', required: false, type: 'string' },
      { key: 'merchant_note', label: 'Merchant Note', required: false, type: 'string' }
    ],

    perform,

    sample: {
      status: 'success',
      refund_reference: 'refund_123456',
      refunded_amount: 123,
      message: 'Partial refund initiated successfully.'
    },

    outputFields: [
      { key: 'status', label: 'Status' },
      { key: 'refund_reference', label: 'Refund Reference' },
      { key: 'refunded_amount', label: 'Refunded Amount' },
      { key: 'message', label: 'Message' }
    ]
  }
};
