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

var VkontakteSource = function () {
    function VkontakteSource(props) {
        var _this = this;

        (0, _classCallCheck3.default)(this, VkontakteSource);
        this.props = null;

        this.isCompatible = function () {
            return !!_this.props.vkontakteId;
        };

        this.get = function (setState) {
            var vkontakteId = _this.props.vkontakteId;

            var size = _this.getImageSize();
            var url = 'https://api.vk.com/method/users.get?user_id=' + vkontakteId + '&v=5.8&fields=' + size;
            var onError = function onError() {
                return setState(null);
            };

            (0, _utils.fetchJSONP)(url, function (data) {
                var src = data && data.response && data.response[0];

                if (!src) return onError();

                setState({
                    sourceName: 'vkontakte',
                    src: src
                });
            }, onError);
        };

        this.props = props;
    }

    (0, _createClass3.default)(VkontakteSource, [{
        key: 'getImageSize',
        value: function getImageSize() {
            var size = this.props.size;


            if (size <= 50) return 'photo_50';

            if (size <= 100) return 'photo_100';

            if (size <= 200) return 'photo_200';

            return 'photo_max';
        }
    }]);
    return VkontakteSource;
}();

VkontakteSource.propTypes = {
    vkontakteId: _propTypes2.default.string
};
exports.default = VkontakteSource;
module.exports = exports['default'];