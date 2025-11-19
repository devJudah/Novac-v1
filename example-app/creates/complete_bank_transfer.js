'use strict';

const perform = async (z, bundle) => {
  const body = {
    transactionReference: bundle.inputData.transactionReference,
    paymentType: bundle.inputData.paymentType,
    cardBin: bundle.inputData.cardBin
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/bank-transfer',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // Authorization header injected globally
    },
    body: JSON.stringify(body)
  });

  const data = response.data;

  return {
    id: data.data.transactionReference || bundle.inputData.transactionReference,
    status: data.status,
    message: data.message,
    transactionReference: data.data.transactionReference,
    paymentType: data.data.paymentType,
    cardBin: data.data.cardBin,
    paymentStatus: data.data.paymentStatus
    // Add other relevant fields based on your API response
  };
};

module.exports = {
  key: 'complete_bank_transfer',
  noun: 'Bank Transfer',

  display: {
    label: 'Complete Bank Transfer Payment',
    description: 'Completes a bank transfer payment transaction using Novac API.'
  },

  operation: {
    inputFields: [
      {
        key: 'transactionReference',
        type: 'string',
        required: true,
        label: 'Transaction Reference'
      },
      {
        key: 'paymentType',
        type: 'string',
        required: true,
        label: 'Payment Type'
      },
      {
        key: 'cardBin',
        type: 'string',
        required: true,
        label: 'Card BIN'
      }
    ],

    perform,

    sample: {
      id: 'trx_123456',
      status: true,
      message: 'Bank transfer completed successfully',
      transactionReference: 'trx_123456',
      paymentType: 'bank_transfer',
      cardBin: '123456',
      paymentStatus: 'Completed'
    },

    outputFields: [
      { key: 'id', label: 'Transaction ID' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'transactionReference', label: 'Transaction Reference' },
      { key: 'paymentType', label: 'Payment Type' },
      { key: 'cardBin', label: 'Card BIN' },
      { key: 'paymentStatus', label: 'Payment Status' }
    ]
  }
};
