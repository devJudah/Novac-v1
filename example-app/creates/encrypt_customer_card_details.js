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
      // Authorization headers injected through auth or beforeRequest hook
    },
    body: JSON.stringify(body)
  });

  const data = response.data;

  return {
    id: data.data.reference || bundle.inputData.reference,
    status: data.status,
    message: data.message,
    encryptedData: data.data.encryptedData  // Adjust as per your API's exact field name
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
      id: 'ref_1234',
      status: true,
      message: 'Card details encrypted successfully',
      encryptedData: 'some_encrypted_string_here'
    },

    outputFields: [
      { key: 'id', label: 'Reference' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'encryptedData', label: 'Encrypted Data' }
    ]
  }
};
