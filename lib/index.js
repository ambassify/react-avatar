(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Gravatar = require('./sources/Gravatar');

var _Gravatar2 = _interopRequireDefault(_Gravatar);

var _Facebook = require('./sources/Facebook');

var _Facebook2 = _interopRequireDefault(_Facebook);

var _Google = require('./sources/Google');

var _Google2 = _interopRequireDefault(_Google);

var _Skype = require('./sources/Skype');

var _Skype2 = _interopRequireDefault(_Skype);

var _Value = require('./sources/Value');

var _Value2 = _interopRequireDefault(_Value);

var _Src = require('./sources/Src');

var _Src2 = _interopRequireDefault(_Src);

var _Icon = require('./sources/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SOURCES = [_Gravatar2.default, _Facebook2.default, _Google2.default, _Skype2.default, _Value2.default, _Src2.default, _Icon2.default];

var Avatar = function (_React$Component) {
    _inherits(Avatar, _React$Component);

    function Avatar(props) {
        _classCallCheck(this, Avatar);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Avatar).call(this, props));

        _this.tryNextsource = function (Source) {

            var instance = new Source(_this.props);

            if (!instance.isCompatible(_this.props)) return _this.fetch();

            instance.get(function (state) {
                if (state) {
                    _this.setState(state);
                    return;
                } else {
                    _this.fetch();
                }
            });
        };

        _this.fetch = function (event) {
            // If fetch was triggered by img onError
            // then set state src back to null so getVisual will
            // automatically switch to drawn avatar if there is no other social ID available to try
            if (event && event.type === 'error') _this.setState({ src: null });

            if (SOURCES.length === _this.state.sourcePointer) return;

            var source = SOURCES[_this.state.sourcePointer];
            _this.setState({
                sourcePointer: _this.state.sourcePointer + 1
            }, function () {
                _this.tryNextsource(source);
            });
        };

        _this.state = {
            sourcePointer: 0,
            src: null,
            value: null,
            color: props.color
        };
        return _this;
    }

    _createClass(Avatar, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.fetch();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            /**
            * This component ignores changes in `this.props.src`, `this.props.name`, and
            * `this.props.value`. This lifecycle method will allow users to change the avatars name or
            * value.
            */
            if (newProps.src && newProps.src !== this.props.src) {
                this.setState({ src: newProps.src });
            } else if (newProps.name && newProps.name !== this.props.name) {
                this.setState({ value: this.getInitials(newProps.name) });
            } else if (newProps.value && newProps.value !== this.props.value) {
                this.setState({ value: newProps.value });
            }
        }
    }, {
        key: 'getVisual',
        value: function getVisual() {
            var size = this.props.size;
            var round = this.props.round;
            var imageStyle = {
                maxWidth: '100%',
                width: size,
                height: size,
                borderRadius: round ? 500 : 0
            };

            var initialsStyle = {
                background: this.state.color,
                width: size,
                height: size,
                font: Math.floor(size / 3) + 'px/100px Helvetica, Arial, sans-serif',
                color: this.props.fgColor,
                textAlign: 'center',
                textTransform: 'uppercase',
                lineHeight: size + Math.floor(size / 10) + 'px',
                borderRadius: round ? 500 : 0
            };

            if (this.state.src) {
                return _react2.default.createElement('img', { width: this.props.size,
                    height: this.props.size,
                    style: imageStyle,
                    src: this.state.src,
                    onError: this.fetch });
            } else {
                return _react2.default.createElement(
                    'div',
                    { style: initialsStyle },
                    this.state.value
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var size = this.props.size;
            var hostStyle = {
                display: 'inline-block',
                width: size,
                height: size,
                borderRadius: this.props.round ? 500 : 0
            };
            var visual = this.getVisual();
            return _react2.default.createElement(
                'div',
                { className: this.props.className,
                    style: hostStyle },
                visual
            );
        }
    }]);

    return Avatar;
}(_react2.default.Component);

