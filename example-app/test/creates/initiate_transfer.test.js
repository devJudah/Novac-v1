const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe('creates.initiate_transfer', () => {
  it('should run', async () => {
    const bundle = { inputData: {
      currency: 'NGN',
      amount: 100,
      bankCode: '090291',
      bankName: 'HALA MFB',
      accountNumber: '1234567890',
      accountName: 'John Doe',
      narration: 'Test Transfer',
      reference: 'test_transfer_001',
    },
      authData: {
        secretKey: process.env.NOVAC_SECRET_KEY,
      },
    };

    const results = await appTester(App.creates['initiate_transfer'].operation.perform, bundle);
    expect(results).toBeDefined();
    // TODO: add more assertions
  }, 30000);
});
