'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SkypeSource = function SkypeSource(props) {
    var _this = this;

    _classCallCheck(this, SkypeSource);

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