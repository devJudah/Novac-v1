'use strict';

const test = async (z, bundle) => {
  // Test using public key on a simple endpoint (e.g., get banks)
  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/ussd-getbanks',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

module.exports = {
  type: 'custom',
  fields: [
    {
      key: 'publicKey',
      label: 'API Public Key',
      required: true,
      type: 'string',
      helpText: 'Your Novac public API key (used for client-side calls).'
    },
    {
      key: 'secretKey',
      label: 'API Secret Key',
      required: true,
      type: 'string',
      helpText: 'Your Novac secret API key (used for server-side calls).'
    }
  ],
  test,
  connectionLabel: '{{publicKey}}' // or mask part of secretKey
};
