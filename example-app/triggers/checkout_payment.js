'use strict';

const perform = async (z, bundle) => {
  const body = {
    transactionReference: bundle.inputData.transactionReference,
    amount: bundle.inputData.amount || null,
    currency: bundle.inputData.currency || null,
    metaData: bundle.inputData.metaData || null,
    redirectUrl: bundle.inputData.redirectUrl || null,
    checkoutCustomerData: {
      email: bundle.inputData.customer_email,
      firstName: bundle.inputData.customer_firstName,
      lastName: bundle.inputData.customer_lastName,
      phoneNumber: bundle.inputData.customer_phoneNumber || null,
    },
    checkoutCustomizationData: {
      logoUrl: bundle.inputData.customization_logoUrl || null,
      paymentDescription: bundle.inputData.customization_paymentDescription || null,
      checkoutModalTitle: bundle.inputData.customization_checkoutModalTitle || null,
    },
  };

  const response = await z.request({
    url: 'https://api.novacpayment.com/api/v1/initiate',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization header injected globally in your authentication or beforeRequest hook
    },
    body: JSON.stringify(body),
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
    paymentRedirectUrl: data.data.paymentRedirectUrl,
  };
};

module.exports = {
  key: 'create_transaction_payment',
  noun: 'Transaction Payment',

  display: {
    label: 'Create Transaction Payment',
    description:
      'Initiates a payment transaction with Novac and returns transaction details including a payment redirect URL.',
  },

  operation: {
    inputFields: [
      {
        key: 'transactionReference',
        label: 'Transaction Reference',
        type: 'string',
        required: true,
        helpText: 'Unique reference for this transaction',
      },
      {
        key: 'amount',
        label: 'Amount',
        type: 'string',
        required: false,
        helpText: 'Amount for the transaction',
      },
      {
        key: 'currency',
        label: 'Currency',
        type: 'string',
        required: false,
        helpText: 'Currency code (e.g., NGN)',
      },
      {
        key: 'metaData',
        label: 'Meta Data',
        type: 'string',
        required: false,
      },
      {
        key: 'redirectUrl',
        label: 'Redirect URL',
        type: 'string',
        required: false,
        helpText: 'URL to redirect to after payment completion',
      },
      {
        key: 'customer_email',
        label: 'Customer Email',
        type: 'string',
        required: true,
      },
      {
        key: 'customer_firstName',
        label: 'Customer First Name',
        type: 'string',
        required: true,
      },
      {
        key: 'customer_lastName',
        label: 'Customer Last Name',
        type: 'string',
        required: true,
      },
      {
        key: 'customer_phoneNumber',
        label: 'Customer Phone Number',
        type: 'string',
        required: false,
      },
      {
        key: 'customization_logoUrl',
        label: 'Customization Logo URL',
        type: 'string',
        required: false,
      },
      {
        key: 'customization_paymentDescription',
        label: 'Customization Payment Description',
        type: 'string',
        required: false,
      },
      {
        key: 'customization_checkoutModalTitle',
        label: 'Customization Checkout Modal Title',
        type: 'string',
        required: false,
      },
    ],

    perform,

    sample: {
      id: 'trx123456',
      status: true,
      message: 'Transaction Initialized successfully',
      transactionReference: 'trx123456',
      amount: '1000',
      statusCode: '01',
      statusMessage: 'Transaction initiated successfully',
      publicKey: 'public_key_string',
      paymentRedirectUrl: 'https://checkout.novacpayment.com/pay/trx123456',
    },

    outputFields: [
      { key: 'id', label: 'Transaction Reference' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'transactionReference', label: 'Transaction Reference' },
      { key: 'amount', label: 'Amount' },
      { key: 'statusCode', label: 'Status Code' },
      { key: 'statusMessage', label: 'Status Message' },
      { key: 'publicKey', label: 'Public Key' },
      { key: 'paymentRedirectUrl', label: 'Payment Redirect URL' },
    ],
  },
};
