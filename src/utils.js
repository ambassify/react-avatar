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

export
function defaultInitials(name, { maxInitials }) {
    return name.split(/\s/)
        .map(part => part.substring(0, 1).toUpperCase())
        .filter(v => !!v)
        .slice(0, maxInitials)
        .join('');
}
