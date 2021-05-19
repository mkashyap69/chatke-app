const clearCache = require('../utils/forcedCacheExpiration');

module.exports = async (req, res, next) => {
  await next();
  clearCache(req.user._id);
};
