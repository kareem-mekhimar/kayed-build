"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _barter = require("../models/barter.model");

var _barter2 = _interopRequireDefault(_barter);

var _barterOffer = require("../models/barter-offer.model");

var _barterOffer2 = _interopRequireDefault(_barterOffer);

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _utils = require("../utils");

var _barterOfferNotification = require("../models/barter-offer-notification.model");

var _barterOfferNotification2 = _interopRequireDefault(_barterOfferNotification);

var _ApiResponse = require("../helpers/ApiResponse");

var _ApiResponse2 = _interopRequireDefault(_ApiResponse);

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

var _PushNotificationsHelper = require("../helpers/PushNotificationsHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var validateBarterOffer = function validateBarterOffer(req) {
    var isUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (isUpdate) req.checkBody("status").isIn(['PENDING', 'ACCEPTED', 'REJECTED', 'DONE']).withMessage('valid status is required');else {
        req.checkBody("relatedUser").notEmpty().withMessage("relatedUser is Required").custom(function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
                var user;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _user2.default.findById(value);

                            case 2:
                                user = _context.sent;

                                if (user) {
                                    _context.next = 5;
                                    break;
                                }

                                throw new Error();

                            case 5:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, undefined);
            }));

            return function (_x2) {
                return _ref.apply(this, arguments);
            };
        }()).withMessage('Enter a valid user id');
        req.checkBody("description").notEmpty().withMessage("description is required");
        req.checkBody("offeredProduct").notEmpty().withMessage("offeredProduct is required");
        req.checkBody("imgs").notEmpty().withMessage("imgs is required").isArray().withMessage("Imgs Should be an array of imgs's base64");
        req.checkBody("status").optional().matches('PENDING').withMessage("you can't overwrite status it's PENDING by default");
    }
    req.checkParams("barterId").custom(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value) {
            var barter;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _barter2.default.findById(value);

                        case 2:
                            barter = _context2.sent;

                            if (!barter) new new Error()();

                        case 4:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function (_x3) {
            return _ref2.apply(this, arguments);
        };
    }()).withMessage('Barter Not Found');

    return req.getValidationResult();
};

var registerMyOfferInBarter = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(barterId, userId) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return _barter2.default.findByIdAndUpdate(barterId, { $addToSet: { offerUsers: userId } }, { new: true });

                    case 2:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function registerMyOfferInBarter(_x4, _x5) {
        return _ref3.apply(this, arguments);
    };
}();

