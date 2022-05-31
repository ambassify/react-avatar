'use strict';

import retina from 'is-retina';

const IS_RETINA = retina();

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

export
const defaultColors = [
    '#d73d32',
    '#7e3794',
    '#4285f4',
    '#67ae3f',
    '#d61a7f',
    '#ff4080'
];

// https://regex101.com/r/YEsPER/1
// https://developer.mozilla.org/en-US/docs/Web/CSS/length
const reSize = /^([-+]?(?:\d+(?:\.\d+)?|\.\d+))([a-z]{2,4}|%)?$/;

// https://en.wikipedia.org/wiki/Linear_congruential_generator
function _stringAsciiPRNG(value, m) {
    // Xn+1 = (a * Xn + c) % m
    // 0 < a < m
    // 0 <= c < m
    // 0 <= X0 < m

    const charCodes = [...value].map(letter => letter.charCodeAt(0));
    const len = charCodes.length;

    const a = (len % (m - 1)) + 1;
    const c = charCodes.reduce((current, next) => current + next) % m;

    let random = charCodes[0] % m;
    for (let i = 0; i < len; i++)
        random = ((a * random) + c) % m;

    return random;
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
    const colorIndex = _stringAsciiPRNG(value, colors.length);
    return colors[colorIndex];
}

export
function parseSize(size) {
    size = '' + size;

    const [,
        value = 0,
        unit = 'px'
    ] = reSize.exec(size) || [];

    return {
        value: parseFloat(value),
        str: value + unit,
        unit
    };
}

/**
 * Calculate absolute size in pixels we want for the images
 * that get requested from the various sources. They don't
 * understand relative sizes like `em` or `vww`.  We select
 * a fixed size of 512px when we can't detect the true pixel size.
 */
export function getImageSize(size) {
    size = parseSize(size);

    if (isNaN(size.value)) // invalid size, use fallback
        size = 512;
    else if (size.unit === 'px') // px are good, use them
        size = size.value;
    else if (size.value === 0) // relative 0 === absolute 0
        size = 0;
    else // anything else is unknown, use fallback
        size = 512;

    if (IS_RETINA)
        size = size * 2;

    return size;
}

export
function defaultInitials(name, { maxInitials }) {
    return name.split(/\s/)
        .map(part => part.substring(0, 1).toUpperCase())
        .filter(v => !!v)
        .slice(0, maxInitials)
        .join('')
        .toUpperCase();
}

/**
 * Grouped timeouts reduce the amount of timeouts trigged
 * by grouping multiple handlers into a single setTimeout call.
 *
 * This reduces accuracy of the timeout but will be less expensive
 * when multiple avatar have been loaded into view.
 */
const timeoutGroups = {};

export
function setGroupedTimeout(fn, ttl) {
    if (timeoutGroups[ttl]) {
        timeoutGroups[ttl].push(fn);
        return;
    }

    const callbacks = timeoutGroups[ttl] = [fn];
    setTimeout(() => {
        delete timeoutGroups[ttl];
        callbacks.forEach(cb => cb());
    }, ttl);
}

export
function getNullableText(...args) {
    for (const arg of args) {
        if (arg)
            return arg;

        if (arg === false || arg === null)
            return null;
    }

    return;
}

export
function calculateBorderRadius(round) {
    if (round === true)
        return '100%';

    if (round === false)
        return;

    return round;
}
