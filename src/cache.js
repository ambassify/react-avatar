export const CACHE_PREFIX = 'react-avatar/';
export const CACHE_KEY_FAILING = 'failing';

const _hasLocalStorage = (function isLocalStorageAvailable() {
    try {
        return ('localStorage' in window && window['localStorage']);
    } catch(err) {
        return false;
    }
}());

export
class Cache {

    constructor(options = {}) {
        const {
            cachePrefix = CACHE_PREFIX,
            sourceTTL = 7 * 24 * 3600 * 1000,
            sourceSize = 20
        } = options;

        this.cachePrefix = cachePrefix;
        this.sourceTTL = sourceTTL;
        this.sourceSize = sourceSize;
    }

    set(key, value) {
        // cache not available
        if (!_hasLocalStorage)
            return;

        value = JSON.stringify(value);

        try {
            localStorage.setItem(this.cachePrefix + key, value);
        } catch(e) {
            // failsafe for mobile Safari private mode
            console.error(e); // eslint-disable-line no-console
        }
    }

    get(key) {
        // cache not available
        if (!_hasLocalStorage)
            return null;

        const value = localStorage.getItem(this.cachePrefix + key);

        if (value)
            return JSON.parse(value);

        return null;
    }

    sourceFailed(source) {
        let cacheList = this.get(CACHE_KEY_FAILING) || [];

        // Remove expired entries or previous instances of this source
        cacheList = cacheList.filter(entry => {
            const hasExpired = entry.expires > 0 && entry.expires < Date.now();
            const isMatch = entry === source || entry.url == source;

            return !hasExpired && !isMatch;
        });

        // Add the source to the end of the list
        cacheList.unshift({
            url: source,
            expires: Date.now() + this.sourceTTL
        });

        // only keep the last X results so we don't fill up local storage
        cacheList = cacheList.slice(0, this.sourceSize - 1);

        return this.set(CACHE_KEY_FAILING, cacheList);
    }

    hasSourceFailedBefore(source) {
        const cacheList = this.get(CACHE_KEY_FAILING) || [];

        return cacheList.some(entry => {
            const hasExpired = entry.expires > 0 && entry.expires < Date.now();
            const isMatch = entry === source || entry.url == source;

            return isMatch && !hasExpired;
        });
    }
}

export default new Cache();
