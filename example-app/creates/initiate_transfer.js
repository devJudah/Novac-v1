'use strict';

const perform = async (z, bundle) => {
  const body = {
    currency: bundle.inputData.currency,
    amount: bundle.inputData.amount,
    bankCode: bundle.inputData.bankCode,
    bankName: bundle.inputData.bankName,
    accountNumber: bundle.inputData.accountNumber,
    accountName: bundle.inputData.accountName,
    narration: bundle.inputData.narration,
    reference: bundle.inputData.reference,
    metaData: bundle.inputData.metaData
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/transfers',
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
  key: 'initiate_transfer',
  noun: 'Transfer',

  display: {
    label: 'Initiate a Transfer',
    description: 'Initiate a payout or bank transfer using Novac API.'
  },

  operation: {
    inputFields: [
      { key: 'currency', type: 'string', required: true, label: 'Currency' },
      { key: 'amount', type: 'number', required: true, label: 'Amount' },
      { key: 'bankCode', type: 'string', required: true, label: 'Bank Code' },
      { key: 'bankName', type: 'string', required: true, label: 'Bank Name' },
      { key: 'accountNumber', type: 'string', required: true, label: 'Account Number' },
      { key: 'accountName', type: 'string', required: true, label: 'Account Name' },
      { key: 'narration', type: 'string', required: true, label: 'Narration' },
      { key: 'reference', type: 'string', required: true, label: 'Reference' },
      { key: 'metaData', type: 'string', required: false, label: 'Meta Data' }
    ],

    perform,

    sample: {
      status: 'success',
      transferId: 'transfer_123456',
      amount: 123,
      currency: 'USD'
    },

    outputFields: [
      { key: 'status', label: 'Status' },
      { key: 'transferId', label: 'Transfer ID' },
      { key: 'amount', label: 'Amount' },
      { key: 'currency', label: 'Currency' }
    ]
  }
};
