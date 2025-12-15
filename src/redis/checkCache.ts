import redis from './redis';

interface CheckCacheArgs {
  key: string;
  time: number;
  callback: () => Promise<any>;
}

/**
 * @Function checkCache
 *
 * Takes in an args object with a cache key (string), a numeric time to save the response to the cache, and a callback function to get the response that is to be in the cache, and first checks the cache for the key and returns the cache response if the key is in the cache, and if it's not in the cache, runs the callback function that gets a response from the DB, saves it to the cache using the supplied key, and returns it
 *
 * @param {CheckCacheArgs} args // arguments - key, time, callback function
 *
 * @returns {unknown} // returns the response from the cache or DB
 *
 * @example
 * const user = getCurrentUser();
 * const posts = await checkCache({ key: `${user.id}::posts`, time: 86400, callback: async () => getPosts(user.id)} );
*/

const checkCache = async (args: CheckCacheArgs) => {
  const {
    key,
    time,
    callback
  } = args;

  try {
    const cacheResponse = await redis.get(key);
    if (cacheResponse) {
      console.log('Cache Read: ', key);
      return JSON.parse(cacheResponse);
    } else {
      const dbResponse = await callback();
      const setExResult = await redis.set(key, JSON.stringify(dbResponse), 'EX', time);
      console.log(setExResult === 'OK' ? `Cache Write: ${key}` : 'Cache Error');
      return dbResponse;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export {
  checkCache
}
