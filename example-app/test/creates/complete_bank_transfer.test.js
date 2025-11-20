const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe('creates.complete_bank_transfer', () => {
  it('should run', async () => {
    const bundle = {
      inputData: {
        transactionReference: 'hsdjscnzjaskaienfw',
        paymentType: 'bank_transfer',  // example value
        cardBin: '123456'              // example value
      },
      authData: {
        publicKey: process.env.authData_publicKey,
        secretKey: process.env.authData_secretKey
      }
    };

    const results = await appTester(App.creates['complete_bank_transfer'].operation.perform, bundle);
    expect(results).toBeDefined();
    // TODO: add more assertions
  });
});
