'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValueSource = function () {
    function ValueSource(props) {
        var _this = this;

        (0, _classCallCheck3.default)(this, ValueSource);
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

    (0, _createClass3.default)(ValueSource, [{
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
module.exports = exports['default'];