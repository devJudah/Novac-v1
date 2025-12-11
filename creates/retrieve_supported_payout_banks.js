'use strict';

const perform = async (z, bundle) => {
  const countryCode = bundle.inputData.countryCode;

  const response = await z.request({
    url: `https://api.novacpayment.com/api/v1/banks/${encodeURIComponent(countryCode)}`,
    method: 'GET',
    headers: {
      // Authorization header handled globally via auth
    }
  });

  return response.data;
};

module.exports = {
  key: 'retrieve_supported_payout_banks',
  noun: 'Payout Banks',

  display: {
    label: 'Retrieve Supported Payout Banks',
    description: 'Retrieves the list of supported payout banks filtered by country code.'
  },

  operation: {
    inputFields: [
      {
        key: 'countryCode',
        type: 'string',
        required: true,
        label: 'Country Code (e.g., NG, US)'
      }
    ],

    perform,

    sample: {
      banks: [
        {
          bankCode: '044',
          bankName: 'Access Bank'
        },
        {
          bankCode: '063',
          bankName: 'Diamond Bank'
        }
      ]
    },

    outputFields: [
      { key: 'banks[]bankCode', label: 'Bank Code' },
      { key: 'banks[]bankName', label: 'Bank Name' }
    ]
  }
};
