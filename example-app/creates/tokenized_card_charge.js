'use strict';

const perform = async (z, bundle) => {
  const body = {
    token: bundle.inputData.token,
    currency: bundle.inputData.currency,
    amount: bundle.inputData.amount,
    email: bundle.inputData.email,
    firstName: bundle.inputData.firstName,
    lastName: bundle.inputData.lastName,
    reference: bundle.inputData.reference
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/tokenized-card-charge',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // Authorization handled globally
    },
    body: JSON.stringify(body)
  });

  const data = response.data;

  return {
    id: data.data.reference || bundle.inputData.reference,
    status: data.status,
    message: data.message,
    reference: data.data.reference,
    paymentStatus: data.data.paymentStatus,
    authCode: data.data.authCode,
    // Add any other relevant response fields here
  };
};

module.exports = {
  key: 'tokenized_card_charge',
  noun: 'Tokenized Card Charge',

  display: {
    label: 'Charge Tokenized Card',
    description: 'Charges a tokenized card using the Novac API.'
  },

  operation: {
    inputFields: [
      { key: 'token', type: 'string', required: true, label: 'Token' },
      { key: 'currency', type: 'string', required: true, label: 'Currency' },
      { key: 'amount', type: 'number', required: true, label: 'Amount' },
      { key: 'email', type: 'string', required: true, label: 'Customer Email' },
      { key: 'firstName', type: 'string', required: true, label: 'Customer First Name' },
      { key: 'lastName', type: 'string', required: true, label: 'Customer Last Name' },
      { key: 'reference', type: 'string', required: true, label: 'Transaction Reference' }
    ],

    perform,

    sample: {
      id: 'ref_12345',
      status: true,
      message: 'Charge successful',
      reference: 'ref_12345',
      paymentStatus: 'Success',
      authCode: 'AUTH1234'
    },

    outputFields: [
      { key: 'id', label: 'Reference' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'reference', label: 'Reference' },
      { key: 'paymentStatus', label: 'Payment Status' },
      { key: 'authCode', label: 'Authorization Code' }
    ]
  }
};
