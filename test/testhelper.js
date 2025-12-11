// testHelper.js
const buildTestBundle = (inputData) => ({
  authData: {
    secretKey: process.env.API_SECRET_KEY || 'dummy_test_key',
  },
  inputData: inputData || {},
});

module.exports = { buildTestBundle };
