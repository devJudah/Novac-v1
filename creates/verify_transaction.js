'use strict';

const perform = async (z, bundle) => {

  const transactionRef = bundle.inputData.transactionReference;


  const response = await z.request({
    url: `https://api.novacpayment.com/api/v1/checkout/${encodeURIComponent(transactionRef)}/verify`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      // Authorization header added globally via auth/beforeRequest
    }
  });

  const data = response.data;

  if (![200, 201].includes(response.status)) {
    throw new Error(`API error: ${response.status} - ${data.message || 'Unknown error'}`);
  }

  return {
    
    status: data.status,
    message: data.message,
    data: data.data
    // Add more fields as needed per your API response
  };
};

module.exports = {
  key: 'verify_transaction',
  noun: 'Transaction Verification',

  display: {
    label: 'Verify Transaction',
    description: 'Verifies payment transaction details using Novac API.'
  },

  operation: {
    inputFields: [
      { key: 'transactionReference', type: 'string', required: true, label: 'Transaction Reference' }
    ],

    perform,

    sample: {
      status: true,
      message: "Transaction details retrieved successfully",
      currency: "NGN",
      data: {
        status: "void",
        id: 427220,
        transactionReference: "test_ref_00123456789",
        amount: 1800,
        chargedAmount: 1800,
        currency: "NGN",
        transactionFee: 0,
        gatewayResponseCode: "B0",
        authorizationCode: "",
        gatewayResponseMessage: "Invalid OTP",
        domain: "test",
        channel: "card",
        requestIp: "109.144.24.110",
        paymentDescriptor: "NOVAC",
        redirectUrl: "",
        checkoutMetadata: "{}",
        card: {
          first6Digits: "",
          last4Digits: "",
          issuer: "",
          country: "",
          type: "",
          token: ""
        },
        customer: {
          i: 217480,
          customerCode: "NCS_325rq8p2ea4",
          email: "test@example.com",
          name: "John"
        },
        transferDetail: {
          bankCode: "",
          bankName: "",
          accountNumber: "",
          sessionId: "",
          creditAccountName: "",
          originatorName: "",
          originatorAccountNumbe: ""
        }
      }
    },

    outputFields: [
      { key: 'id', label: 'Transaction Reference' },
      { key: 'status', label: 'Status' },
      { key: 'message', label: 'Message' },
      { key: 'transactionReference', label: 'Transaction Reference' },
      { key: 'currency', label: 'Currency' },
    ]
  }
};
