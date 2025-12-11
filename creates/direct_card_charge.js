'use strict';

const perform = async (z, bundle) => {
  const body = {
    amount: bundle.inputData.amount,
    card: bundle.inputData.card,
    currency: bundle.inputData.currency,
    reference: bundle.inputData.reference,
    email: bundle.inputData.email,
    transactionType: bundle.inputData.transactionType,
    enforceSecureAuth: bundle.inputData.enforceSecureAuth,
    redirectUrl: bundle.inputData.redirectUrl,
    metaData: bundle.inputData.metaData || null
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/direct-card-charge',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // Authorization header usually handled by app auth or beforeRequest hook
    },
    body: JSON.stringify(body)
  });

  const data = response.data;

  return {
    id: data.data.reference || bundle.inputData.reference,
    status: data.status,
    message: data.message,
    reference: data.data.reference,
    paymentStatus: data.data.paymentStatus,
    secureAuthRequired: data.data.secureAuthRequired,
    redirectUrl: data.data.redirectUrl
    // Add any other response fields your API returns relevant to the charge
  };
};

module.exports = {
  key: 'direct_card_charge',
  noun: 'Direct Card Charge',

  display: {
    label: 'Direct Card Charge',
    description: 'Performs a direct card charge with support for secure authentication via Novac API.'
  },

  operation: {
    inputFields: [
      { key: 'amount', type: 'number', required: true, label: 'Amount' },
      { key: 'card', type: 'string', required: true, label: 'Card Number or Token' },
      { key: 'currency', type: 'string', required: true, label: 'Currency' },
      { key: 'reference', type: 'string', required: true, label: 'Reference' },
      { key: 'email', type: 'string', required: true, label: 'Customer Email' },
      { key: 'transactionType', type: 'string', required: true, label: 'Transaction Type' },
      { key: 'enforceSecureAuth', type: 'boolean', required: true, label: 'Enforce Secure Authentication' },
      { key: 'redirectUrl', type: 'string', required: true, label: 'Redirect URL' },
      { key: 'metaData', type: 'string', required: false, label: 'Metadata' }
    ],

    perform,

    sample: {
      id: 'ref_123456',
      status: true,
      message: 'Charge successful',
      reference: 'ref_123456',
      paymentStatus: 'Success',
      secureAuthRequired: false,
      redirectUrl: 'https://example.com/redirect'
    },

    outputFields: [
      { key: 'id', label: 'Reference' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'reference', label: 'Reference' },
      { key: 'paymentStatus', label: 'Payment Status' },
      { key: 'secureAuthRequired', label: 'Secure Authentication Required' },
      { key: 'redirectUrl', label: 'Redirect URL' }
    ]
  }
};
