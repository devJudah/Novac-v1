'use strict';

const perform = async (z, bundle) => {
  const body = {
    cardNumber: bundle.inputData.cardNumber,
    expiryMonth: bundle.inputData.expiryMonth,
    expiryYear: bundle.inputData.expiryYear,
    cvv: bundle.inputData.cvv,
    cardPin: bundle.inputData.cardPin,
    transactionReference: bundle.inputData.transactionReference
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/card-payment',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // Authorization header injected by auth or beforeRequest hook
    },
    body: JSON.stringify(body)
  });

  const data = response.data;

  return {
    id: data.data.transactionReference || bundle.inputData.transactionReference,
    status: data.status,
    message: data.message,
    transactionReference: data.data.transactionReference,
    paymentStatus: data.data.paymentStatus,
    authCode: data.data.authCode,
    // Add any other relevant fields your API responds with
  };
};

module.exports = {
  key: 'complete_card_payment',
  noun: 'Card Payment',

  display: {
    label: 'Complete Card Payment',
    description: 'Completes a card payment using Novac API.'
  },

  operation: {
    inputFields: [
      { key: 'cardNumber', type: 'string', required: true, label: 'Card Number' },
      { key: 'expiryMonth', type: 'string', required: true, label: 'Expiry Month' },
      { key: 'expiryYear', type: 'string', required: true, label: 'Expiry Year' },
      { key: 'cvv', type: 'string', required: true, label: 'CVV' },
      { key: 'cardPin', type: 'string', required: true, label: 'Card PIN' },
      { key: 'transactionReference', type: 'string', required: true, label: 'Transaction Reference' }
    ],

    perform,

    sample: {
      id: 'trx_123456',
      status: true,
      message: 'Card payment completed successfully',
      transactionReference: 'trx_123456',
      paymentStatus: 'Success',
      authCode: 'AUTH1234'
    },

    outputFields: [
      { key: 'id', label: 'Transaction ID' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'transactionReference', label: 'Transaction Reference' },
      { key: 'paymentStatus', label: 'Payment Status' },
      { key: 'authCode', label: 'Authorization Code' }
    ]
  }
};
