'use strict';

const perform = async (z, bundle) => {
  const body = {
    reference: bundle.inputData.reference,
    otp: bundle.inputData.otp
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/direct-card-charge-auth',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // Authorization should be handled by the app's auth settings
    },
    body: JSON.stringify(body)
  });

  return response.data;
};

module.exports = {
  key: 'direct_card_charge_authentication',
  noun: 'Direct Card Charge Authentication',

  display: {
    label: 'Direct Card Charge Authentication',
    description: 'Authenticate a direct card charge by submitting a reference and OTP.'
  },

  operation: {
    inputFields: [
      { key: 'reference', type: 'string', required: true, label: 'Reference' },
      { key: 'otp', type: 'string', required: true, label: 'OTP' }
    ],

    perform,

    sample: {
      status: 'authenticated',
      message: 'Card charge authenticated successfully',
      reference: 'ref_123456'
    },

    outputFields: [
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'reference', label: 'Reference' }
    ]
  }
};
