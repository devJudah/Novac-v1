const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe('creates.decrypt_customer_card_details', () => {
  it('should run', async () => {
    const bundle = { inputData: {
      encryptedData: 'cf7b17f856aedd58d657ba9d1ca99374994c696060897fd599e29e921d799f65e21812669f398a548fce303e9ab39143817a995d893330d3e34743f4535a9a0cb03476a3e9950de731344dbcf6e9d02fd52be9ee487ed4bc0b45aa4c68b9fb47',
      reference: 'encrypt_ref_123456789101112'
    },
      authData: {
        secretKey: process.env.NOVAC_SECRET_KEY,
      },
    };

    const results = await appTester(App.creates['decrypt_customer_card_details'].operation.perform, bundle);
    expect(results).toBeDefined();
    // TODO: add more assertions
  });
});
