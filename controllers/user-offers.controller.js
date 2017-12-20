"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

var _barter = require("../models/barter.model");

var _barter2 = _interopRequireDefault(_barter);

var _auction = require("../models/auction.model");

var _auction2 = _interopRequireDefault(_auction);

var _ApiResponse = require("../helpers/ApiResponse");

var _ApiResponse2 = _interopRequireDefault(_ApiResponse);

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

var _barterOffer = require("../models/barter-offer.model");

var _barterOffer2 = _interopRequireDefault(_barterOffer);

var _auctionOffer = require("../models/auction-offer.model");

var _auctionOffer2 = _interopRequireDefault(_auctionOffer);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _BarterAuctionHelper = require("../helpers/Barter&AuctionHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var checkIfUserExist = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, next) {
        var user;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _user2.default.findById(id);

                    case 2:
                        user = _context.sent;

                        if (user) {
                            _context.next = 5;
                            break;
                        }

                        return _context.abrupt("return", next(new _ApiError2.default.NotFound('User')));

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function checkIfUserExist(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

exports.default = {
    getUserBartersInMyOffers: function getUserBartersInMyOffers(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var id, query, _req$query, page, limit, status, userBartersOffers, userBartersInMyOffersCount, parentBarters, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, userBarterOffer, pageCount, response;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            id = req.params.id;

                            checkIfUserExist(id, next);

                            query = { relatedUser: req.user.id };
                            _req$query = req.query, page = _req$query.page, limit = _req$query.limit, status = _req$query.status;


                            if (status && ['PENDING', 'ACCEPTED', 'REJECTED', 'DONE'].includes(status)) query.status = status;

                            page = page ? parseInt(page) : 1;
                            limit = limit ? parseInt(limit) : 20;

                            _context2.prev = 7;
                            _context2.next = 10;
                            return _barterOffer2.default.find(query).populate({
                                path: 'relatedBarter',
                                model: 'barter',
                                populate: {
                                    path: 'relatedUser relatedCategory barterOffer'
                                }
                            }).sort({ creationDate: -1 }).limit(limit).skip((page - 1) * limit);

                        case 10:
                            userBartersOffers = _context2.sent;
                            _context2.next = 13;
                            return _barterOffer2.default.count(query);

                        case 13:
                            userBartersInMyOffersCount = _context2.sent;
                            parentBarters = [];
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context2.prev = 18;


                            for (_iterator = userBartersOffers[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                userBarterOffer = _step.value;

                                parentBarters.push(userBarterOffer.relatedBarter);
                            }_context2.next = 26;
                            break;

                        case 22:
                            _context2.prev = 22;
                            _context2.t0 = _context2["catch"](18);
                            _didIteratorError = true;
                            _iteratorError = _context2.t0;

                        case 26:
                            _context2.prev = 26;
                            _context2.prev = 27;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 29:
                            _context2.prev = 29;

                            if (!_didIteratorError) {
                                _context2.next = 32;
                                break;
                            }

                            throw _iteratorError;

                        case 32:
                            return _context2.finish(29);

                        case 33:
                            return _context2.finish(26);

                        case 34:
                            _context2.next = 36;
                            return (0, _BarterAuctionHelper.checkAllMyOfferAndFavouriteIn)(parentBarters, req);

                        case 36:
                            parentBarters = _context2.sent;
                            pageCount = Math.ceil(userBartersInMyOffersCount / limit);
                            response = new _ApiResponse2.default(parentBarters, page, pageCount, limit, userBartersInMyOffersCount);

                            response.addSelfLink(req);

                            if (page > 1) {
                                response.addPrevLink(req);
                            }
                            if (page < pageCount) {
                                response.addNextLink(req);
                            }
                            res.send(response);
                            _context2.next = 48;
                            break;

                        case 45:
                            _context2.prev = 45;
                            _context2.t1 = _context2["catch"](7);

                            next(_context2.t1);

                        case 48:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this, [[7, 45], [18, 22, 26, 34], [27,, 29, 33]]);
        }))();
    },
    getUserAuctionsInMyOffers: function getUserAuctionsInMyOffers(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var id, _req$query2, page, limit, finished, query, auctionsWithMyOffer, auctionsWithMyOfferCount, pageCount, response;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            id = req.params.id;

                            checkIfUserExist(id, next);
                            _req$query2 = req.query, page = _req$query2.page, limit = _req$query2.limit, finished = _req$query2.finished;
                            query = {
                                offerUsers: req.user.id
                            };


                            if (finished) query.finished = finished;
                            page = page ? parseInt(page) : 1;
                            limit = limit ? parseInt(limit) : 20;

                            _context3.prev = 7;
                            _context3.next = 10;
                            return _auction2.default.find(query).populate('relatedUser relatedCategory auctionOffer').sort({ creationDate: -1 }).limit(limit).skip((page - 1) * limit);

                        case 10:
                            auctionsWithMyOffer = _context3.sent;
                            _context3.next = 13;
                            return _auction2.default.count(query);

                        case 13:
                            auctionsWithMyOfferCount = _context3.sent;
                            _context3.next = 16;
                            return (0, _BarterAuctionHelper.checkAllMyOfferAndFavouriteIn)(auctionsWithMyOffer, req, false);

                        case 16:
                            auctionsWithMyOffer = _context3.sent;
                            pageCount = Math.ceil(auctionsWithMyOfferCount / limit);
                            response = new _ApiResponse2.default(auctionsWithMyOffer, page, pageCount, limit, auctionsWithMyOfferCount);

                            response.addSelfLink(req);

                            if (page > 1) {
                                response.addPrevLink(req);
                            }
                            if (page < pageCount) {
                                response.addNextLink(req);
                            }
                            res.send(response);
                            _context3.next = 28;
                            break;

                        case 25:
                            _context3.prev = 25;
                            _context3.t0 = _context3["catch"](7);

                            next(_context3.t0);

                        case 28:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this2, [[7, 25]]);
        }))();
    },
    getUserWinnedAuctions: function getUserWinnedAuctions(req, res, next) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var id, _req$query3, page, limit, winnedAuctionsOffers, winnedAuctionsOffersCount, parentAuctions, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, winnedAuctionOffer, pageCount, response;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            id = req.params.id;

                            checkIfUserExist(id, next);

                            _req$query3 = req.query, page = _req$query3.page, limit = _req$query3.limit;


                            page = page ? parseInt(page) : 1;
                            limit = limit ? parseInt(limit) : 20;

                            _context4.prev = 5;
                            _context4.next = 8;
                            return _auctionOffer2.default.find({ winned: true, bidder: req.user.id }).select('relatedAuction').populate({
                                path: 'relatedAuction',
                                model: 'auction',
                                populate: {
                                    path: 'relatedUser relatedCategory auctionOffer'
                                }
                            }).sort({ creationDate: -1 }).limit(limit).skip((page - 1) * limit);

                        case 8:
                            winnedAuctionsOffers = _context4.sent;
                            _context4.next = 11;
                            return _auctionOffer2.default.count({ winned: true, bidder: req.user.id });

                        case 11:
                            winnedAuctionsOffersCount = _context4.sent;
                            parentAuctions = [];
                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            _context4.prev = 16;

                            for (_iterator2 = winnedAuctionsOffers[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                winnedAuctionOffer = _step2.value;

                                parentAuctions.push(winnedAuctionOffer.relatedAuction);
                            }_context4.next = 24;
                            break;

                        case 20:
                            _context4.prev = 20;
                            _context4.t0 = _context4["catch"](16);
                            _didIteratorError2 = true;
                            _iteratorError2 = _context4.t0;

                        case 24:
                            _context4.prev = 24;
                            _context4.prev = 25;

                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }

                        case 27:
                            _context4.prev = 27;

                            if (!_didIteratorError2) {
                                _context4.next = 30;
                                break;
                            }

                            throw _iteratorError2;

                        case 30:
                            return _context4.finish(27);

                        case 31:
                            return _context4.finish(24);

                        case 32:
                            _context4.next = 34;
                            return (0, _BarterAuctionHelper.checkAllMyOfferAndFavouriteIn)(parentAuctions, req, false);

                        case 34:
                            parentAuctions = _context4.sent;
                            pageCount = Math.ceil(winnedAuctionsOffersCount / limit);
                            response = new _ApiResponse2.default(parentAuctions, page, pageCount, limit, winnedAuctionsOffersCount);

                            response.addSelfLink(req);

                            if (page > 1) {
                                response.addPrevLink(req);
                            }
                            if (page < pageCount) {
                                response.addNextLink(req);
                            }
                            res.send(response);
                            _context4.next = 46;
                            break;

                        case 43:
                            _context4.prev = 43;
                            _context4.t1 = _context4["catch"](5);

                            next(_context4.t1);

                        case 46:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, _this3, [[5, 43], [16, 20, 24, 32], [25,, 27, 31]]);
        }))();
    }
};
//# sourceMappingURL=user-offers.controller.js.map