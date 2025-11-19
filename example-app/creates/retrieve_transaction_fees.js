'use strict';

const perform = async (z, bundle) => {
  const body = {
    transactionReference: bundle.inputData.transactionReference,
    paymentType: bundle.inputData.paymentType,
    cardBin: bundle.inputData.cardBin
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/transaction-fee',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // Authorization header handled globally through auth/beforeRequest
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
    transactionFeeAmount: data.data.transactionFeeAmount,
    transactionFeeCurrency: data.data.transactionFeeCurrency
    // Adapt output fields as per your API response
  };
};

module.exports = {
  key: 'retrieve_transaction_fee',
  noun: 'Transaction Fee',

  display: {
    label: 'Retrieve Transaction Fee',
    description: 'Retrieves the fee amount for a given transaction using transaction reference, payment type, and card BIN.'
  },

  operation: {
    inputFields: [
      { key: 'transactionReference', type: 'string', required: true, label: 'Transaction Reference' },
      { key: 'paymentType', type: 'string', required: true, label: 'Payment Type' },
      { key: 'cardBin', type: 'string', required: true, label: 'Card BIN' }
    ],

    perform,

    sample: {
      id: 'trx_123456',
      status: true,
      message: 'Fee retrieved successfully',
      transactionReference: 'trx_123456',
      paymentType: 'card',
      cardBin: '123456',
      transactionFeeAmount: '50.00',
      transactionFeeCurrency: 'NGN'
    },

    outputFields: [
      { key: 'id', label: 'Transaction ID' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'transactionReference', label: 'Transaction Reference' },
      { key: 'paymentType', label: 'Payment Type' },
      { key: 'cardBin', label: 'Card BIN' },
      { key: 'transactionFeeAmount', label: 'Transaction Fee Amount' },
      { key: 'transactionFeeCurrency', label: 'Transaction Fee Currency' }
    ]
  }
};
