'use strict';

const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/ussd-getbanks',
    method: 'GET',
    headers: {
      Authorization: bundle.authData.apiKey
    }
  });

  // Response shape:
  // {
  //   status: true,
  //   message: "Successful",
  //   data: {
  //     bankDetails: [ { bank_name, bank_code, ussd_string }, ... ]
  //   }
  // }

  const bankDetails =
    response.data &&
    response.data.data &&
    Array.isArray(response.data.data.bankDetails)
      ? response.data.data.bankDetails
      : [];

  // Map each bank to include an `id` field (Zapier requires this)
  const banksArray = bankDetails.map((bank, index) => ({
    id: bank.bank_code || String(index),         // primary key for Zapier
    bank_name: bank.bank_name,
    bank_code: bank.bank_code,
    ussd_string: bank.ussd_string
  }));

  return banksArray;
};

module.exports = {
  key: 'get_banks',
  noun: 'Bank',

  display: {
    label: 'New Bank',
    description: 'Triggers when Novac returns bank details.'
  },

  operation: {
    perform,

    inputFields: [],

    sample: {
      id: '000',
      bank_name: 'Test Bank 1',
      bank_code: '000',
      ussd_string: '*123*1#'
    },

    outputFields: [
      { key: 'id', label: 'Bank ID' },
      { key: 'bank_name', label: 'Bank Name' },
      { key: 'bank_code', label: 'Bank Code' },
      { key: 'ussd_string', label: 'USSD String' }
    ]
  }
};
