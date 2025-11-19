'use strict';

const perform = async (z, bundle) => {
  const body = {
    transactionReference: bundle.inputData.transactionReference,
    amount: bundle.inputData.amount,
    transactionType: bundle.inputData.transactionType
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/transaction/verify',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // Authorization header added globally via auth/beforeRequest
    },
    body: JSON.stringify(body)
  });

  const data = response.data;

  if (![200, 201].includes(response.status)) {
    throw new Error(`API error: ${response.status} - ${data.message || 'Unknown error'}`);
  }

  return {
    id: data.data.transactionReference || bundle.inputData.transactionReference,
    status: data.status,
    message: data.message,
    verificationStatus: data.data.verificationStatus || null,
    transactionReference: data.data.transactionReference
    // Add more fields as needed per your API response
  };
};

module.exports = {
  key: 'verify_transaction',
  noun: 'Transaction Verification',

  display: {
    label: 'Verify Transaction',
    description: 'Verifies payment transaction details using Novac API.'
  },

  operation: {
    inputFields: [
      { key: 'transactionReference', type: 'string', required: true, label: 'Transaction Reference' },
      { key: 'amount', type: 'number', required: true, label: 'Amount' },
      { key: 'transactionType', type: 'string', required: true, label: 'Transaction Type' }
    ],

    perform,

    sample: {
      id: 'trx_123456',
      status: true,
      message: 'Transaction verified successfully',
      verificationStatus: 'Verified',
      transactionReference: 'trx_123456'
    },

    outputFields: [
      { key: 'id', label: 'Transaction Reference' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'verificationStatus', label: 'Verification Status' },
      { key: 'transactionReference', label: 'Transaction Reference' }
    ]
  }
};
