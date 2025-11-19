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
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // Authorization header injected globally via auth hook
    },
    body: new URLSearchParams(payload).toString()
  });

  const data = response.data;

  return {
    id: data.data.challengeId || null,
    status: data.status,
    message: data.message,
    challengeUrl: data.data.challengeUrl,
    challengePayload: data.data.challengePayload
    // Map fields as returned by your API response
  };
};

module.exports = {
  key: 'initiate_threeds_challenge',
  noun: '3DS Challenge',

  display: {
    label: 'Initiate 3DS Challenge',
    description: 'Starts a 3D Secure challenge request for cardholder authentication.'
  },

  operation: {
    inputFields: [
      { key: 'key', type: 'string', required: true, label: 'Key' },
      { key: 'value', type: 'string', required: true, label: 'Value' }
    ],

    perform,

    sample: {
      id: 'challenge_123',
      status: true,
      message: '3DS Challenge initiated',
      challengeUrl: 'https://acs.example.com/challenge',
      challengePayload: 'encodedPayloadString'
    },

    outputFields: [
      { key: 'id', label: 'Challenge ID' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'challengeUrl', label: 'Challenge URL' },
      { key: 'challengePayload', label: 'Challenge Payload' }
    ]
  }
};
