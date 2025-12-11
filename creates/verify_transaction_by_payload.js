'use strict';

const perform = async (z, bundle) => {
  const body = {
    transactionReference: bundle.inputData.transactionReference,
    amount: bundle.inputData.amount,
    transactionType: bundle.inputData.transactionType,
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/transaction/verify',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = response.data;

  // If no transaction found, return a friendly message object instead of throwing
  if (
    response.status === 404 ||
    (data && data.status === false && data.message && data.message.toLowerCase().includes('no record'))
  ) {
    return {
      id: null,
      status: false,
      message: `Transaction not found: No transaction with reference "${bundle.inputData.transactionReference}" exists.`,
      verificationStatus: null,
      transactionReference: bundle.inputData.transactionReference,
    };
  }

  // For other HTTP errors, throw a proper error to Zapier (optional but recommended)
  if (![200, 201].includes(response.status) || (data && data.status === false)) {
    throw new z.errors.Error(
      `API error: ${response.status} - ${data.message || 'Unknown error'}`,
      'APIError',
      response.status
    );
  }

  // On successful response, return data as usual
  return {
    id: data.data.transactionReference || bundle.inputData.transactionReference,
    status: data.status,
    message: data.message,
    verificationStatus: data.data.verificationStatus || null,
    transactionReference: data.data.transactionReference,
  };
};

module.exports = {
  key: 'verify_transaction_by_payload',
  noun: 'Transaction Verification',

  display: {
    label: 'Verify Transaction by Payload',
    description: 'Verifies payment transaction details using Novac API.',
  },

  operation: {
    inputFields: [
      { key: 'transactionReference', type: 'string', required: true, label: 'Transaction Reference' },
      { key: 'amount', type: 'number', required: true, label: 'Amount' },
      { key: 'transactionType', type: 'string', required: true, label: 'Transaction Type' },
    ],

    perform,

    sample: {
      id: 'trx_123456',
      status: true,
      message: 'Transaction verified successfully',
      verificationStatus: 'Verified',
      transactionReference: 'trx_123456',
    },

    outputFields: [
      { key: 'id', label: 'Transaction Reference' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'verificationStatus', label: 'Verification Status' },
      { key: 'transactionReference', label: 'Transaction Reference' },
    ],
  },
};
