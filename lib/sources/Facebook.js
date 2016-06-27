'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FacebookSource = function FacebookSource(props) {
    var _this = this;

    _classCallCheck(this, FacebookSource);

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