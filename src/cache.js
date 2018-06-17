export const CACHE_PREFIX = 'react-avatar/';
export const CACHE_KEY_FAILING = 'failing';

const _hasLocalStorage = (function isLocalStorageAvailable() {
    try {
        return ('localStorage' in window && window['localStorage']);
    } catch(err) {
        return false;
    }
}());

export default {
    set(key, value) {
        // cache not available
        if (!_hasLocalStorage)
            return;

        value = JSON.stringify(value);

        try {
            localStorage.setItem(CACHE_PREFIX + key, value);
        } catch(e) {
            // failsafe for mobile Safari private mode
            console.error(e); // eslint-disable-line no-console
        }
    },
    get(key) {
        const value = localStorage.getItem(CACHE_PREFIX + key);

        if (value)
            return JSON.parse(value);

        return null;
    },

    sourceFailed(source) {
        let cacheList = this.get(CACHE_KEY_FAILING) || [];

        // already in cache
        if(cacheList.indexOf(source) > -1)
            return;

        cacheList.push(source);

        // only keep the last 20 results so we don't fill up local storage
        cacheList = cacheList.slice(-20);

        return this.set(CACHE_KEY_FAILING, cacheList);
    },

    hasSourceFailedBefore(source) {
        const cacheList = this.get(CACHE_KEY_FAILING) || [];
        return cacheList.indexOf(source) > -1;
    }
};
