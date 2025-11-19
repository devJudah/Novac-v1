'use strict';

const perform = async (z, bundle) => {
  const body = {
    bank_code: bundle.inputData.bank_code,
    account_number: bundle.inputData.account_number,
    currency: bundle.inputData.currency
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/banks/account/verify',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // Authorization handled globally
    },
    body: JSON.stringify(body)
  });

  return response.data;
};

module.exports = {
  key: 'verify_bank_account',
  noun: 'Bank Account Verification',

  display: {
    label: 'Verify Bank Account',
    description: 'Verifies a bank account by bank code, account number, and currency.'
  },

  operation: {
    inputFields: [
      { key: 'bank_code', type: 'string', required: true, label: 'Bank Code' },
      { key: 'account_number', type: 'string', required: true, label: 'Account Number' },
      { key: 'currency', type: 'string', required: true, label: 'Currency' }
    ],

    perform,

    sample: {
      status: 'verified',
      account_name: 'John Doe',
      bank_code: '044',
      account_number: '1234567890'
    },

    outputFields: [
      { key: 'status', label: 'Verification Status' },
      { key: 'account_name', label: 'Account Name' },
      { key: 'bank_code', label: 'Bank Code' },
      { key: 'account_number', label: 'Account Number' }
    ]
  }
};
