const redis = require('redis');
const redisUrl = process.env.REDIS_URL;

const client = redis.createClient(redisUrl);

const clearCache = (hashKey) => {
  client.del(JSON.stringify(hashKey));
};

module.exports = clearCache;
