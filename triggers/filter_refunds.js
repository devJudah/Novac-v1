'use strict';

const { DateTime } = require('luxon');

const perform = async (z, bundle) => {
  const { startDate, endDate } = bundle.inputData;

  const response = await z.request({
    url: `https://api.novacpayment.com/api/v1/refund/${startDate}/${endDate}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${bundle.authData.secretKey}`,
    },
  });

  const data = response.data;

  if (!Array.isArray(data)) {
    if (data.status === true && data.message && data.message.includes('no record found')) {
      return [];
    }
    return [data];
  }

  return data.map(item => ({
    id: item.refund_reference || item.id || item.transaction_reference || JSON.stringify(item),
    ...item
  }));
};


module.exports = {
  key: 'filter_refunds',
  noun: 'Refund',

  display: {
    label: 'Filtered Refunds',
    description: 'Triggers when refunds are created or updated between specified start and end dates (max 7 days).'
  },

  operation: {
    inputFields: [
      {
        key: 'startDate',
        label: 'Start Date',
        required: true,
        type: 'string',
        helpText: 'Start date (yyyy-MM-dd), max 7 days gap with End Date.'
      },
      {
        key: 'endDate',
        label: 'End Date',
        required: true,
        type: 'string',
        helpText: 'End date (yyyy-MM-dd), max 7 days gap with Start Date.'
      }
    ],

    perform,

    sample: {
      refund_reference: 'refund_001',
      amount: 150,
      status: 'completed',
      created_at: '2025-11-01T12:00:00Z',
      customer_note: 'Customer requested refund.',
      merchant_note: 'Refund approved.'
    },

    outputFields: [
      { key: 'refund_reference', label: 'Refund Reference' },
      { key: 'amount', label: 'Amount' },
      { key: 'status', label: 'Status' },
      { key: 'created_at', label: 'Created At' },
      { key: 'customer_note', label: 'Customer Note' },
      { key: 'merchant_note', label: 'Merchant Note' }
    ]
  }
};
