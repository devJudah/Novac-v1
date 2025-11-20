const secretKeyPatterns = [
  // Matches '/transaction' EXACTLY, or '/transaction/' followed by more path segments
  /\/transaction(\/|$)/, 
  // Matches '/balance' exactly, or followed by more path segments
  /\/balance(\/|$)/, 
  // Add other sensitive endpoints with the regex pattern
  /\/transfers(\/|$)/,
  /\/void-transaction(\/|$)/,
  /\/virtual-accounts(\/|$)/,
  /\/virtual-account(\/|$)/,
  /\/refund(\/|$)/,
  /\/partial-refund(\/|$)/,
  /\/decrypt-data(\/|$)/,
  /\/encrypt-data(\/|$)/,
  /\/tokenized-card-charge(\/|$)/,
  /\/threedschallenge(\/|$)/,
  /\/direct-card-charge(\/|$)/,
  /\/direct-card-charge-auth(\/|$)/,

  // API doesnt specify if secret or public
  /\/direct-card-charge-internal(\/|$)/,
  
];

const publicKeyPatterns = [
  // Matches '/transaction-fee' EXACTLY, or followed by more segments
  /\/transaction-fee(\/|$)/, 
  /\/validate-otp(\/|$)/,
  /\/direct-card-charge-internal(\/|$)/,
];

const addAuthHeaders = (request, z, bundle) => {
  request.headers = request.headers || {};
  const urlPath = new URL(request.url).pathname; // Get only the path part of the URL

  // 1. Check if the URL path matches a SECRET key pattern. This takes priority.
  const needsSecretKey = secretKeyPatterns.some(pattern => pattern.test(urlPath));

  if (needsSecretKey) {
    request.headers.Authorization = `Bearer ${bundle.authData.secretKey}`;
    return request;
  }

  // 2. Check if the URL path matches a PUBLIC key pattern.
  const needsPublicKey = publicKeyPatterns.some(pattern => pattern.test(urlPath));

  // 3. Set header based on explicit match, falling back to PUBLIC key as default.
  const authKey = needsPublicKey ? bundle.authData.publicKey : bundle.authData.publicKey; // Fallback to public if no match

  request.headers.Authorization = `Bearer ${authKey}`;
  return request;
};

module.exports = addAuthHeaders;