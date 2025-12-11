const authentication = require('./authentication');

const getRecipe = require("./triggers/recipe");

const getGetBanks = require("./triggers/get_banks");

const addApiKeyHeader = require('./before-request');


const createCreateCheckoutPaymentLink = require("./creates/create_checkout_payment_link");

const createCreateTransactionPayment = require("./creates/create_transaction_payment");

const createChargeTokenizedCardCharge = require("./creates/tokenized_card_charge");

const createCreateUssdPayment = require("./creates/create_ussd_payment");

const createRetrieveTransactionFees = require("./creates/retrieve_transaction_fees");

const createValidateCustomerCardDetails = require("./creates/validate_customer_card_details");

const createRetrieveCheckoutTransaction = require("./creates/retrieve_checkout_transaction");

const createVerifyCheckoutTransaction = require("./creates/verify_checkout_transaction");

const createCompleteBankTransfer = require("./creates/complete_bank_transfer");

const createCompleteCardPayment = require("./creates/complete_card_payment");

const createDirectCardCharge = require("./creates/direct_card_charge");

const createVerifyTransactionByPayload = require("./creates/verify_transaction_by_payload");

const createVerifyTransactionByReference = require("./creates/verify_transaction_by_reference");

const createEncryptCustomerCardDetails = require("./creates/encrypt_customer_card_details");

const createDecryptCustomerCardDetails = require("./creates/decrypt_customer_card_details");

const createThreeDsChallenge = require("./creates/three_ds_challenge");

const getPaymentWebhook = require("./triggers/payment_webhook");

const createRetrieve3DsChallengeStatus = require("./creates/retrieve_3_ds_challenge_status");

const createDirectCardChargeAuthentication = require("./creates/direct_card_charge_authentication");

const createVoidTransaction = require("./creates/void_transaction");

const createRetrieveSupportedPayoutBanks = require("./creates/retrieve_supported_payout_banks");

const createVerifyBankAccount = require("./creates/verify_bank_account");

const createInitiateTransfer = require("./creates/initiate_transfer");

const createRetrieveBankTransaction = require("./creates/retrieve_bank_transaction");

const createRetrieveAccountBalance = require("./creates/retrieve_account_balance");

const createInitiateRefund = require("./creates/initiate_refund");

const createInitiatePartialRefund = require("./creates/initiate_partial_refund");

const createRetrieveRefund = require("./creates/retrieve_refund");

const getFilterRefunds = require("./triggers/filter_refunds");

const createRetrieveVirtualAcctBankList = require("./creates/retrieve_virtual_acct_bank_list");

const createCreateVirtualAccount = require("./creates/create_virtual_account");

const createGetVirtualAccount = require("./creates/get_virtual_account");

const createGetVirtualAccountByReference = require("./creates/get_virtual_account_by_reference");

const createVerifyTransaction = require("./creates/verify_transaction");

const createDirectCardChargeInternalV3 = require("./creates/direct_card_charge_internal_v3");

module.exports = {
  // This is just shorthand to reference the installed dependencies you have.
  // Zapier will need to know these before we can upload.
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

// authentication: {
//     type: 'custom',
//     fields: [{ key: 'apiKey', type: 'string' }],
//     test: async (z, bundle) => {
//       const response = await z.request('http://57b20fb546b57d1100a3c405.mockapi.io/api/me');
//       return response.data;
//     },
//   },
  authentication,
  beforeRequest: [addApiKeyHeader],

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [getRecipe.key]: getRecipe,
    [getGetBanks.key]: getGetBanks,

    [getPaymentWebhook.key]: getPaymentWebhook,
    [getFilterRefunds.key]: getFilterRefunds
  },

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  creates: {
    [createCreateCheckoutPaymentLink.key]: createCreateCheckoutPaymentLink,
    [createCreateTransactionPayment.key]: createCreateTransactionPayment,
    [createCreateUssdPayment.key]: createCreateUssdPayment,
    [createRetrieveTransactionFees.key]: createRetrieveTransactionFees,
    [createValidateCustomerCardDetails.key]: createValidateCustomerCardDetails,
    [createRetrieveCheckoutTransaction.key]: createRetrieveCheckoutTransaction,
    [createVerifyCheckoutTransaction.key]: createVerifyCheckoutTransaction,
    [createCompleteBankTransfer.key]: createCompleteBankTransfer,
    [createCompleteCardPayment.key]: createCompleteCardPayment,
    [createDirectCardCharge.key]: createDirectCardCharge,
    [createVerifyTransactionByPayload.key]: createVerifyTransactionByPayload,
    [createVerifyTransactionByReference.key]: createVerifyTransactionByReference,
    [createVerifyTransaction.key]: createVerifyTransaction,
    [createEncryptCustomerCardDetails.key]: createEncryptCustomerCardDetails,
    [createDecryptCustomerCardDetails.key]: createDecryptCustomerCardDetails,
    [createThreeDsChallenge.key]: createThreeDsChallenge,
    [createRetrieve3DsChallengeStatus.key]: createRetrieve3DsChallengeStatus,
    [createDirectCardChargeAuthentication.key]: createDirectCardChargeAuthentication,
    [createVoidTransaction.key]: createVoidTransaction,
    [createRetrieveSupportedPayoutBanks.key]: createRetrieveSupportedPayoutBanks,
    [createVerifyBankAccount.key]: createVerifyBankAccount,
    [createInitiateTransfer.key]: createInitiateTransfer,
    [createRetrieveBankTransaction.key]: createRetrieveBankTransaction,
    [createRetrieveAccountBalance.key]: createRetrieveAccountBalance,
    [createInitiateRefund.key]: createInitiateRefund,
    [createInitiatePartialRefund.key]: createInitiatePartialRefund,
    [createRetrieveRefund.key]: createRetrieveRefund,
    [createRetrieveVirtualAcctBankList.key]: createRetrieveVirtualAcctBankList,
    [createCreateVirtualAccount.key]: createCreateVirtualAccount,
    [createGetVirtualAccount.key]: createGetVirtualAccount,
    [createGetVirtualAccountByReference.key]: createGetVirtualAccountByReference,
    [createChargeTokenizedCardCharge.key]: createChargeTokenizedCardCharge,
    [createDirectCardChargeInternalV3.key]: createDirectCardChargeInternalV3
  },

  resources: {},
};
