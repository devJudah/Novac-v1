const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe('creates.retrieve_transaction_fees', () => {
  it('should run', async () => {
    const bundle = { inputData: {
      transactionReference:'test_ref_00123456795' || null,
      paymentType:'' || null,
      cardBin:'' || null
    },
      authData: {
        publicKey: process.env.NOVAC_PUBLIC_KEY,
      },
    };

    const results = await appTester(App.creates['retrieve_transaction_fees'].operation.perform, bundle);
    expect(results).toBeDefined();
    // TODO: add more assertions
  });
});
