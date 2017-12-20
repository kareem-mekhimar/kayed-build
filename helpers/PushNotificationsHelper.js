"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sendNotificationToUser = undefined;

var sendNotificationToUser = exports.sendNotificationToUser = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(title, body, userId, actionUrl) {
        var userNotifiToken, sentNotification;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return admin.database().ref("/fcmTokens/" + userId).once('value').then(function (token) {
                            return token.val();
                        });

                    case 2:
                        userNotifiToken = _context.sent;

                        console.log("USER TOKEN : ", userNotifiToken);

                        if (!userNotifiToken) {
                            _context.next = 15;
                            break;
                        }

                        _context.prev = 5;
                        _context.next = 8;
                        return (0, _requestPromise2.default)({
                            uri: 'https://fcm.googleapis.com/fcm/send',
                            method: 'POST',
                            headers: { 'Authorization': 'key=' + _config2.default.serverKeyFirebase },
                            json: {
                                "notification": {
                                    title: title,
                                    body: body,
                                    icon: 'https://image.flaticon.com/icons/png/128/148/148921.png',
                                    click_action: _config2.default.clientUrl + "/" + actionUrl
                                },
                                "to": userNotifiToken
                            }
                        });

                    case 8:
                        sentNotification = _context.sent;

                        if (sentNotification) console.log("Message Sent");else console.log("Message Not Sent");
                        _context.next = 15;
                        break;

                    case 12:
                        _context.prev = 12;
                        _context.t0 = _context["catch"](5);

                        console.log(_context.t0);

                    case 15:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[5, 12]]);
    }));

    return function sendNotificationToUser(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
    };
}();

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _firebaseAdmin = require("firebase-admin");

var admin = _interopRequireWildcard(_firebaseAdmin);

var _requestPromise = require("request-promise");

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//# sourceMappingURL=PushNotificationsHelper.js.map