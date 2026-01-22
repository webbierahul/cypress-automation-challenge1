const environments = {
  dev: {
    baseUrl: 'https://demoqa.com',
    apiUrl: 'https://demoqa.com',
    timeout: 10000,
  },
  staging: {
    baseUrl: 'https://demoqa.com',
    apiUrl: 'https://demoqa.com',
    timeout: 15000,
  },
  prod: {
    baseUrl: 'https://demoqa.com',
    apiUrl: 'https://demoqa.com',
    timeout: 20000,
  },
};

module.exports = (env = 'dev') => {
  return environments[env] || environments.dev;
};
