'use strict';

const perform = async (z, bundle) => {
  const body = {
    cardNumber: bundle.inputData.cardNumber,
    expiryMonth: bundle.inputData.expiryMonth,
    expiryYear: bundle.inputData.expiryYear,
    cvv: bundle.inputData.cvv,
    cardPin: bundle.inputData.cardPin,
    transactionReference: bundle.inputData.transactionReference,
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/card-payment',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization header injected by auth or beforeRequest hook
    },
    body: JSON.stringify(body),
    
  });
  const data = response.data;


  // try {
  //   // Zapier may or may not parse JSON; try response.data or parse response.content
  //   data = response.data || JSON.parse(response.content);
  // } catch (err) {
  //   throw new z.errors.Error('Invalid JSON response from payment API');
  // }

  // if (response.status >= 400 || data.status === false) {
  //   throw new z.errors.Error(
  //     data.friendlyMessage || data.message || 'Payment failed',
  //     'PaymentError',
  //     response.status,
  //   );
  // }

  return {
    id: bundle.inputData.transactionReference,
    status: data.status,
    message: data.message,
    authMode: data.data.authMode,
    authAction: data.data.authAction,
    authEndpoint: data.data.authEndpoint,
    authMessage: data.data.authMessage,
    friendlyMessage: data.data.friendlyMessage,
    redirectUrl: data.data.redirectUrl,
  };
};

module.exports = {
  key: 'complete_card_payment',
  noun: 'Card Payment',

  display: {
    label: 'Complete Card Payment',
    description: 'Completes a card payment using Novac API.',
  },

  operation: {
    inputFields: [
      { key: 'cardNumber', type: 'string', required: true, label: 'Card Number' },
      { key: 'expiryMonth', type: 'string', required: true, label: 'Expiry Month' },
      { key: 'expiryYear', type: 'string', required: true, label: 'Expiry Year' },
      { key: 'cvv', type: 'string', required: true, label: 'CVV' },
      { key: 'cardPin', type: 'string', required: true, label: 'Card PIN' },
      { key: 'transactionReference', type: 'string', required: true, label: 'Transaction Reference' },
    ],

    perform,

    sample: {
      id: 'trx_123456',
      status: true,
      message: 'Transaction successful',
      authMode: 'no-auth',
      authAction: 'none',
      authEndpoint: 'none',
      authMessage: 'Transaction Completed',
      friendlyMessage: '',
      redirectUrl: '',
    },

    outputFields: [
      { key: 'id', label: 'Transaction Reference' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'authMode', label: 'Auth Mode' },
      { key: 'authAction', label: 'Auth Action' },
      { key: 'authEndpoint', label: 'Auth Endpoint' },
      { key: 'authMessage', label: 'Auth Message' },
      { key: 'friendlyMessage', label: 'Friendly Message' },
      { key: 'redirectUrl', label: 'Redirect URL' },
    ],
  },
};
