module.exports = {
  apps: [
    {
      name: 'Chatke',
      script: './server.js',
      instances: 'max',
      watch: true,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
