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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TwitterSource = function () {
    function TwitterSource(props) {
        var _this = this;

        (0, _classCallCheck3.default)(this, TwitterSource);
        this.props = null;

        this.isCompatible = function () {
            return !!_this.props.twitterHandle;
        };

        this.get = function (setState) {
            var twitterHandle = _this.props.twitterHandle;

            var size = _this.getImageSize();

            var url = 'https://twitter.com/' + twitterHandle + '/profile_image?size=' + size;

            setState({
                sourceName: 'twitter',
                src: url
            });
        };

        this.props = props;
    }

    (0, _createClass3.default)(TwitterSource, [{
        key: 'getImageSize',
        value: function getImageSize() {
            var size = this.props.size;


            if (size <= 24) return 'mini';

            if (size <= 48) return 'normal';

            if (size <= 73) return 'bigger';

            return 'original';
        }
    }]);
    return TwitterSource;
}();

TwitterSource.propTypes = {
    twitterHandle: _propTypes2.default.string
};
exports.default = TwitterSource;
module.exports = exports['default'];