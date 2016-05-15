'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SrcSource = function SrcSource(props) {
    var _this = this;

    _classCallCheck(this, SrcSource);

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