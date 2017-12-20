"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isUserNotExist = isUserNotExist;

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isUserNotExist(userId) {
    return _user2.default.findById(userId).then(function (user) {
        if (user) return false;else return true;
    }, function (err) {
        return true;
    });
}
//# sourceMappingURL=CheckMethods.js.map