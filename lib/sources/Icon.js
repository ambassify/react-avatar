'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconSource = function IconSource(props) {
    var _this = this;

    (0, _classCallCheck3.default)(this, IconSource);
    this.props = null;
    this.icon = '✷';

    this.isCompatible = function () {
        return true;
    };

    this.get = function (setState) {
        var _props = _this.props,
            color = _props.color,
            colors = _props.colors;

        setState({
            sourceName: 'icon',
            value: _this.icon,
            color: color || (0, _utils.getRandomColor)(_this.icon, colors)
        });
    };

    this.props = props;
};

exports.default = IconSource;
module.exports = exports['default'];