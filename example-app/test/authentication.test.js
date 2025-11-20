/* globals describe, it, expect */

const zapier = require('zapier-platform-core');
zapier.tools.env.inject(); // loads .env variables

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('authentication', () => {
  it('passes authentication and returns expected property', async () => {
    const bundle = {
      inputData: {}, // keep empty if not needed
      authData: {
        publicKey: process.env.NOVAC_PUBLIC_KEY,
        secretKey: process.env.NOVAC_SECRET_KEY,
      },
    };

    const response = await appTester(App.authentication.test, bundle);

  });
});
