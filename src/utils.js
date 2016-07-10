'use strict';

export
function fetch(url, successCb, errorCb) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                const data = JSON.parse(request.responseText);
                successCb(data);
            } else {
                errorCb(request.status);
            }
        }
    };
    request.open('GET', url, true);
    request.send();
}

export
function fetchJSONP(url, successCb, errorCb) {
    const callbackName = 'jsonp_cb_' + Math.round(100000 * Math.random());

    const script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);

    script.onerror = function() {
        errorCb();
    };

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        successCb(data);
    };
}

const defaultColors = [
    '#d73d32',
    '#7e3794',
    '#4285f4',
    '#67ae3f',
    '#d61a7f',
    '#ff4080'
];

function _stringAsciiCodeSum(value) {
    return [...value]
        .map(letter => letter.charCodeAt(0))
        .reduce((current, previous) => previous + current);
}

export
function getRandomColor(value, colors = defaultColors)
{
    // if no value is passed, always return transparent color otherwise
    // a rerender would show a new color which would will
    // give strange effects when an interface is loading
    // and gets rerendered a few consequent times
    if(!value)
        return 'transparent';

    // value based random color index
    // the reason we don't just use a random number is to make sure that
    // a certain value will always get the same color assigned given
    // a fixed set of colors
    const sum = _stringAsciiCodeSum(value);
    const colorIndex = (sum % colors.length);
    return colors[colorIndex];
}

function _hasLocalStorage()
{
    return typeof Storage !== 'undefined';
}

const CACHE_KEY = 'react-avatar';
export
function cacheFailingSource(source)
{
    // cache not available
    if(!_hasLocalStorage)
        return;

    const cache = localStorage.getItem(CACHE_KEY) || '';

    // already in cache
    if(cache.indexOf(source) > -1)
        return;

    let cacheList = cache.split(';');
    cacheList.push(source);

    // only keep the last 20 results so we don't fill up local storage
    cacheList = cacheList.slice(-20);

    localStorage.setItem(CACHE_KEY, cacheList.join(';'));
}

export
function hasSourceFailedBefore(source)
{
    const cache = localStorage.getItem(CACHE_KEY) || '';
    return cache.indexOf(source) > -1;
}
