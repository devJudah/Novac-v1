'use strict';

const perform = async (z, bundle) => {
  // Build the request body from input fields
  const body = {
    transactionReference: bundle.inputData.transactionReference,
    bankCode: bundle.inputData.bankCode
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/ussd-payment',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // Authorization header injected globally from auth or beforeRequest hook
    },
    body: JSON.stringify(body)
  });

  const data = response.data;

  // Return the whole response or extract key fields as needed
  return {
    id: data.data.transactionReference || bundle.inputData.transactionReference,
    status: data.status,
    message: data.message,
    transactionReference: data.data.transactionReference,
    paymentUssdCode: data.data.paymentUssdCode,  // Example expected field from API
    // Include any other relevant fields in your API response
  };
};

module.exports = {
  key: 'create_ussd_payment',
  noun: 'USSD Payment',

  display: {
    label: 'Create USSD Payment',
    description: 'Initiates a USSD payment transaction using Novac API.'
  },

  operation: {
    inputFields: [
      {
        key: 'transactionReference',
        type: 'string',
        required: true,
        label: 'Transaction Reference',
        helpText: 'Unique reference for the payment transaction.'
      },
      {
        key: 'bankCode',
        type: 'string',
        required: true,
        label: 'Bank Code',
        helpText: 'Code of the bank for USSD payment.'
      }
    ],

    perform,

    sample: {
      id: 'trx123456789',
      status: true,
      message: 'USSD Payment Initiated successfully',
      transactionReference: 'trx123456789',
      paymentUssdCode: '*123*1#'
    },

    outputFields: [
      { key: 'id', label: 'Transaction ID' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'transactionReference', label: 'Transaction Reference' },
      { key: 'paymentUssdCode', label: 'USSD Payment Code' }
    ]
  }
};
