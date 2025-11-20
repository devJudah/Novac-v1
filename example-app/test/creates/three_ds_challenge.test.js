const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe('creates.three_ds_challenge', () => {
  it('should run', async () => {
    const bundle = { inputData: {},
      authData: {
        secretKey: process.env.NOVAC_SECRET_KEY,
      },
    };

    const results = await appTester(App.creates['three_ds_challenge'].operation.perform, bundle);
    expect(results).toBeDefined();
    // TODO: add more assertions
  });
});
