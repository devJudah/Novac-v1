'use strict';

const perform = async (z, bundle) => {
  const payload = {
    data: JSON.stringify({
      key: bundle.inputData.key,
      value: [bundle.inputData.value]
    })
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/threedschallenge',
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
      // Authorization header managed globally
    },
    body: new URLSearchParams(payload).toString()
  });

  return response.data;
};

module.exports = {
  key: 'retrieve_3_ds_challenge_status',
  noun: '3DS Challenge Status',

  display: {
    label: 'Retrieve 3DS Challenge Status',
    description: 'Retrieves the current status of a 3DS challenge using Novac API.'
  },

  operation: {
    inputFields: [
      {
        key: 'key',
        type: 'string',
        required: true,
        label: 'Key'
      },
      {
        key: 'value',
        type: 'string',
        required: true,
        label: 'Value'
      }
    ],

    perform,

    sample: {
      status: 'completed',
      challengeId: '123456',
      result: 'successful'
    },

    outputFields: [
      { key: 'status', label: 'Status' },
      { key: 'challengeId', label: 'Challenge ID' },
      { key: 'result', label: 'Result' }
      // Add other expected output fields as needed
    ]
  }
};
