'use strict';

const perform = async (z, bundle) => {
  const accountNumber = bundle.inputData.accountNumber;

  const response = await z.request({
    url: `https://api.novacpayment.com/api/v1/virtual-accounts/${encodeURIComponent(accountNumber)}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bundle.authData.secretKey}`
    }
  });

  return response.data;
};

module.exports = {
  key: 'get_virtual_account',
  noun: 'Virtual Account',

  display: {
    label: 'Get Virtual Account',
    description: 'Retrieve details of a virtual account by account number.'
  },

  operation: {
    inputFields: [
      {
        key: 'accountNumber',
        label: 'Account Number',
        required: true,
        type: 'string',
        helpText: 'The virtual account number to retrieve.'
      }
    ],

    perform,

    sample: {
      account_number: '1234567890',
      bank_code: '044',
      account_name: 'John Doe',
      status: 'active',
      balance: 5000,
      currency: 'NGN'
    },

    outputFields: [
      { key: 'account_number', label: 'Account Number' },
      { key: 'bank_code', label: 'Bank Code' },
      { key: 'account_name', label: 'Account Name' },
      { key: 'status', label: 'Account Status' },
      { key: 'balance', label: 'Account Balance' },
      { key: 'currency', label: 'Currency' }
    ]
  }
};
