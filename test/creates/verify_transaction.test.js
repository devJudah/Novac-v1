const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe('creates.verify_transaction', () => {
  it('should run', async () => {
    const bundle = { inputData: {
        transactionReference: 'test_ref_00123456789',
    },
      authData: {
        secretKey: process.env.NOVAC_SECRET_KEY,
      },
    };

    const results = await appTester(App.creates['verify_transaction'].operation.perform, bundle);
    expect(results).toBeDefined();
    // TODO: add more assertions
  });
});
