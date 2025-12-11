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

  // The API returns plain text JSON string, parse it
  const data = JSON.parse(response.content);

  return {
    id: bundle.inputData.reference,
    number: data.number,
    expiryMonth: data.expiryMonth,
    expiryYear: data.expiryYear,
    cvv: data.cvv,
    pin: data.pin,
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
      { key: 'number', label: 'Card Number' },
      { key: 'expiryMonth', label: 'Expiry Month' },
      { key: 'expiryYear', label: 'Expiry Year' },
      { key: 'cvv', label: 'CVV' },
      { key: 'pin', label: 'PIN' },
    ]
  }
};
