'use strict';

const perform = async (z, bundle) => {
  const body = {
    reference: bundle.inputData.reference,
    otp: bundle.inputData.otp
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/card/validate-otp',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // Authorization header added by auth or beforeRequest hook
    },
    body: JSON.stringify(body)
  });

  const data = response.data;

  return {
    id: data.data.reference || bundle.inputData.reference,
    status: data.status,
    message: data.message,
    validationStatus: data.data.validationStatus // Assuming such a field exists in response
    // Add more fields here as returned by your API
  };
};

module.exports = {
  key: 'validate_customer_card_details',
  noun: 'Card OTP Validation',

  display: {
    label: 'Validate Customer Card OTP',
    description: 'Validates a customers card OTP code to verify the card details with Novac API.'
  },

  operation: {
    inputFields: [
      {
        key: 'reference',
        type: 'string',
        required: true,
        label: 'Reference',
        helpText: 'Transaction or validation reference string.'
      },
      {
        key: 'otp',
        type: 'string',
        required: true,
        label: 'OTP',
        helpText: 'One-time password sent to customer for card validation.'
      }
    ],

    perform,

    sample: {
      id: 'ref_123456',
      status: true,
      message: 'OTP validated successfully',
      validationStatus: 'validated'
    },

    outputFields: [
      { key: 'id', label: 'Reference' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'validationStatus', label: 'Validation Status' }
    ]
  }
};
