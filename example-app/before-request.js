const secretKeyEndpoints = [
  'balance',
  'transfers',
  'void-transaction',
  'banks/account/verify',
  'direct-card-charge-auth',
  'direct-card-charge',
  'direct-card-charge-internal',
  'threedschallenge',
  'virtual-account',
  'refund',
  'partial-refund',
  'decrypt-data',
  'encrypt-data',
  'transaction',
  'tokenized-card-charge',
  // add all other sensitive endpoints here...
];

const addAuthHeaders = (request, z, bundle) => {
  request.headers = request.headers || {};

  // Check if request URL contains any secret-key endpoint substring
  const needsSecretKey = secretKeyEndpoints.some(ep => request.url.includes(ep));

  if (needsSecretKey) {
    request.headers.Authorization = `Bearer ${bundle.authData.secretKey}`;
  } else {
    request.headers.Authorization = `Bearer ${bundle.authData.publicKey}`;
  }

  return request;
};

module.exports = addAuthHeaders;
