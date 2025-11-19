'use strict';

const perform = async (z, bundle) => {
  const reference = bundle.inputData.reference;

  const response = await z.request({
    url: `https://api.novacpayment.com/api/v1/virtual-account/${encodeURIComponent(reference)}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bundle.authData.secretKey}`
    }
  });

  return response.data;
};

module.exports = {
  key: 'get_virtual_account_by_reference',
  noun: 'Virtual Account',

  display: {
    label: 'Get Virtual Account by Reference',
    description: 'Retrieve details of a virtual account by its unique reference.'
  },

  operation: {
    inputFields: [
      {
        key: 'reference',
        label: 'Reference',
        required: true,
        type: 'string',
        helpText: 'The unique reference of the virtual account to retrieve.'
      }
    ],

    perform,

    sample: {
      account_number: '1234567890',
      bank_code: '044',
      account_name: 'John Doe',
      reference: 'ref_123456',
      status: 'active',
      balance: 5000,
      currency: 'NGN'
    },

    outputFields: [
      { key: 'account_number', label: 'Account Number' },
      { key: 'bank_code', label: 'Bank Code' },
      { key: 'account_name', label: 'Account Name' },
      { key: 'reference', label: 'Reference' },
      { key: 'status', label: 'Account Status' },
      { key: 'balance', label: 'Account Balance' },
      { key: 'currency', label: 'Currency' }
    ]
  }
};
