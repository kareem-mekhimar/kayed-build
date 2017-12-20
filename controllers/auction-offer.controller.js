"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _auctionOffer = require("../models/auction-offer.model");

var _auctionOffer2 = _interopRequireDefault(_auctionOffer);

var _auctionNotification = require("../models/auction-notification.model");

var _auctionNotification2 = _interopRequireDefault(_auctionNotification);

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

var _ApiResponse = require("../helpers/ApiResponse");

var _ApiResponse2 = _interopRequireDefault(_ApiResponse);

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

var _auction = require("../models/auction.model");

var _auction2 = _interopRequireDefault(_auction);

var _assert = require("assert");

var _PushNotificationsHelper = require("../helpers/PushNotificationsHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var validateAuctionOfferBody = function validateAuctionOfferBody(req, highestPrice) {
    req.checkBody("bidder").notEmpty().withMessage("bidder Required").custom(function (value) {
        return _user2.default.findById(value).then(function (user) {
            if (!user) throw new Error("bidder user Is Not Found");
        });
    }).withMessage("bidder is Not Found in the system");

    req.checkBody("price").notEmpty().withMessage("price required").matches(/\d/).withMessage("Invalid Number").custom(function (value) {
        return highestPrice < value;
    }).withMessage("price must be more than highest price");

    return req.getValidationResult();
};

var registerMyOfferInAuction = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(auctionId, userId) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _auction2.default.findByIdAndUpdate(auctionId, { $addToSet: { offerUsers: userId } }, { new: true });

                    case 2:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function registerMyOfferInAuction(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = {
    create: function create(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var auctionId, auction, result, offer, notification, io, nsp;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            auctionId = req.params.auctionId;
                            _context2.next = 3;
                            return _auction2.default.findById(auctionId);

                        case 3:
                            auction = _context2.sent;

                            if (auction) {
                                _context2.next = 8;
                                break;
                            }

                            return _context2.abrupt("return", next(new _ApiError2.default(404, "Auction Not Found")));

                        case 8:
                            _context2.next = 10;
                            return validateAuctionOfferBody(req, auction.highestPrice);

                        case 10:
                            result = _context2.sent;

                            if (result.isEmpty()) {
                                _context2.next = 15;
                                break;
                            }

                            return _context2.abrupt("return", next(new _ApiError2.default(422, result.mapped())));

                        case 15:
                            if (!req.body.winned) {
                                _context2.next = 17;
                                break;
                            }

                            return _context2.abrupt("return", next(new _ApiError2.default(403, "You aren't allowed to overwrite this field")));

                        case 17:

                            req.body.relatedAuction = auctionId;
                            _context2.next = 20;
                            return _auctionOffer2.default.create(req.body);

                        case 20:
                            offer = _context2.sent;


                            auction.highestPrice = offer.price;
                            auction.save();

                            _context2.next = 25;
                            return _auctionOffer2.default.findById(offer.id).populate("bidder relatedAuction");

                        case 25:
                            offer = _context2.sent;

                            res.status(201).send(offer);
                            registerMyOfferInAuction(auctionId, req.user.id);

                            notification = {
                                user: auction.relatedUser,
                                relatedAuction: auctionId,
                                bidder: req.user.id
                            };
                            _context2.next = 31;
                            return _auctionNotification2.default.create(notification);

                        case 31:
                            notification = _context2.sent;
                            _context2.next = 34;
                            return _auctionNotification2.default.findById(notification.id).populate("bidder relatedAuction");

                        case 34:
                            notification = _context2.sent;
                            io = req.app.get('io');
                            nsp = io.of("/notifications/" + auction.relatedUser + "/auctions");

                            nsp.emit("newMessage", notification);

                            (0, _PushNotificationsHelper.sendNotificationToUser)('مزايدة جديدة', auction.title + " : \u0642\u0627\u0645 \u0628\u0627\u0644\u0645\u0632\u0627\u064A\u062F\u0629 \u0639\u0644\u0649  " + offer.bidder.fullName, auction.relatedUser, "auctions/" + auction.id);

                        case 39:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this);
        }))();
    }
};
//# sourceMappingURL=auction-offer.controller.js.map