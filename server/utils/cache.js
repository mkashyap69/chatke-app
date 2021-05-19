const mongoose = require('mongoose');
const redis = require('redis');
const { promisify } = require('util');
const redisUrl = process.env.REDIS_URL;

const client = redis.createClient(redisUrl);

client.hget = promisify(client.hget); //converting the function into promise
client.hset = promisify(client.hset); //converting the function into promise

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || 'default');
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const queryOptions = this.getQuery();
  const mongooseCollectionName = this.mongooseCollection.name;

  const cacheKey = JSON.stringify({
    ...queryOptions,
    collectionName: mongooseCollectionName,
  });

  const cacheValue = await client.hget(this.hashKey, cacheKey);

  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return doc;
  }

  const res = await exec.apply(this, arguments);
  await client.hset(this.hashKey, cacheKey, JSON.stringify(res));

  client.expire(this.hashKey, 86400);

  return res;
};
