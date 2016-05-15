'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('./index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Demo = function (_React$Component) {
  _inherits(Demo, _React$Component);

  function Demo() {
    _classCallCheck(this, Demo);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Demo).apply(this, arguments));
  }

  _createClass(Demo, [{
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
          _react2.default.createElement(_index2.default, { color: '#00FF00', name: 'Wim Mostmans', size: 40 }),
          _react2.default.createElement(_index2.default, { name: 'Wim Mostmans', size: 100, round: true }),
          _react2.default.createElement(_index2.default, { name: 'Wim Mostmans', size: 150 }),
          _react2.default.createElement(_index2.default, { name: 'Wim Mostmans', size: 200 })
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
          _react2.default.createElement(_index2.default, { size: 150, facebookId: 'invalidfacebookusername', src: 'https://thumbs.dreamstime.com/m/cute-monster-avatar-smiling-face-yellow-color-52010608.jpg' })
        ),
        _react2.default.createElement(
          'section',
          null,
          _react2.default.createElement(
            'h2',
            null,
            'Double fallback: Facebook to Google to initials'
          ),
          _react2.default.createElement(_index2.default, { facebookId: 'invalidfacebookusername', googleId: 'invalidgoogleid', name: 'Sitebase', size: 200, round: true })
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