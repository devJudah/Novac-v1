'use strict';

const perform = async (z, bundle) => {
  const transactionRef = bundle.inputData.transactionReference;

  const response = await z.request({
    url: `https://api.novacpayment.com/api/v1/transaction/${encodeURIComponent(transactionRef)}/verify`,
    method: 'GET',
    headers: {
      // Authorization header added globally by auth hook or beforeRequest
    }
  });

  const data = response.data;

  return {
    id: data.data.transactionReference || transactionRef,
    status: data.status,
    message: data.message,
    verificationStatus: data.data.verificationStatus,  // Adjust based on API response
    transactionReference: data.data.transactionReference
  };
};

module.exports = {
  key: 'verify_transaction_by_reference',
  noun: 'Transaction Verification',

  display: {
    label: 'Verify Transaction by Reference',
    description: 'Verify payment transaction status using the transaction reference.'
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
      id: 'trx_123456',
      status: true,
      message: 'Transaction verified successfully',
      verificationStatus: 'Verified',
      transactionReference: 'trx_123456'
    },

    outputFields: [
      { key: 'id', label: 'Transaction ID' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'verificationStatus', label: 'Verification Status' },
      { key: 'transactionReference', label: 'Transaction Reference' }
    ]
  }
};
