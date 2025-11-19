'use strict';

const perform = async (z, bundle) => {
  const reference = bundle.inputData.reference;

  const response = await z.request({
    url: `https://api.novacpayment.com/api/v1/transfers/${encodeURIComponent(reference)}`,
    method: 'GET',
    headers: {
      // Authorization handled globally
    },
  });

  return response.data;
};

module.exports = {
  key: 'retrieve_bank_transaction',
  noun: 'Bank Transaction',

  display: {
    label: 'Retrieve Bank Transaction',
    description: 'Retrieve details of a bank transaction by its reference.'
  },

  operation: {
    inputFields: [
      {
        key: 'reference',
        type: 'string',
        required: true,
        label: 'Transaction Reference'
      }
    ],

    perform,

    sample: {
      transactionReference: 'trx_123456',
      status: 'completed',
      amount: 100,
      currency: 'NGN',
      bankCode: '044',
      bankName: 'Access Bank',
      accountNumber: '1234567890',
      accountName: 'John Doe'
    },

    outputFields: [
      { key: 'transactionReference', label: 'Transaction Reference' },
      { key: 'status', label: 'Status' },
      { key: 'amount', label: 'Amount' },
      { key: 'currency', label: 'Currency' },
      { key: 'bankCode', label: 'Bank Code' },
      { key: 'bankName', label: 'Bank Name' },
      { key: 'accountNumber', label: 'Account Number' },
      { key: 'accountName', label: 'Account Name' }
    ]
  }
};
