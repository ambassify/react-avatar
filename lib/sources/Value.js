'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValueSource = function () {
    function ValueSource(props) {
        var _this = this;

        (0, _classCallCheck3.default)(this, ValueSource);
        this.props = null;

        this.isCompatible = function () {
            return !!(_this.props.name || _this.props.value || _this.props.email);
        };

        this.get = function (setState) {
            var value = _this.getValue();

            if (!value) return setState(null);

            setState({
                sourceName: 'text',
                value: value,
                color: _this.getColor()
            });
        };

        this.props = props;
    }

    (0, _createClass3.default)(ValueSource, [{
        key: 'getInitials',
        value: function getInitials() {
            var name = this.props.name;
            var maxInitials = this.props.maxInitials;
            var parts = name.split(' ');
            var initials = '';
            for (var i = 0; i < parts.length; i++) {
                initials += parts[i].substr(0, 1).toUpperCase();
            }
            return maxInitials ? initials.slice(0, maxInitials) : initials;
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
        value: function getColor() {
            var _props = this.props,
                color = _props.color,
                colors = _props.colors,
                name = _props.name,
                email = _props.email,
                value = _props.value;

            var colorValue = name || email || value;
            return color || (0, _utils.getRandomColor)(colorValue, colors);
        }
    }]);
    return ValueSource;
}();

ValueSource.propTypes = {
    name: _propTypes2.default.string,
    value: _propTypes2.default.string,
    email: _propTypes2.default.string,
    maxInitials: _propTypes2.default.number
};
exports.default = ValueSource;
module.exports = exports['default'];