const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe('creates.encrypt_customer_card_details', () => {
  it('should run', async () => {
    const bundle = { inputData: {
      number: '5555555555554444',
      expiryMonth: '12',
      expiryYear: '2030',
      cvv: '123',
      pin: '1234',
      reference: 'encrypt_ref_123456789101112'
    },
      authData: {
        secretKey: process.env.NOVAC_SECRET_KEY,
      },
    };

    const results = await appTester(App.creates['encrypt_customer_card_details'].operation.perform, bundle);
    expect(results).toBeDefined();
    // TODO: add more assertions
  });
});
