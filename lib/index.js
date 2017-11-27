'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils.js');

var _Gravatar = require('./sources/Gravatar.js');

var _Gravatar2 = _interopRequireDefault(_Gravatar);

var _Facebook = require('./sources/Facebook.js');

var _Facebook2 = _interopRequireDefault(_Facebook);

var _Vkontakte = require('./sources/Vkontakte.js');

var _Vkontakte2 = _interopRequireDefault(_Vkontakte);

var _Twitter = require('./sources/Twitter.js');

var _Twitter2 = _interopRequireDefault(_Twitter);

var _Google = require('./sources/Google.js');

var _Google2 = _interopRequireDefault(_Google);

var _Skype = require('./sources/Skype.js');

var _Skype2 = _interopRequireDefault(_Skype);

var _Value = require('./sources/Value.js');

var _Value2 = _interopRequireDefault(_Value);

var _Src = require('./sources/Src.js');

var _Src2 = _interopRequireDefault(_Src);

var _Icon = require('./sources/Icon.js');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SOURCES = [_Facebook2.default, _Google2.default, _Twitter2.default, _Vkontakte2.default, _Skype2.default, _Gravatar2.default, _Src2.default, _Value2.default, _Icon2.default];

var Avatar = function (_PureComponent) {
    (0, _inherits3.default)(Avatar, _PureComponent);

    function Avatar(props) {
        (0, _classCallCheck3.default)(this, Avatar);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Avatar.__proto__ || (0, _getPrototypeOf2.default)(Avatar)).call(this, props));

        _this.tryNextsource = function (Source, next) {

            var instance = new Source(_this.props);

            if (!instance.isCompatible(_this.props)) return next();

            instance.get(function (state) {
                var failedBefore = state && state.hasOwnProperty('src') && (0, _utils.hasSourceFailedBefore)(state.src);

                if (!failedBefore && state) {
                    // console.log(state);
                    _this.setState(state);
                } else {
                    next();
                }
            });
        };

        _this.fetch = function (event) {
            // If fetch was triggered by img onError
            // then set state src back to null so render will
            // automatically switch a text avatar if there is no
            // other social ID available to try
            if (event && event.type === 'error') {
                (0, _utils.cacheFailingSource)(_this.state.src);
                _this.setState({ src: null });
            }

            // console.log('## fetch');

            var id = _this._fetchId = _this._fetchId ? _this._fetchId + 1 : 1;

            var tryFetch = function tryFetch() {
                if (SOURCES.length === _this.state._internal.sourcePointer) return;

                var source = SOURCES[_this.state._internal.sourcePointer];

                var internal = _this.state._internal;
                internal.sourcePointer++;

                // console.log('## try fetch', id, this._fetchId, internal.sourcePointer-1);
                _this.setState({
                    _internal: internal
                }, function () {
                    _this.tryNextsource(source, function () {
                        // console.log('-- next', id, this._fetchId);
                        if (id === _this._fetchId) {
                            tryFetch();
                        }
                    });
                });
            };

            tryFetch();
        };

        _this.state = {
            _internal: {
                sourcePointer: 0
            },
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
            var nextState = {};
            if (newProps.src !== this.props.src) nextState.src = newProps.src;

            if (newProps.name !== this.props.name) nextState.name = newProps.name;

            if (newProps.maxInitials !== this.props.maxInitials) nextState.maxInitials = newProps.maxInitials;

            if (newProps.value !== this.props.value) nextState.value = newProps.value;

            if (newProps.email !== this.props.email) nextState.email = newProps.email;

            if (newProps.md5Email !== this.props.md5Email) nextState.md5Email = newProps.md5Email;

            if (newProps.facebookId !== this.props.facebookId) nextState.facebookId = newProps.facebookId;

            if (newProps.googleId !== this.props.googleId) nextState.googleId = newProps.googleId;

            if (newProps.twitterHandle !== this.props.twitterHandle) nextState.twitterHandle = newProps.twitterHandle;

            if (newProps.vkontakteId !== this.props.vkontakteId) nextState.vkontakteId = newProps.vkontakteId;

            if (newProps.skypeId !== this.props.skypeId) nextState.skypeId = newProps.skypeId;

            if ((0, _keys2.default)(nextState) !== 0) {
                nextState._internal = this.state._internal;
                nextState._internal.sourcePointer = 0;
                this.setState(nextState, this.fetch);
            }
        }
    }, {
        key: '_renderAsImage',
        value: function _renderAsImage() {
            var size = this.props.size;
            var round = this.props.round;
            var alt = this.props.name || this.props.value;
            var imageStyle = this.props.unstyled ? null : {
                maxWidth: '100%',
                width: size,
                height: size,
                borderRadius: round ? 500 : 0
            };
            return _react2.default.createElement('img', { width: this.props.size,
                height: this.props.size,
                style: imageStyle,
                src: this.state.src,
                alt: alt,
                onError: this.fetch });
        }
    }, {
        key: '_renderAsText',
        value: function _renderAsText() {
            var size = this.props.size;
            var textSizeRatio = this.props.textSizeRatio;
            var round = this.props.round;
            var initialsStyle = this.props.unstyled ? null : {
                width: size,
                height: size,
                font: Math.floor(size / textSizeRatio) + 'px Helvetica, Arial, sans-serif',
                lineHeight: size + 'px', // yes, px suffix is needed on lineHeight
                textAlign: 'center',
                textTransform: 'uppercase',
                color: this.props.fgColor,
                background: this.state.color,
                borderRadius: round ? '100%' : 0
            };
            return _react2.default.createElement(
                'div',
                { style: initialsStyle },
                this.state.value
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var size = this.props.size;
            var hostStyle = this.props.unstyled ? null : (0, _extends3.default)({
                display: 'inline-block',
                width: size,
                height: size,
                borderRadius: this.props.round ? 500 : 0
            }, this.props.style);
            return _react2.default.createElement(
                'div',
                { className: this.props.className, onClick: this.props.onClick,
                    style: hostStyle },
                this.state.src ? this._renderAsImage() : this._renderAsText()
            );
        }
    }]);
    return Avatar;
}(_react.PureComponent);

Avatar.displayName = 'Avatar';
Avatar.propTypes = {
    className: _propTypes2.default.string,
    fgColor: _propTypes2.default.string,
    color: _propTypes2.default.string,
    colors: _propTypes2.default.array,
    name: _propTypes2.default.string,
    maxInitials: _propTypes2.default.number,
    value: _propTypes2.default.string,
    email: _propTypes2.default.string,
    md5Email: _propTypes2.default.string,
    src: _propTypes2.default.string,
    facebookId: _propTypes2.default.string,
    googleId: _propTypes2.default.string,
    twitterHandle: _propTypes2.default.string,
    vkontakteId: _propTypes2.default.string,
    skypeId: _propTypes2.default.string,
    round: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    size: _propTypes2.default.number,
    textSizeRatio: _propTypes2.default.number,
    unstyled: _propTypes2.default.bool,
    onClick: _propTypes2.default.func
};
Avatar.defaultProps = {
    className: 'sb-avatar',
    fgColor: '#FFF',
    color: null,
    name: null,
    maxInitials: null,
    value: null,
    email: null,
    md5Email: null,
    facebookId: null,
    googleId: null,
    twitterHandle: null,
    vkontakteId: null,
    skypeId: null,
    round: false,
    size: 100,
    style: null,
    textSizeRatio: 3,
    unstyled: false
};
exports.default = Avatar;
module.exports = exports['default'];