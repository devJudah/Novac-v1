'use strict';

const perform = async (z, bundle) => {
  const body = {
    paymentLinkReference: bundle.inputData.paymentLinkReference,
    amount: bundle.inputData.amount,
    currency: bundle.inputData.currency,
    metaData: bundle.inputData.metaData || null,
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
      // Authorization header is added globally from your auth / beforeRequest
    },
    body: JSON.stringify(body)
  });

  // For a Create action, return a single object.
  // Shape based on your 200 response example.
  const data = response.data;

  return {
    id: data.data.transactionReference,             // required by Zapier
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
    description: 'Creates a Novac checkout payment and returns the payment link and transaction details.'
  },

  operation: {
    inputFields: [
      // Core required fields
      {
        key: 'paymentLinkReference',
        label: 'Payment Link Reference',
        type: 'string',
        required: true,
        helpText: 'A unique reference you assign to this payment link.'
      },
      {
        key: 'amount',
        label: 'Amount',
        type: 'number',
        required: true,
        helpText: 'The amount to charge.'
      },
      {
        key: 'currency',
        label: 'Currency',
        type: 'string',
        required: true,
        helpText: 'Currency code (for example, NGN, USD).'
      },

      {
        key: 'metaData',
        label: 'Metadata',
        type: 'string',
        required: false,
        helpText: 'Optional metadata to store with the transaction (JSON or string, depending on your API).'
      },

      // Checkout customer data
      {
        key: 'customer_email',
        label: 'Customer Email',
        type: 'string',
        required: true
      },
      {
        key: 'customer_firstName',
        label: 'Customer First Name',
        type: 'string',
        required: true
      },
      {
        key: 'customer_lastName',
        label: 'Customer Last Name',
        type: 'string',
        required: true
      },
      {
        key: 'customer_phoneNumber',
        label: 'Customer Phone Number',
        type: 'string',
        required: false
      },

      // Checkout customization data
      {
        key: 'customization_logoUrl',
        label: 'Checkout Logo URL',
        type: 'string',
        required: false
      },
      {
        key: 'customization_paymentDescription',
        label: 'Payment Description',
        type: 'string',
        required: false
      },
      {
        key: 'customization_checkoutModalTitle',
        label: 'Checkout Modal Title',
        type: 'string',
        required: false
      }
    ],

    perform,

    sample: {
      id: 'ref_123456',
      status: true,
      message: 'Transaction Initialized successfully',
      transactionReference: 'ref_123456',
      amount: 123,
      statusCode: '01',
      statusMessage: 'Transaction initiated successfully',
      publicKey: 'nc_testpk_xxxxx',
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
