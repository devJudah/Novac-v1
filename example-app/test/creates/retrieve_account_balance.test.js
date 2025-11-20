const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe('creates.retrieve_account_balance', () => {
  it('should run', async () => {
    const bundle = { 
      authData: {
        secretKey: process.env.NOVAC_SECRET_KEY || 'test_dummy_secret',  // fallback
      },
      inputData: {} };

    const results = await appTester(App.creates['retrieve_account_balance'].operation.perform, bundle);
    expect(results).toBeDefined();
    // TODO: add more assertions
  });
});
