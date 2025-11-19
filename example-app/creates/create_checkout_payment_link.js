'use strict';

const perform = async (z, bundle) => {
  const body = {
    paymentLinkReference: bundle.inputData.paymentLinkReference,
    amount: bundle.inputData.amount,
    currency: bundle.inputData.currency,
    metaData: bundle.inputData.metaData || null,
    redirectUrl: bundle.inputData.redirectUrl || null,
    checkoutCustomerData: {
      email: bundle.inputData.customer_email,
      firstName: bundle.inputData.customer_firstName,
      lastName: bundle.inputData.customer_lastName,
      phoneNumber: bundle.inputData.customer_phoneNumber || null
    },
    checkoutCustomizationData: {
      logoUrl: bundle.inputData.customization_logoUrl || null,
      paymentDescription: bundle.inputData.customization_paymentDescription || null,
      checkoutModalTitle: bundle.inputData.customization_checkoutModalTitle || null
    }
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/paymentlink/initiate',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // Authorization header is added by beforeRequest or auth hook
    },
    body: JSON.stringify(body)
  });

  const data = response.data;

  return {
    id: data.data.transactionReference,
    status: data.status,
    message: data.message,
    transactionReference: data.data.transactionReference,
    amount: data.data.amount,
    statusCode: data.data.statusCode,
    statusMessage: data.data.statusMessage,
    publicKey: data.data.publicKey,
    paymentRedirectUrl: data.data.paymentRedirectUrl
  };
};

module.exports = {
  key: 'create_checkout_payment_link',
  noun: 'Checkout Payment',

  display: {
    label: 'Create Checkout Payment Link',
    description: 'Creates a payment link and initiates a checkout payment with Novac.'
  },

  operation: {
    inputFields: [
      { key: 'paymentLinkReference', type: 'string', required: true, label: 'Payment Link Reference' },
      { key: 'amount', type: 'number', required: true, label: 'Amount' },
      { key: 'currency', type: 'string', required: true, label: 'Currency' },
      { key: 'metaData', type: 'string', required: false, label: 'Metadata' },
      { key: 'redirectUrl', type: 'string', required: false, label: 'Redirect URL' },

      // Customer data fields
      { key: 'customer_email', type: 'string', required: true, label: 'Customer Email' },
      { key: 'customer_firstName', type: 'string', required: true, label: 'Customer First Name' },
      { key: 'customer_lastName', type: 'string', required: true, label: 'Customer Last Name' },
      { key: 'customer_phoneNumber', type: 'string', required: false, label: 'Customer Phone Number' },

      // Customization data fields
      { key: 'customization_logoUrl', type: 'string', required: false, label: 'Logo URL' },
      { key: 'customization_paymentDescription', type: 'string', required: false, label: 'Payment Description' },
      { key: 'customization_checkoutModalTitle', type: 'string', required: false, label: 'Checkout Modal Title' }
    ],

    perform,

    sample: {
      id: 'ref_123456',
      status: true,
      message: 'Transaction Initialized successfully',
      transactionReference: 'ref_123456',
      amount: 1000,
      statusCode: '01',
      statusMessage: 'Transaction initiated successfully',
      publicKey: 'sample_public_key',
      paymentRedirectUrl: 'https://checkout.novacpayment.com/pay/ref_123456'
    },

    outputFields: [
      { key: 'id', label: 'Transaction ID' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'transactionReference', label: 'Transaction Reference' },
      { key: 'amount', label: 'Amount' },
      { key: 'statusCode', label: 'Status Code' },
      { key: 'statusMessage', label: 'Status Message' },
      { key: 'publicKey', label: 'Public Key' },
      { key: 'paymentRedirectUrl', label: 'Payment Redirect URL' }
    ]
  }
};
