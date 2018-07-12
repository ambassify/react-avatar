"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InternalState = function () {
    function InternalState() {
        (0, _classCallCheck3.default)(this, InternalState);

        this.sourcePointer = 0;
        this.active = true;
        this.fetch = null;
    }

    (0, _createClass3.default)(InternalState, [{
        key: "isActive",
        value: function isActive() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            // Internal state has been reset => we received new props
            if (state.internal !== this) return false;

            if (!this.fetch) return false;

            if (this.active !== true) return false;

            return true;
        }
    }]);
    return InternalState;
}();

exports.default = InternalState;
module.exports = exports["default"];