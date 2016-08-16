'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('./index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Demo = function (_React$Component) {
  (0, _inherits3.default)(Demo, _React$Component);

  function Demo() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Demo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(Demo)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      name: 'Wim Mostmans',
      skypeId: null
    }, _this._onChangeName = function () {
      _this.setState({
        name: 'Foo Bar',
        skypeId: null
      });
    }, _this._onSetSkype = function () {
      _this.setState({ skypeId: 'sitebase' });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Demo, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'section',
          null,
          _react2.default.createElement(
            'h2',
            null,
            'Gravatar'
          ),
          _react2.default.createElement(_index2.default, { className: 'myCustomClass', md5Email: '8c5d4c4b9ef6c68c4ff91c319d4c56be', size: 40 }),
          _react2.default.createElement(_index2.default, { md5Email: '8c5d4c4b9ef6c68c4ff91c319d4c56be', size: 100, round: true }),
          _react2.default.createElement(_index2.default, { md5Email: '8c5d4c4b9ef6c68c4ff91c319d4c56be', size: 150 }),
          _react2.default.createElement(_index2.default, { md5Email: '8c5d4c4b9ef6c68c4ff91c319d4c56be', size: 200 })
        ),
        _react2.default.createElement(
          'section',
          null,
          _react2.default.createElement(
            'h2',
            null,
            'Invalid gravatar'
          ),
          _react2.default.createElement(_index2.default, { email: 'bla', name: 'Jim Jones', size: 80 })
        ),
        _react2.default.createElement(
          'section',
          null,
          _react2.default.createElement(
            'h2',
            null,
            'Google+'
          ),
          _react2.default.createElement(_index2.default, { googleId: '116933859726289749306', size: 40 }),
          _react2.default.createElement(_index2.default, { googleId: '116933859726289749306', size: 100, round: true }),
          _react2.default.createElement(_index2.default, { googleId: '116933859726289749306', size: 150 }),
          _react2.default.createElement(_index2.default, { googleId: '116933859726289749306', size: 200 })
        ),
        _react2.default.createElement(
          'section',
          null,
          _react2.default.createElement(
            'h2',
            null,
            'Facebook'
          ),
          _react2.default.createElement(_index2.default, { facebookId: '100008343750912', size: 40 }),
          _react2.default.createElement(_index2.default, { facebookId: '100008343750912', size: 100, round: true }),
          _react2.default.createElement(_index2.default, { facebookId: '100008343750912', size: 150 }),
          _react2.default.createElement(_index2.default, { facebookId: '100008343750912', size: 200 })
        ),
        _react2.default.createElement(
          'section',
          null,
          _react2.default.createElement(
            'h2',
            null,
            'Twitter'
          ),
          _react2.default.createElement(_index2.default, { twitterHandle: 'sitebase', size: 40 }),
          _react2.default.createElement(_index2.default, { twitterHandle: 'sitebase', size: 100, round: true }),
          _react2.default.createElement(_index2.default, { twitterHandle: 'sitebase', size: 150 }),
          _react2.default.createElement(_index2.default, { twitterHandle: 'sitebase', size: 200 })
        ),
        _react2.default.createElement(
          'section',
          null,
          _react2.default.createElement(
            'h2',
            null,
            'Vkontakte'
          ),
          _react2.default.createElement(_index2.default, { vkontakteId: '1', size: 40 }),
          _react2.default.createElement(_index2.default, { vkontakteId: '1', size: 100, round: true }),
          _react2.default.createElement(_index2.default, { vkontakteId: '1', size: 150 }),
          _react2.default.createElement(_index2.default, { vkontakteId: '1', size: 200 })
        ),
        _react2.default.createElement(
          'section',
          null,
          _react2.default.createElement(
            'h2',
            null,
            'Skype'
          ),
          _react2.default.createElement(_index2.default, { skypeId: 'sitebase', size: 40 }),
          _react2.default.createElement(_index2.default, { skypeId: 'sitebase', size: 100, round: true }),
          _react2.default.createElement(_index2.default, { skypeId: 'sitebase', size: 150 }),
          _react2.default.createElement(_index2.default, { skypeId: 'sitebase', size: 200 })
        ),
        _react2.default.createElement(
          'section',
          null,
          _react2.default.createElement(
            'h2',
            null,
            'Initials'
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'button',
              { onClick: this._onChangeName },
              'Change name'
            ),
            _react2.default.createElement(
              'button',
              { onClick: this._onSetSkype },
              'Set skype ID'
            )
          ),
          _react2.default.createElement(_index2.default, { name: this.state.name, skypeId: this.state.skypeId, size: 40 }),
          _react2.default.createElement(_index2.default, { name: this.state.name, size: 100, round: true }),
          _react2.default.createElement(_index2.default, { name: this.state.name, size: 150 }),
          _react2.default.createElement(_index2.default, { name: this.state.name, size: 200 })
        ),
        _react2.default.createElement(
          'section',
          null,
          _react2.default.createElement(
            'h2',
            null,
            'Value'
          ),
          _react2.default.createElement(_index2.default, { value: '86%', size: 40 }),
          _react2.default.createElement(_index2.default, { value: '86%', size: 100, round: true }),
          _react2.default.createElement(_index2.default, { value: '86%', size: 150 }),
          _react2.default.createElement(_index2.default, { value: '86%', size: 200 })
        ),
        _react2.default.createElement(
          'section',
          null,
          _react2.default.createElement(
            'h2',
            null,
            'Fallback to static src'
          ),
          _react2.default.createElement(_index2.default, { size: 150, facebookId: 'invalidfacebookusername', src: 'https://thumbs.dreamstime.com/m/cute-monster-avatar-smiling-face-yellow-color-52010608.jpg', name: 'Foo Bar' })
        ),
        _react2.default.createElement(
          'section',
          null,
          _react2.default.createElement(
            'h2',
            null,
            'Double fallback: Facebook to Google to initials'
          ),
          _react2.default.createElement(_index2.default, { facebookId: 'invalidfacebookusername',
            googleId: 'invalidgoogleid',
            name: 'Sitebase',
            size: 200,
            round: true })
        ),
        _react2.default.createElement(
          'section',
          null,
          _react2.default.createElement(
            'h2',
            null,
            'Custom style'
          ),
          _react2.default.createElement(_index2.default, {
            name: 'Wim Mostmans',
            style: { borderRadius: 10, border: 'solid 10px rgba(0,0,0,0.5)' },
            size: 100 })
        )
      );
    }
  }]);
  return Demo;
}(_react2.default.Component);

exports.default = Demo;


var mountNode = document.getElementById('container');
_reactDom2.default.render(_react2.default.createElement(Demo, null), mountNode);
module.exports = exports['default'];