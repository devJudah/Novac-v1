const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe('creates.create_ussd_payment', () => {
  it('should run', async () => {
    const bundle = { inputData: {
      transactionReference: 'test_ref_0012345673000',
      bankCode: '000',
    },
      authData: {
        publicKey: process.env.NOVAC_PUBLIC_KEY,
      },
    };

    const results = await appTester(App.creates['create_ussd_payment'].operation.perform, bundle);
    expect(results).toBeDefined();
    // TODO: add more assertions
  });
});
