'use strict';

const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/virtual-accounts/bank-list',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bundle.authData.secretKey}`,
    },
  });

  // Assume response.data is the array of bank objects
  return response.data;
};

module.exports = {
  key: 'get_virtual_account_banks',
  noun: 'Virtual Account Bank',

  display: {
    label: 'Get Virtual Account Bank List',
    description: 'Retrieve the list of virtual account banks from Novac Payment API.'
  },

  operation: {
    perform,

    sample: {
      bank_code: '044',
      bank_name: 'Access Bank',
      country: 'NG'
    },

    outputFields: [
      { key: 'bank_code', label: 'Bank Code' },
      { key: 'bank_name', label: 'Bank Name' },
      { key: 'country', label: 'Country' }
    ]
  }
};
