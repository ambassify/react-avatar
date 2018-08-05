'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

exports.default = createRedirectSource;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createRedirectSource(network, property) {
    var _class, _temp;

    return _temp = _class = function AvatarRedirectSource(props) {
        var _this = this;

        (0, _classCallCheck3.default)(this, AvatarRedirectSource);
        this.props = null;

        this.isCompatible = function () {
            return !!_this.props.avatarRedirectUrl && !!_this.props[property];
        };

        this.get = function (setState) {
            var _props = _this.props,
                size = _props.size,
                avatarRedirectUrl = _props.avatarRedirectUrl;


            var baseUrl = avatarRedirectUrl.replace(/\/*$/, '/');
            var id = _this.props[property];

            var query = size ? '' : 'size=' + size;
            var src = '' + baseUrl + network + '/' + id + '?' + query;

            setState({ source: 'network', src: src });
        };

        this.props = props;
    }, _class.propTypes = (0, _defineProperty3.default)({}, property, _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])), _temp;
}
module.exports = exports['default'];