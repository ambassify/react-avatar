'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultColors = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.fetch = fetch;
exports.fetchJSONP = fetchJSONP;
exports.getRandomColor = getRandomColor;
exports.parseSize = parseSize;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var defaultColors = exports.defaultColors = ['#d73d32', '#7e3794', '#4285f4', '#67ae3f', '#d61a7f', '#ff4080'];

// https://regex101.com/r/YEsPER/1
// https://developer.mozilla.org/en-US/docs/Web/CSS/length
var reSize = /^([-+]?(?:\d+(?:\.\d+)?|\.\d+))([a-z]{2,4}|%)?$/;

// https://en.wikipedia.org/wiki/Linear_congruential_generator
function _stringAsciiPRNG(value, m) {
    // Xn+1 = (a * Xn + c) % m
    // 0 < a < m
    // 0 <= c < m
    // 0 <= X0 < m

    var charCodes = [].concat((0, _toConsumableArray3.default)(value)).map(function (letter) {
        return letter.charCodeAt(0);
    });
    var len = charCodes.length;

    var a = len % (m - 1) + 1;
    var c = charCodes.reduce(function (current, next) {
        return current + next;
    }) % m;

    var random = charCodes[0] % m;
    for (var i = 0; i < len; i++) {
        random = (a * random + c) % m;
    }return random;
}

function getRandomColor(value) {
    var colors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultColors;

    // if no value is passed, always return transparent color otherwise
    // a rerender would show a new color which would will
    // give strange effects when an interface is loading
    // and gets rerendered a few consequent times
    if (!value) return 'transparent';

    // value based random color index
    // the reason we don't just use a random number is to make sure that
    // a certain value will always get the same color assigned given
    // a fixed set of colors
    var colorIndex = _stringAsciiPRNG(value, colors.length);
    return colors[colorIndex];
}

function parseSize(size) {
    size = '' + size;

    var _ref = reSize.exec(size) || [],
        _ref2 = (0, _slicedToArray3.default)(_ref, 3),
        _ref2$ = _ref2[1],
        value = _ref2$ === undefined ? 0 : _ref2$,
        _ref2$2 = _ref2[2],
        unit = _ref2$2 === undefined ? 'px' : _ref2$2;

    return {
        value: parseFloat(value),
        str: value + unit,
        unit: unit
    };
}