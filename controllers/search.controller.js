"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _barter = require("../models/barter.model");

var _barter2 = _interopRequireDefault(_barter);

var _auction = require("../models/auction.model");

var _auction2 = _interopRequireDefault(_auction);

var _ApiResponse = require("../helpers/ApiResponse");

var _BarterAuctionHelper = require("../helpers/Barter&AuctionHelper");

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    search: function search(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var _req$query, q, page, limit, matchQueryRegx, query, barterCount, auctionCount, halfLimit, pageCount, barters, auctions, response;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _req$query = req.query, q = _req$query.q, page = _req$query.page, limit = _req$query.limit;

                            if (!q) res.send({ barters: [], auctions: [] });

                            matchQueryRegx = new RegExp((0, _lodash.escapeRegExp)(q), 'i'); // 'i' to convert upper case to lower.

                            query = { '$or': [{ title: matchQueryRegx }, { description: matchQueryRegx }] };


                            page = page ? parseInt(page) : 1;
                            limit = limit ? parseInt(limit) : 10;

                            _context.prev = 6;
                            _context.next = 9;
                            return _barter2.default.count(query);

                        case 9:
                            barterCount = _context.sent;
                            _context.next = 12;
                            return _auction2.default.count(query);

                        case 12:
                            auctionCount = _context.sent;
                            halfLimit = limit ? Math.ceil(limit / 2) : 5;
                            pageCount = Math.ceil(barterCount + auctionCount / limit);


                            if (page == 1 && (barterCount < halfLimit || auctionCount < halfLimit)) halfLimit += halfLimit - Math.min(barterCount, auctionCount);

                            if (page > Math.ceil(Math.min(barterCount, auctionCount) / limit * 2)) halfLimit = limit;

                            _context.next = 19;
                            return _barter2.default.find(query).populate('relatedCategory relatedUser').sort({ creationDate: -1 }).limit(halfLimit).skip((page - 1) * limit);

                        case 19:
                            barters = _context.sent;
                            _context.next = 22;
                            return _auction2.default.find(query).populate('relatedCategory relatedUser').sort({ creationDate: -1 }).limit(halfLimit).skip((page - 1) * limit);

                        case 22:
                            auctions = _context.sent;
                            _context.next = 25;
                            return (0, _BarterAuctionHelper.checkAllMyOfferAndFavouriteIn)(barters, req, true);

                        case 25:
                            barters = _context.sent;
                            _context.next = 28;
                            return (0, _BarterAuctionHelper.checkAllMyOfferAndFavouriteIn)(auctions, req, false);

                        case 28:
                            auctions = _context.sent;
                            response = new _ApiResponse.ApiResponse2(undefined, page, pageCount, limit, barters.length + auctions.length, req);


                            res.status(200).send(_extends({ barters: barters, auctions: auctions }, response));

                            _context.next = 36;
                            break;

                        case 33:
                            _context.prev = 33;
                            _context.t0 = _context["catch"](6);

                            next(_context.t0);

                        case 36:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[6, 33]]);
        }))();
    }
};
//# sourceMappingURL=search.controller.js.map