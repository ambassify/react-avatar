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
            var _props = this.props,
                name = _props.name,
                initials = _props.initials;


            if (typeof initials === 'string') return initials;

            if (typeof initials === 'function') return initials(name, this.props);

            return (0, _utils.defaultInitials)(name, this.props);
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
            var _props2 = this.props,
                color = _props2.color,
                colors = _props2.colors,
                name = _props2.name,
                email = _props2.email,
                value = _props2.value;

            var colorValue = name || email || value;
            return color || (0, _utils.getRandomColor)(colorValue, colors);
        }
    }]);
    return ValueSource;
}();

ValueSource.propTypes = {
    color: _propTypes2.default.string,
    name: _propTypes2.default.string,
    value: _propTypes2.default.string,
    email: _propTypes2.default.string,
    maxInitials: _propTypes2.default.number,
    initials: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])
};
exports.default = ValueSource;
module.exports = exports['default'];