Avatar.displayName = 'Avatar';
Avatar.propTypes = {
    className: _react2.default.PropTypes.string,
    fgColor: _react2.default.PropTypes.string,
    color: _react2.default.PropTypes.string,
    colors: _react2.default.PropTypes.array,
    name: _react2.default.PropTypes.string,
    value: _react2.default.PropTypes.string,
    email: _react2.default.PropTypes.string,
    md5Email: _react2.default.PropTypes.string,
    src: _react2.default.PropTypes.string,
    facebookId: _react2.default.PropTypes.string,
    googleId: _react2.default.PropTypes.string,
    skypeId: _react2.default.PropTypes.string,
    round: _react2.default.PropTypes.bool,
    size: _react2.default.PropTypes.number
};
Avatar.defaultProps = {
    fgColor: '#FFF',
    color: null,
    name: null,
    value: null,
    email: null,
    md5Email: null,
    facebookId: null,
    skypeId: null,
    googleId: null,
    round: false,
    size: 100
};
exports.default = Avatar;

},{"./sources/Facebook":2,"./sources/Google":3,"./sources/Gravatar":4,"./sources/Icon":5,"./sources/Skype":6,"./sources/Src":7,"./sources/Value":8,"react":"react"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FacebookSource = function FacebookSource(props) {
    var _this = this;

    _classCallCheck(this, FacebookSource);

    this.props = null;

    this.isCompatible = function () {
        return !!_this.props.facebookId;
    };

    this.get = function (setState) {
        var _props = _this.props;
        var size = _props.size;
        var facebookId = _props.facebookId;

        var url = 'https://graph.facebook.com/' + facebookId + '/picture?width=' + size;

        setState({ src: url });
    };

    this.props = props;
};

exports.default = FacebookSource;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GoogleSource = function GoogleSource(props) {
    var _this = this;

    _classCallCheck(this, GoogleSource);

    this.props = null;

    this.isCompatible = function () {
        return !!_this.props.googleId;
    };

    this.get = function (setState) {
        var _props = _this.props;
        var size = _props.size;
        var googleId = _props.googleId;

        var url = 'https://picasaweb.google.com/data/entry/api/user/' + googleId + '?alt=json';

        (0, _utils.fetch)(url, function (data) {
            var src = data.entry.gphoto$thumbnail.$t;
            var srcWithCorrectSize = src.replace('s64', 's' + size);
            setState({
                src: srcWithCorrectSize
            });
        }, function () {
            // on error
            setState(null);
        });
    };

    this.props = props;
};

exports.default = GoogleSource;

},{"../utils":9}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isRetina = require('is-retina');

var _isRetina2 = _interopRequireDefault(_isRetina);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IS_RETINA = (0, _isRetina2.default)();

var GravatarSource = function GravatarSource(props) {
    _classCallCheck(this, GravatarSource);

    _initialiseProps.call(this);

    this.props = props;
};

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.props = null;

    this.isCompatible = function () {
        return !!_this.props.email || !!_this.props.md5Email;
    };

    this.get = function (setState) {
        var props = _this.props;

        var email = props.md5Email || (0, _md2.default)(props.email);
        var size = IS_RETINA ? props.size * 2 : props.size;
        var url = 'https://secure.gravatar.com/avatar/' + email + '?s=' + size + '&d=404';

        setState({ src: url });
    };
};

exports.default = GravatarSource;

},{"is-retina":"is-retina","md5":"md5"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IconSource = function IconSource(props) {
    var _this = this;

    _classCallCheck(this, IconSource);

    this.props = null;
    this.icon = '✷';

    this.isCompatible = function () {
        return true;
    };

    this.get = function (setState) {
        setState({
            value: _this.icon,
            color: (0, _utils.getRandomColor)(_this.icon, _this.props.colors)
        });
    };

    this.props = props;
};

exports.default = IconSource;

},{"../utils":9}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SkypeSource = function SkypeSource(props) {
    var _this = this;

    _classCallCheck(this, SkypeSource);

    this.props = null;

    this.isCompatible = function () {
        return !!_this.props.skypeId;
    };

    this.get = function (setState) {
        var skypeId = _this.props.skypeId;

        var url = 'https://api.skype.com/users/' + skypeId + '/profile/avatar';

        setState({ src: url });
    };

    this.props = props;
};

exports.default = SkypeSource;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SrcSource = function SrcSource(props) {
    var _this = this;

    _classCallCheck(this, SrcSource);

    this.props = null;

    this.isCompatible = function () {
        return !!_this.props.src;
    };

    this.get = function (setState) {
        setState({
            src: _this.props.src
        });
    };

    this.props = props;
};

exports.default = SrcSource;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValueSource = function () {
    function ValueSource(props) {
        var _this = this;

        _classCallCheck(this, ValueSource);

        this.props = null;

        this.isCompatible = function () {
            return !!_this.props.name || !!_this.props.value;
        };

        this.get = function (setState) {
            var value = _this.getValue();
            var state = value ? {
                value: value,
                color: _this.getColor(value)
            } : null;
            setState(state);
        };

        this.props = props;
    }

    _createClass(ValueSource, [{
        key: 'getInitials',
        value: function getInitials() {
            var name = this.props.name;
            var parts = name.split(' ');
            var initials = '';
            for (var i = 0; i < parts.length; i++) {
                initials += parts[i].substr(0, 1).toUpperCase();
            }
            return initials;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            if (this.props.name) return this.getInitials();

            if (this.props.value) return this.props.value;

            return null;
        }
    }, {
        key: 'getColor',
        value: function getColor(value) {
            var _props = this.props;
            var color = _props.color;
            var colors = _props.colors;

            return color || (0, _utils.getRandomColor)(value, colors);
        }
    }]);

    return ValueSource;
}();

exports.default = ValueSource;

},{"../utils":9}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fetch = fetch;
exports.getRandomColor = getRandomColor;

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

},{}]},{},[1]);
