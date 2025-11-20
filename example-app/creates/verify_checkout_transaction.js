'use strict';

const perform = async (z, bundle) => {
  const transactionRef = bundle.inputData.transactionReference;

  const response = await z.request({
    url: `https://api.novacpayment.com/api/v1/checkout/${encodeURIComponent(transactionRef)}/verify`,
    method: 'GET',
    headers: {
      // Authorization header will be handled globally
    }
  });

  const data = response.data;

  return {
    id: data.data.transactionReference || transactionRef,
    status: data.status,
    message: data.message,
    transactionReference: data.data.transactionReference,
    verificationStatus: data.data.verificationStatus,
  };
};

module.exports = {
  key: 'verify_checkout_transaction',
  noun: 'Checkout Transaction Verification',

  display: {
    label: 'Verify Checkout Payment',
    description: 'Verify the status of a checkout payment transaction by its reference.'
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
      id: 'trx_12345',
      status: true,
      message: 'Transaction verified successfully',
      transactionReference: 'trx_12345',
      verificationStatus: 'verified'
    },

    outputFields: [
      { key: 'id', label: 'Transaction ID' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'transactionReference', label: 'Transaction Reference' },
      { key: 'verificationStatus', label: 'Verification Status' }
    ]
  }
};
