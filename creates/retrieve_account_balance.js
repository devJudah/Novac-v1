'use strict';

const perform = async (z, bundle) => {
  const currency = bundle.inputData.currency;

  const response = await z.request({
    url: `https://api.novacpayment.com/api/v1/balance/${encodeURIComponent(currency)}`,
    method: 'GET',
    headers: {
      // Authorization handled globally
    },
  });

  return response.data;
};

module.exports = {
  key: 'retrieve_account_balance',
  noun: 'Account Balance',

  display: {
    label: 'Retrieve Account Balance',
    description: 'Retrieves the current account balance for a specified currency.'
  },

  operation: {
    inputFields: [
      {
        key: 'currency',
        type: 'string',
        required: true,
        label: 'Currency (e.g., NGN, USD)'
      }
    ],

    perform,

    sample: {
      balance: 150000,
      currency: 'NGN',
      availableBalance: 140000
    },

    outputFields: [
      { key: 'balance', label: 'Balance' },
      { key: 'currency', label: 'Currency' },
      { key: 'availableBalance', label: 'Available Balance' }
    ]
  }
};
