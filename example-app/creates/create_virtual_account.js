'use strict';

const perform = async (z, bundle) => {
  const body = {
    reference: bundle.inputData.reference,
    amount: bundle.inputData.amount,
    accountType: bundle.inputData.accountType,
    accountName: bundle.inputData.accountName,
    bankCode: bundle.inputData.bankCode,
    firstName: bundle.inputData.firstName,
    lastName: bundle.inputData.lastName,
    customerEmail: bundle.inputData.customerEmail,
    expiryInMinutes: bundle.inputData.expiryInMinutes
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/virtual-account',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${bundle.authData.secretKey}`
    },
    body: JSON.stringify(body)
  });

  return response.data;
};

module.exports = {
  key: 'create_virtual_account',
  noun: 'Virtual Account',

  display: {
    label: 'Create Virtual Account',
    description: 'Creates a virtual account with the given details through Novac API.'
  },

  operation: {
    inputFields: [
      { key: 'reference', label: 'Reference', required: true, type: 'string' },
      { key: 'amount', label: 'Amount', required: true, type: 'number' },
      { key: 'accountType', label: 'Account Type', required: true, type: 'string' },
      { key: 'accountName', label: 'Account Name', required: true, type: 'string' },
      { key: 'bankCode', label: 'Bank Code', required: true, type: 'string' },
      { key: 'firstName', label: 'First Name', required: true, type: 'string' },
      { key: 'lastName', label: 'Last Name', required: true, type: 'string' },
      { key: 'customerEmail', label: 'Customer Email', required: true, type: 'string' },
      { key: 'expiryInMinutes', label: 'Expiry In Minutes', required: false, type: 'integer' }
    ],

    perform,

    sample: {
      virtual_account_number: '1234567890',
      bank_code: '044',
      account_name: 'John Doe',
      amount: 5000,
      expiry_in_minutes: 60,
      status: 'active'
    },

    outputFields: [
      { key: 'virtual_account_number', label: 'Virtual Account Number' },
      { key: 'bank_code', label: 'Bank Code' },
      { key: 'account_name', label: 'Account Name' },
      { key: 'amount', label: 'Amount' },
      { key: 'expiry_in_minutes', label: 'Expiry Time in Minutes' },
      { key: 'status', label: 'Account Status' }
    ]
  }
};
