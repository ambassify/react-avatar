'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GoogleSource = function () {
    function GoogleSource(props) {
        var _this = this;

        _classCallCheck(this, GoogleSource);

        this.props = null;

        this.isCompatible = function () {
            return !!_this.props.vkontakteId;
        };

        this.get = function (setState) {
            var vkontakteId = _this.props.vkontakteId;

            var size = _this.getImageSize();
            var url = 'https://api.vk.com/method/users.get?user_id=' + vkontakteId + '&v=5.8&fields=' + size;

            (0, _utils.fetchJSONP)(url, function (data) {
                var src = data.response[0][size];
                setState({
                    src: src
                });
            }, function () {
                // on error
                setState(null);
            });
        };

        this.props = props;
    }

    _createClass(GoogleSource, [{
        key: 'getImageSize',
        value: function getImageSize() {
            var size = this.props.size;


            if (size <= 50) return 'photo_50';

            if (size <= 100) return 'photo_100';

            if (size <= 200) return 'photo_200';

            return 'photo_max';
        }
    }]);

    return GoogleSource;
}();

exports.default = GoogleSource;
module.exports = exports['default'];