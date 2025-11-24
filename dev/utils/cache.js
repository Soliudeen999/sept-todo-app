const CacheModel = require('../models/cache');

const CacheGet = async (key) => {
    return await CacheModel.findOne({key}).where('expires_at').gt(Date.now()).exec();
};

const CacheSet = async (key, value, ttl = null) => {
    const expires_at = ttl ? new Date(Date.now() + ttl * 1000) : null;

    const exists =  await CacheModel.findOne({key}).where('expires_at').gt(Date.now()).exec();

    if(exists){
        exists.value = value;
        exists.expires_at = expires_at;
        return await exists.save();
    } else {
        const cacheEntry = await new CacheModel({key, value, expires_at});
        return cacheEntry.save();
    }
}

module.exports = {
    CacheGet,
    CacheSet
};
