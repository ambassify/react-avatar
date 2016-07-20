'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SrcSource = function SrcSource(props) {
    var _this = this;

    (0, _classCallCheck3.default)(this, SrcSource);
    this.props = null;

    this.isCompatible = function () {
        return !!_this.props.src;
    };

    this.get = function (setState) {
        setState({
            src: _this.props.src
        });
    };

    this.props = props;
};

exports.default = SrcSource;
module.exports = exports['default'];