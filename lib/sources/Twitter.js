'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TwitterSource = function () {
    function TwitterSource(props) {
        var _this = this;

        _classCallCheck(this, TwitterSource);

        this.props = null;

        this.isCompatible = function () {
            return !!_this.props.twitterHandle;
        };

        this.get = function (setState) {
            var twitterHandle = _this.props.twitterHandle;

            var size = _this.getImageSize();

            var url = 'https://twitter.com/' + twitterHandle + '/profile_image?size=' + size;

            setState({ src: url });
        };

        this.props = props;
    }

    _createClass(TwitterSource, [{
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

exports.default = TwitterSource;
module.exports = exports['default'];