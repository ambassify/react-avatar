'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SkypeSource = function SkypeSource(props) {
    var _this = this;

    (0, _classCallCheck3.default)(this, SkypeSource);
    this.props = null;

    this.isCompatible = function () {
        return !!_this.props.skypeId;
    };

    this.get = function (setState) {
        var skypeId = _this.props.skypeId;

        var url = 'https://api.skype.com/users/' + skypeId + '/profile/avatar';

        setState({ src: url });
    };

    this.props = props;
};

exports.default = SkypeSource;
module.exports = exports['default'];