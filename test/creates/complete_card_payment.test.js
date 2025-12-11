const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe('creates.complete_card_payment', () => {
  it('should run', async () => {
    const bundle = { 
      inputData: {
      cardNumber: '5555555555554444',
      expiryMonth: '12',
      expiryYear: '2030',
      cvv: '123',
      cardPin: '1234',
      transactionReference: 'test_ref_00123456790'
    },
      authData: {
        publicKey: process.env.NOVAC_PUBLIC_KEY || 'test_dummy_secret',  // fallback
      },
    };

    const results = await appTester(App.creates['complete_card_payment'].operation.perform, bundle);
    expect(results).toBeDefined();
    // TODO: add more assertions
  });
});
