'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetch = fetch;
exports.fetchJSONP = fetchJSONP;
exports.getRandomColor = getRandomColor;
exports.cacheFailingSource = cacheFailingSource;
exports.hasSourceFailedBefore = hasSourceFailedBefore;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function fetch(url, successCb, errorCb) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var data = JSON.parse(request.responseText);
                successCb(data);
            } else {
                errorCb(request.status);
            }
        }
    };
    request.open('GET', url, true);
    request.send();
}

function fetchJSONP(url, successCb, errorCb) {
    var callbackName = 'jsonp_cb_' + Math.round(100000 * Math.random());

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);

    script.onerror = function () {
        errorCb();
    };

    window[callbackName] = function (data) {
        delete window[callbackName];
        document.body.removeChild(script);
        successCb(data);
    };
}

var defaultColors = ['#d73d32', '#7e3794', '#4285f4', '#67ae3f', '#d61a7f', '#ff4080'];

function _stringAsciiCodeSum(value) {
    return [].concat(_toConsumableArray(value)).map(function (letter) {
        return letter.charCodeAt(0);
    }).reduce(function (current, previous) {
        return previous + current;
    });
}

function getRandomColor(value) {
    var colors = arguments.length <= 1 || arguments[1] === undefined ? defaultColors : arguments[1];

    // if no value is passed, always return transparent color otherwise
    // a rerender would show a new color which would will
    // give strange effects when an interface is loading
    // and gets rerendered a few consequent times
    if (!value) return 'transparent';

    // value based random color index
    // the reason we don't just use a random number is to make sure that
    // a certain value will always get the same color assigned given
    // a fixed set of colors
    var sum = _stringAsciiCodeSum(value);
    var colorIndex = sum % colors.length;
    return colors[colorIndex];
}

function _hasLocalStorage() {
    return typeof Storage !== 'undefined';
}

var CACHE_KEY = 'react-avatar';

function cacheFailingSource(source) {
    // cache not available
    if (!_hasLocalStorage) return;

    var cache = localStorage.getItem(CACHE_KEY) || '';

    // already in cache
    if (cache.indexOf(source) > -1) return;

    var cacheList = cache.split(';');
    cacheList.push(source);

    // only keep the last 20 results so we don't fill up local storage
    cacheList = cacheList.slice(-20);

    localStorage.setItem(CACHE_KEY, cacheList.join(';'));
}

function hasSourceFailedBefore(source) {
    var cache = localStorage.getItem(CACHE_KEY) || '';
    return cache.indexOf(source) > -1;
}