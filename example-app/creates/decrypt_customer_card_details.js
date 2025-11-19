'use strict';

const perform = async (z, bundle) => {
  const body = {
    encryptedData: bundle.inputData.encryptedData,
    reference: bundle.inputData.reference
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/decrypt-data',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // Authorization header applied globally via auth or hooks
    },
    body: JSON.stringify(body)
  });

  const data = response.data;

  return {
    id: data.data.reference || bundle.inputData.reference,
    status: data.status,
    message: data.message,
    decryptedData: data.data.decryptedData // Adjust field name based on API response structure
  };
};

module.exports = {
  key: 'decrypt_customer_card_details',
  noun: 'Customer Card Details Decryption',

  display: {
    label: 'Decrypt Customer Card Details',
    description: 'Decrypts previously encrypted customer card data securely using Novac API.'
  },

  operation: {
    inputFields: [
      { key: 'encryptedData', type: 'string', required: true, label: 'Encrypted Data' },
      { key: 'reference', type: 'string', required: true, label: 'Reference' }
    ],

    perform,

    sample: {
      id: 'ref_12345',
      status: true,
      message: 'Card details decrypted successfully',
      decryptedData: {
        number: '4111111111111111',
        expiryMonth: '12',
        expiryYear: '2030',
        cvv: '123',
        pin: '1234'
      }
    },

    outputFields: [
      { key: 'id', label: 'Reference' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'decryptedData', label: 'Decrypted Card Data' }
    ]
  }
};