exports.default = {
    findAll: function findAll(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var barterId, _req$query, page, limit, status, query, barterOffers, barterOffersCount, pageCount, response;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            barterId = req.params.barterId;
                            _req$query = req.query, page = _req$query.page, limit = _req$query.limit, status = _req$query.status;
                            query = {
                                relatedBarter: barterId
                            };


                            if (status && ['PENDING', 'ACCEPTED', 'REJECTED', 'DONE'].includes(status)) query.status = status;

                            page = page ? parseInt(page) : 1;
                            limit = limit ? parseInt(limit) : 20;

                            _context4.prev = 6;
                            _context4.next = 9;
                            return _barterOffer2.default.find(query).populate('relatedBarter relatedUser').sort({ creationDate: -1 }).limit(limit).skip((page - 1) * limit);

                        case 9:
                            barterOffers = _context4.sent;
                            _context4.next = 12;
                            return _barterOffer2.default.count(query);

                        case 12:
                            barterOffersCount = _context4.sent;
                            pageCount = Math.ceil(barterOffersCount / limit);
                            response = new _ApiResponse2.default(barterOffers, page, pageCount, limit, barterOffersCount);

                            response.addSelfLink(req);

                            if (page > 1) {
                                response.addPrevLink(req);
                            }
                            if (page < pageCount) {
                                response.addNextLink(req);
                            }
                            res.send(response);
                            _context4.next = 24;
                            break;

                        case 21:
                            _context4.prev = 21;
                            _context4.t0 = _context4["catch"](6);

                            next(_context4.t0);

                        case 24:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, _this, [[6, 21]]);
        }))();
    },
    createBarterOffer: function createBarterOffer(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var validationErrors, barterId, newBarterOfferId, createdBarterOffer, barterOffer, barter, barterOfferNotification, io, nsp;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return validateBarterOffer(req);

                        case 2:
                            validationErrors = _context5.sent;

                            if (validationErrors.isEmpty()) {
                                _context5.next = 5;
                                break;
                            }

                            return _context5.abrupt("return", next(new _ApiError2.default(422, validationErrors.mapped())));

                        case 5:
                            barterId = req.params.barterId;
                            _context5.prev = 6;
                            newBarterOfferId = _mongoose2.default.Types.ObjectId();

                            if (req.body.imgs) req.body.imgs = (0, _utils.handleImgs)(req.body.imgs, "barter-offers", newBarterOfferId, req);
                            req.body.relatedBarter = barterId;

                            _context5.next = 12;
                            return _barterOffer2.default.create(_extends({ _id: newBarterOfferId }, req.body));

                        case 12:
                            createdBarterOffer = _context5.sent;
                            _context5.next = 15;
                            return _barter2.default.findByIdAndUpdate(barterId, { $push: { offerUsers: req.user.id } });

                        case 15:
                            _context5.next = 17;
                            return _barterOffer2.default.findById(createdBarterOffer.id).populate('relatedBarter relatedUser');

                        case 17:
                            barterOffer = _context5.sent;

                            res.status(201).send(barterOffer);

                            registerMyOfferInBarter(barterId, req.user.id);

                            _context5.next = 22;
                            return _barter2.default.findById(barterId);

                        case 22:
                            barter = _context5.sent;
                            barterOfferNotification = {
                                user: barter.relatedUser,
                                relatedBarter: barterId,
                                offerUser: req.user.id
                            };
                            _context5.next = 26;
                            return _barterOfferNotification2.default.create(barterOfferNotification);

                        case 26:
                            barterOfferNotification = _context5.sent;
                            _context5.next = 29;
                            return _barterOfferNotification2.default.findById(barterOfferNotification.id).populate("offerUser relatedBarter");

                        case 29:
                            barterOfferNotification = _context5.sent;
                            io = req.app.get('io');
                            nsp = io.of("/notifications/" + barter.relatedUser + "/barter-offers");

                            nsp.emit("newMessage", barterOfferNotification);

                            (0, _PushNotificationsHelper.sendNotificationToUser)('مقايضة جديدة', " \u0623\u0631\u0633\u0644 \u0625\u0644\u064A\u0643 \u0637\u0644\u0628 \u062E\u062F\u0645\u0629 : " + barterOfferNotification.offerUser.fullName, barter.relatedUser, "barters/" + barter.id);
                            _context5.next = 39;
                            break;

                        case 36:
                            _context5.prev = 36;
                            _context5.t0 = _context5["catch"](6);

                            next(_context5.t0);

                        case 39:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, _this2, [[6, 36]]);
        }))();
    },
    findById: function findById(req, res, next) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var _req$params, barterId, offerId, barterOffer;

            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _req$params = req.params, barterId = _req$params.barterId, offerId = _req$params.offerId;
                            _context6.prev = 1;
                            _context6.next = 4;
                            return _barterOffer2.default.findOne({ _id: offerId, relatedBarter: barterId }).populate('relatedBarter relatedUser');

                        case 4:
                            barterOffer = _context6.sent;

                            if (barterOffer) {
                                _context6.next = 7;
                                break;
                            }

                            return _context6.abrupt("return", next(new _ApiError2.default.NotFound('BarterOffer')));

                        case 7:

                            res.send(barterOffer);
                            _context6.next = 13;
                            break;

                        case 10:
                            _context6.prev = 10;
                            _context6.t0 = _context6["catch"](1);

                            next(_context6.t0);

                        case 13:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, _this3, [[1, 10]]);
        }))();
    },


    // Update Status of BarterOffer only
    updateBarterOffer: function updateBarterOffer(req, res, next) {
        var _this4 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            var validationErrors, _req$params2, barterId, offerId, barterOffer, updatedBarterOffer;

            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.next = 2;
                            return validateBarterOffer(req, true);

                        case 2:
                            validationErrors = _context7.sent;

                            if (validationErrors.isEmpty()) {
                                _context7.next = 5;
                                break;
                            }

                            return _context7.abrupt("return", next(new _ApiError2.default(422, validationErrors.mapped())));

                        case 5:
                            _req$params2 = req.params, barterId = _req$params2.barterId, offerId = _req$params2.offerId;
                            _context7.prev = 6;
                            _context7.next = 9;
                            return _barterOffer2.default.findOne({ _id: offerId, relatedBarter: barterId }).populate('relatedUser');

                        case 9:
                            barterOffer = _context7.sent;

                            if (barterOffer) {
                                _context7.next = 12;
                                break;
                            }

                            return _context7.abrupt("return", next(new _ApiError2.default.NotFound('BarterOffer')));

                        case 12:
                            _context7.t0 = barterOffer.status;
                            _context7.next = _context7.t0 === 'PENDING' ? 15 : _context7.t0 === 'ACCEPTED' ? 18 : _context7.t0 === 'REJECTED' ? 21 : _context7.t0 === 'DONE' ? 21 : 23;
                            break;

                        case 15:
                            if (req.body.status === 'ACCEPTED' || req.body.status === 'REJECTED') {
                                _context7.next = 17;
                                break;
                            }

                            return _context7.abrupt("return", next(new _ApiError2.default(400, 'status should be ACCEPTED or REJECTED')));

                        case 17:
                            return _context7.abrupt("break", 23);

                        case 18:
                            if (req.body.status === 'DONE' || req.body.status === 'REJECTED') {
                                _context7.next = 20;
                                break;
                            }

                            return _context7.abrupt("return", next(new _ApiError2.default(400, 'status should be DONE or REJECTED')));

                        case 20:
                            return _context7.abrupt("break", 23);

                        case 21:
                            return _context7.abrupt("return", next(new _ApiError2.default(400, "you can't update DONE or REJECTED offer")));

                        case 23:
                            if (!(req.body.status === 'DONE')) {
                                _context7.next = 26;
                                break;
                            }

                            _context7.next = 26;
                            return _barter2.default.findByIdAndUpdate(barterId, {
                                barterOffer: barterOffer.id, finished: true
                            });

                        case 26:
                            _context7.next = 28;
                            return _barterOffer2.default.findByIdAndUpdate(offerId, { status: req.body.status }, { new: true });

                        case 28:
                            updatedBarterOffer = _context7.sent;

                            res.status(200).send(updatedBarterOffer);
                            _context7.next = 35;
                            break;

                        case 32:
                            _context7.prev = 32;
                            _context7.t1 = _context7["catch"](6);

                            next(_context7.t1);

                        case 35:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, _this4, [[6, 32]]);
        }))();
    }
};
//# sourceMappingURL=barter-offer.controller.js.map