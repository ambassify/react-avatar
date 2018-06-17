'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConfigProvider = exports.withConfig = undefined;

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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
    cache: _cache2.default,
    colors: _utils.defaultColors
};

/**
 * withConfig and ConfigProvider provide a compatibility layer for different
 * versions of React equiped with different versions of the Context API.
 *
 * If the new Context API is available it will be used, otherwise we will
 * fall back to the legacy context api.
 */

var ConfigContext = _react2.default.createContext && _react2.default.createContext();
var ConfigConsumer = ConfigContext ? ConfigContext.Consumer : null;

var withConfig = exports.withConfig = function withConfig(Component) {
    function withAvatarConfig(props) {
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var reactAvatar = context.reactAvatar;


        if (!ConfigConsumer) return _react2.default.createElement(Component, (0, _extends3.default)({}, defaults, reactAvatar, props));

        return _react2.default.createElement(
            ConfigConsumer,
            null,
            function (config) {
                return _react2.default.createElement(Component, (0, _extends3.default)({}, defaults, config, props));
            }
        );
    }

    withAvatarConfig.contextTypes = {
        reactAvatar: _propTypes2.default.object
    };

    return withAvatarConfig;
};

var ConfigProvider = exports.ConfigProvider = function (_React$Component) {
    (0, _inherits3.default)(ConfigProvider, _React$Component);

    function ConfigProvider() {
        (0, _classCallCheck3.default)(this, ConfigProvider);
        return (0, _possibleConstructorReturn3.default)(this, (ConfigProvider.__proto__ || (0, _getPrototypeOf2.default)(ConfigProvider)).apply(this, arguments));
    }

    (0, _createClass3.default)(ConfigProvider, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                reactAvatar: this._getContext()
            };
        }
    }, {
        key: '_getContext',
        value: function _getContext() {
            var _props = this.props,
                cache = _props.cache,
                colors = _props.colors;


            return { cache: cache, colors: colors };
        }
    }, {
        key: 'render',
        value: function render() {
            var children = this.props.children;


            if (!ConfigContext) return _react2.default.Children.only(children);

            return _react2.default.createElement(
                ConfigContext.Provider,
                { value: this._getContext() },
                _react2.default.Children.only(children)
            );
        }
    }]);
    return ConfigProvider;
}(_react2.default.Component);

ConfigProvider.displayName = 'ConfigProvider';
ConfigProvider.propTypes = {
    cache: _propTypes2.default.object,
    colors: _propTypes2.default.arrayOf(_propTypes2.default.string),

    children: _propTypes2.default.node
};
ConfigProvider.childContextTypes = {
    reactAvatar: _propTypes2.default.object
};