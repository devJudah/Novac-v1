'use strict';

const perform = async (z, bundle) => {
  const body = {
    data: {
      number: bundle.inputData.number,
      expiryMonth: bundle.inputData.expiryMonth,
      expiryYear: bundle.inputData.expiryYear,
      cvv: bundle.inputData.cvv,
      pin: bundle.inputData.pin
    },
    reference: bundle.inputData.reference
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/encrypt-data',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // Authorization headers injected through auth or beforeRequest hook if required
    },
    body: JSON.stringify(body)
  });

  // The API returns the encrypted string as plain text in response.content
  const encryptedString = response.content;

  return {
    id: bundle.inputData.reference,
    status: true,
    message: 'Card details encrypted successfully',
    encryptedData: encryptedString
  };
};

module.exports = {
  key: 'encrypt_customer_card_details',
  noun: 'Customer Card Details Encryption',

  display: {
    label: 'Encrypt Customer Card Details',
    description: 'Encrypts sensitive card details securely using Novac API.'
  },

  operation: {
    inputFields: [
      { key: 'number', type: 'string', required: true, label: 'Card Number' },
      { key: 'expiryMonth', type: 'string', required: true, label: 'Expiry Month' },
      { key: 'expiryYear', type: 'string', required: true, label: 'Expiry Year' },
      { key: 'cvv', type: 'string', required: true, label: 'CVV' },
      { key: 'pin', type: 'string', required: true, label: 'Card PIN' },
      { key: 'reference', type: 'string', required: true, label: 'Reference' }
    ],

    perform,

    sample: {
      id: 'encrypt_ref_123456789101112',
      status: true,
      message: 'Card details encrypted successfully',
      encryptedData: 'cf7b17f856aedd58d657ba9d1ca99374994c696060897fd599e29e921d799f65e...'
    },

    outputFields: [
      { key: 'id', label: 'Reference' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'encryptedData', label: 'Encrypted Data' }
    ]
  }
};
