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
module.exports = exports['default'];