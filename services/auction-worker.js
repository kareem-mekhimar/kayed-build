"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});
exports.start = start;

var _nodeSchedule = require("node-schedule");

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _auction = require("../models/auction.model");

var _auction2 = _interopRequireDefault(_auction);

var _auctionOffer = require("../models/auction-offer.model");

var _auctionOffer2 = _interopRequireDefault(_auctionOffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function start() {
        var _this = this;

        _nodeSchedule2.default.scheduleJob('0 0 0 * * *', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var auctions, auction, endDate, auctionOffer;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                                switch (_context.prev = _context.next) {
                                        case 0:
                                                auctions = _auction2.default.find({ finished: false });
                                                _context.t0 = regeneratorRuntime.keys(auctions);

                                        case 2:
                                                if ((_context.t1 = _context.t0()).done) {
                                                        _context.next = 16;
                                                        break;
                                                }

                                                auction = _context.t1.value;
                                                endDate = auction.endDate;

                                                if (!(new Date() > endDate)) {
                                                        _context.next = 14;
                                                        break;
                                                }

                                                _context.next = 8;
                                                return _auctionOffer2.default.findOne({ relatedAuction: auction.id }).sort({ price: -1 }).limit(1);

                                        case 8:
                                                auctionOffer = _context.sent;


                                                console.log(auctionOffer);

                                                if (auctionOffer) {
                                                        auction.auctionOffer = auctionOffer._id;
                                                        auctionOffer.winned = true;
                                                }
                                                auction.finished = true;

                                                auctionOffer.save();
                                                auction.save();

                                        case 14:
                                                _context.next = 2;
                                                break;

                                        case 16:
                                        case "end":
                                                return _context.stop();
                                }
                        }
                }, _callee, _this);
        })));
}
//# sourceMappingURL=auction-worker.js.map