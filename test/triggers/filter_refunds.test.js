const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();  // Load .env variables for auth

describe('triggers.filter_refunds', () => {
  it('should run', async () => {
    const bundle = {
      authData: {
        secretKey: process.env.NOVAC_SECRET_KEY || 'test_dummy_secret',  // fallback
      },
      inputData: {
        startDate: '2024-01-01',
        endDate: '2024-01-07',
      },
    };

    const results = await appTester(App.triggers.filter_refunds.operation.perform, bundle);
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
    // Add more specific assertions based on your expected data shape
  });
});
