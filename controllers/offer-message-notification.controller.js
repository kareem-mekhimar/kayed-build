"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

var _offerMessageNotification = require("../models/offer-message-notification.model");

var _offerMessageNotification2 = _interopRequireDefault(_offerMessageNotification);

var _ApiResponse = require("../helpers/ApiResponse");

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

var _CheckMethods = require("../helpers/CheckMethods");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    findAll: function findAll(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var _req$query, page, limit, notifications, notificationsCount, pageCount, response;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return (0, _CheckMethods.isUserNotExist)(req.params.id);

                        case 2:
                            if (!_context.sent) {
                                _context.next = 4;
                                break;
                            }

                            return _context.abrupt("return", next(new _ApiError2.default.NotFound('User')));

                        case 4:
                            _req$query = req.query, page = _req$query.page, limit = _req$query.limit;


                            page = page ? parseInt(page) : 1;
                            limit = limit ? parseInt(limit) : 20;

                            _context.prev = 7;
                            _context.next = 10;
                            return _offerMessageNotification2.default.find({ user: req.params.id }).populate("fromUser relatedBarter").sort({ creationDate: -1 }).limit(limit).skip((page - 1) * limit);

                        case 10:
                            notifications = _context.sent;
                            _context.next = 13;
                            return _offerMessageNotification2.default.count({ user: req.params.id });

                        case 13:
                            notificationsCount = _context.sent;
                            pageCount = Math.ceil(notificationsCount / limit);
                            response = new _ApiResponse.ApiResponse2(notifications, page, pageCount, limit, notificationsCount, req);


                            res.send(response);
                            _context.next = 22;
                            break;

                        case 19:
                            _context.prev = 19;
                            _context.t0 = _context["catch"](7);

                            next(_context.t0);

                        case 22:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[7, 19]]);
        }))();
    },
    findManyUnseen: function findManyUnseen(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var notifications;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return (0, _CheckMethods.isUserNotExist)(req.params.id);

                        case 2:
                            if (!_context2.sent) {
                                _context2.next = 4;
                                break;
                            }

                            return _context2.abrupt("return", next(new _ApiError2.default.NotFound('User')));

                        case 4:
                            _context2.next = 6;
                            return _offerMessageNotification2.default.find({ user: req.params.id, seen: false }).populate("fromUser relatedBarter").sort({ creationDate: -1 }).limit(10);

                        case 6:
                            notifications = _context2.sent;


                            res.send(notifications);

                        case 8:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    },
    resetAll: function resetAll(req, res, next) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return (0, _CheckMethods.isUserNotExist)(req.params.id);

                        case 2:
                            if (!_context3.sent) {
                                _context3.next = 4;
                                break;
                            }

                            return _context3.abrupt("return", next(new _ApiError2.default.NotFound('User')));

                        case 4:
                            _context3.next = 6;
                            return _offerMessageNotification2.default.update({ user: req.params.id, seen: false }, { seen: true }, { multi: true });

                        case 6:

                            res.status(204).end();

                        case 7:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }))();
    }
};
//# sourceMappingURL=offer-message-notification.controller.js.map