'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FacebookSource = function FacebookSource(props) {
    var _this = this;

    (0, _classCallCheck3.default)(this, FacebookSource);
    this.props = null;

    this.isCompatible = function () {
        return !!_this.props.facebookId;
    };

    this.get = function (setState) {
        var _props = _this.props;
        var size = _props.size;
        var facebookId = _props.facebookId;

        var url = 'https://graph.facebook.com/' + (facebookId + '/picture?width=' + size + '&height=' + size);

        setState({ src: url });
    };

    this.props = props;
};

exports.default = FacebookSource;
module.exports = exports['default'];