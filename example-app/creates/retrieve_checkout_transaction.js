'use strict';

const perform = async (z, bundle) => {
  const transactionRef = bundle.inputData.transactionReference;

  const response = await z.request({
    url: `https://api.novacpayment.com/api/v1/checkout/transaction/${encodeURIComponent(transactionRef)}`,
    method: 'GET',
    headers: {
      // Authorization header added by auth hook or beforeRequest
    }
  });

  const data = response.data;

  return {
    id: data.data.transactionReference || transactionRef,
    status: data.status,
    message: data.message,
    transactionReference: data.data.transactionReference,
    amount: data.data.amount,
    currency: data.data.currency,
    paymentStatus: data.data.paymentStatus,
    paymentMethod: data.data.paymentMethod,
    paymentRedirectUrl: data.data.paymentRedirectUrl
    // Add other fields returned by your API as needed
  };
};

module.exports = {
  key: 'retrieve_checkout_transaction',
  noun: 'Checkout Transaction',

  display: {
    label: 'Retrieve Checkout Payment Transaction',
    description: 'Fetches a checkout payment transaction by its transaction reference.'
  },

  operation: {
    inputFields: [
      {
        key: 'transactionReference',
        type: 'string',
        required: true,
        label: 'Transaction Reference',
        helpText: 'The unique transaction reference to look up.'
      }
    ],

    perform,

    sample: {
      id: 'trx_12345',
      status: true,
      message: 'Transaction found successfully',
      transactionReference: 'trx_12345',
      amount: '1500',
      currency: 'NGN',
      paymentStatus: 'Completed',
      paymentMethod: 'Card',
      paymentRedirectUrl: 'https://checkout.novacpayment.com/pay/trx_12345'
    },

    outputFields: [
      { key: 'id', label: 'Transaction ID' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'transactionReference', label: 'Transaction Reference' },
      { key: 'amount', label: 'Amount' },
      { key: 'currency', label: 'Currency' },
      { key: 'paymentStatus', label: 'Payment Status' },
      { key: 'paymentMethod', label: 'Payment Method' },
      { key: 'paymentRedirectUrl', label: 'Payment Redirect URL' }
    ]
  }
};
