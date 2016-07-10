'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utils = require('../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GoogleSource = function GoogleSource(props) {
    var _this = this;

    _classCallCheck(this, GoogleSource);

    this.props = null;

    this.isCompatible = function () {
        return !!_this.props.googleId;
    };

    this.get = function (setState) {
        var _props = _this.props;
        var size = _props.size;
        var googleId = _props.googleId;

        var url = 'https://picasaweb.google.com/data/entry/api/user/' + googleId + '?alt=json';

        if ((0, _utils.hasSourceFailedBefore)(url)) {
            setState(null);
            return;
        }

        (0, _utils.fetch)(url, function (data) {
            var src = data.entry.gphoto$thumbnail.$t;
            var srcWithCorrectSize = src.replace('s64', 's' + size);
            setState({
                src: srcWithCorrectSize
            });
        }, function () {
            // on error
            (0, _utils.cacheFailingSource)(url);
            setState(null);
        });
    };

    this.props = props;
};

exports.default = GoogleSource;
module.exports = exports['default'];