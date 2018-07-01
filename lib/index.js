'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Avatar = exports.ConfigProvider = exports.getRandomColor = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _utils = require('./utils');

Object.defineProperty(exports, 'getRandomColor', {
    enumerable: true,
    get: function get() {
        return _utils.getRandomColor;
    }
});

var _context = require('./context');

Object.defineProperty(exports, 'ConfigProvider', {
    enumerable: true,
    get: function get() {
        return _context.ConfigProvider;
    }
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Gravatar = require('./sources/Gravatar');

var _Gravatar2 = _interopRequireDefault(_Gravatar);

var _Facebook = require('./sources/Facebook');

var _Facebook2 = _interopRequireDefault(_Facebook);

var _Vkontakte = require('./sources/Vkontakte');

var _Vkontakte2 = _interopRequireDefault(_Vkontakte);

var _Twitter = require('./sources/Twitter');

var _Twitter2 = _interopRequireDefault(_Twitter);

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

var SOURCES = [_Facebook2.default, _Google2.default, _Twitter2.default, _Vkontakte2.default, _Skype2.default, _Gravatar2.default, _Src2.default, _Value2.default, _Icon2.default];

// Collect propTypes for each individual source
var sourcePropTypes = SOURCES.reduce(function (r, s) {
    return (0, _assign2.default)(r, s.propTypes);
}, {});

function matchSource(Source, props, cb) {
    var cache = props.cache;

    var instance = new Source(props);

    if (!instance.isCompatible(props)) return cb();

    instance.get(function (state) {
        var failedBefore = state && state.hasOwnProperty('src') && cache.hasSourceFailedBefore(state.src);

        if (!failedBefore && state) {
            cb(state);
        } else {
            cb();
        }
    });
}

var Avatar = exports.Avatar = function (_PureComponent) {
    (0, _inherits3.default)(Avatar, _PureComponent);

    function Avatar(props) {
        (0, _classCallCheck3.default)(this, Avatar);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Avatar.__proto__ || (0, _getPrototypeOf2.default)(Avatar)).call(this, props));

        _this._createFetcher = function (internal) {
            return function (errEvent) {
                var cache = _this.props.cache;

                // Internal state has been reset => we received new props

                if (internal !== _this.state.internal) return;

                // Mark img source as failed for future reference
                if (errEvent && errEvent.type === 'error') cache.sourceFailed(errEvent.target.src);

                var pointer = internal.sourcePointer;
                if (SOURCES.length === pointer) return;

                var source = SOURCES[pointer];

                internal.sourcePointer++;

                matchSource(source, _this.props, function (nextState) {
                    if (!nextState) return setTimeout(internal.fetch, 0);

                    // Reset other values to prevent them from sticking (#51)
                    nextState = (0, _extends3.default)({
                        src: null,
                        value: null,
                        color: null

                    }, nextState);

                    _this.setState(function (state) {
                        // Internal state has been reset => we received new props
                        return internal === state.internal ? nextState : {};
                    });
                });
            };
        };

        _this.fetch = function () {
            var internal = { sourcePointer: 0 };
            internal.fetch = _this._createFetcher(internal);

            _this.setState({ internal: internal }, internal.fetch);
        };

        _this.state = {
            internal: { sourcePointer: 0 },
            src: props.src,
            value: null,
            color: props.color
        };
        return _this;
    }

    (0, _createClass3.default)(Avatar, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.fetch();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            var needsUpdate = false;

            // This seems redundant
            //
            // Props that need to be in `state` are
            // `value`, `src` and `color`
            for (var prop in sourcePropTypes) {
                needsUpdate = needsUpdate || newProps[prop] !== this.props[prop];
            }if (needsUpdate) setTimeout(this.fetch, 0);
        }
    }, {
        key: '_renderAsImage',
        value: function _renderAsImage() {
            var _props = this.props,
                className = _props.className,
                round = _props.round,
                unstyled = _props.unstyled,
                name = _props.name,
                value = _props.value;
            var internal = this.state.internal;

            var size = (0, _utils.parseSize)(this.props.size);
            var alt = name || value;

            var imageStyle = unstyled ? null : {
                maxWidth: '100%',
                width: size.str,
                height: size.str,
                borderRadius: round === true ? '100%' : round
            };

            return _react2.default.createElement('img', { className: className + ' sb-avatar__image',
                width: size.str,
                height: size.str,
                style: imageStyle,
                src: this.state.src,
                alt: alt,
                onError: internal.fetch });
        }
    }, {
        key: '_renderAsText',
        value: function _renderAsText() {
            var _props2 = this.props,
                className = _props2.className,
                textSizeRatio = _props2.textSizeRatio,
                round = _props2.round,
                unstyled = _props2.unstyled;

            var size = (0, _utils.parseSize)(this.props.size);

            var initialsStyle = unstyled ? null : {
                width: size.str,
                height: size.str,
                fontSize: (size.value / textSizeRatio).toFixed(4) + size.unit,
                lineHeight: size.str,
                textAlign: 'center',
                textTransform: 'uppercase',
                color: this.props.fgColor,
                background: this.state.color,
                borderRadius: round === true ? '100%' : round
            };

            return _react2.default.createElement(
                'div',
                { className: className + ' sb-avatar__text',
                    style: initialsStyle },
                this.state.value
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                className = _props3.className,
                unstyled = _props3.unstyled,
                round = _props3.round,
                style = _props3.style,
                onClick = _props3.onClick;
            var _state = this.state,
                src = _state.src,
                sourceName = _state.sourceName;

            var size = (0, _utils.parseSize)(this.props.size);

            var hostStyle = unstyled ? null : (0, _extends3.default)({
                display: 'inline-block',
                verticalAlign: 'middle',
                width: size.str,
                height: size.str,
                borderRadius: round === true ? '100%' : round,
                fontFamily: 'Helvetica, Arial, sans-serif'
            }, style);

            var classNames = [className, 'sb-avatar'];

            if (sourceName) {
                var source = sourceName.toLowerCase().replace(/[^a-z0-9-]+/g, '-') // only allow alphanumeric
                .replace(/^-+|-+$/g, ''); // trim `-`
                classNames.push('sb-avatar--' + source);
            }

            return _react2.default.createElement(
                'div',
                { className: classNames.join(' '),
                    onClick: onClick,
                    style: hostStyle },
                src ? this._renderAsImage() : this._renderAsText()
            );
        }
    }]);
    return Avatar;
}(_react.PureComponent);

Avatar.displayName = 'Avatar';
Avatar.propTypes = (0, _extends3.default)({}, sourcePropTypes, {

    className: _propTypes2.default.string,
    fgColor: _propTypes2.default.string,
    color: _propTypes2.default.string,
    colors: _propTypes2.default.arrayOf(_propTypes2.default.string),
    round: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
    style: _propTypes2.default.object,
    size: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    textSizeRatio: _propTypes2.default.number,
    unstyled: _propTypes2.default.bool,
    cache: _propTypes2.default.object,
    onClick: _propTypes2.default.func

});
Avatar.defaultProps = {
    className: '',
    fgColor: '#FFF',
    round: false,
    size: 100,
    textSizeRatio: 3,
    unstyled: false
};
Avatar.getRandomColor = _utils.getRandomColor;
Avatar.ConfigProvider = _context.ConfigProvider;
exports.default = (0, _assign2.default)((0, _context.withConfig)(Avatar), {
    getRandomColor: _utils.getRandomColor,
    ConfigProvider: _context.ConfigProvider
});