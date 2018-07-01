'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CACHE_KEY_FAILING = exports.CACHE_PREFIX = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CACHE_PREFIX = exports.CACHE_PREFIX = 'react-avatar/';
var CACHE_KEY_FAILING = exports.CACHE_KEY_FAILING = 'failing';

var _hasLocalStorage = function isLocalStorageAvailable() {
    try {
        return 'localStorage' in window && window['localStorage'];
    } catch (err) {
        return false;
    }
}();

exports.default = {
    set: function set(key, value) {
        // cache not available
        if (!_hasLocalStorage) return;

        value = (0, _stringify2.default)(value);

        try {
            localStorage.setItem(CACHE_PREFIX + key, value);
        } catch (e) {
            // failsafe for mobile Safari private mode
            console.error(e); // eslint-disable-line no-console
        }
    },
    get: function get(key) {
        var value = localStorage.getItem(CACHE_PREFIX + key);

        if (value) return JSON.parse(value);

        return null;
    },
    sourceFailed: function sourceFailed(source) {
        var cacheList = this.get(CACHE_KEY_FAILING) || [];

        // already in cache
        if (cacheList.indexOf(source) > -1) return;

        cacheList.push(source);

        // only keep the last 20 results so we don't fill up local storage
        cacheList = cacheList.slice(-20);

        return this.set(CACHE_KEY_FAILING, cacheList);
    },
    hasSourceFailedBefore: function hasSourceFailedBefore(source) {
        var cacheList = this.get(CACHE_KEY_FAILING) || [];
        return cacheList.indexOf(source) > -1;
    }
};