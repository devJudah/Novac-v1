'use strict';

const perform = async (z, bundle) => {
  const body = {
    businessId: bundle.inputData.businessId,
    amount: bundle.inputData.amount,
    currency: bundle.inputData.currency,
    transactionType: bundle.inputData.transactionType,
    enforceSecureAuth: bundle.inputData.enforceSecureAuth,
    cardData: {
      number: bundle.inputData.cardNumber,
      expiryMonth: bundle.inputData.expiryMonth,
      expiryYear: bundle.inputData.expiryYear,
      cvv: bundle.inputData.cvv,
      pin: bundle.inputData.pin
    },
    metadata: bundle.inputData.metadata || null
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v3/direct-card-charge-internal',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // Authorization header handled globally via auth or hooks
    },
    body: JSON.stringify(body)
  });

  const data = response.data;

  return {
    id: data.data.reference || null,
    status: data.status,
    message: data.message,
    reference: data.data.reference,
    paymentStatus: data.data.paymentStatus,
    secureAuthRequired: data.data.secureAuthRequired,
    redirectUrl: data.data.redirectUrl
    // Add other relevant fields from your API response
  };
};

module.exports = {
  key: 'direct_card_charge_internal_v3',
  noun: 'Direct Card Charge Internal V3',

  display: {
    label: 'Direct Card Charge Internal V3',
    description: 'Performs a direct card charge using the internal v3 Novac API endpoint.'
  },

  operation: {
    inputFields: [
      { key: 'businessId', type: 'integer', required: true, label: 'Business ID' },
      { key: 'amount', type: 'number', required: true, label: 'Amount' },
      { key: 'currency', type: 'string', required: true, label: 'Currency' },
      { key: 'transactionType', type: 'string', required: true, label: 'Transaction Type' },
      { key: 'enforceSecureAuth', type: 'boolean', required: true, label: 'Enforce Secure Authentication' },
      { key: 'cardNumber', type: 'string', required: true, label: 'Card Number' },
      { key: 'expiryMonth', type: 'string', required: true, label: 'Expiry Month' },
      { key: 'expiryYear', type: 'string', required: true, label: 'Expiry Year' },
      { key: 'cvv', type: 'string', required: true, label: 'CVV' },
      { key: 'pin', type: 'string', required: true, label: 'Card PIN' },
      { key: 'metadata', type: 'string', required: false, label: 'Metadata' }
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
