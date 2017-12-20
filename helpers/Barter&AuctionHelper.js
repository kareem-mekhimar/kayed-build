'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.checkMyOfferAndFavouriteIn = exports.checkAllMyOfferAndFavouriteIn = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var checkAllMyOfferAndFavouriteIn = exports.checkAllMyOfferAndFavouriteIn = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(items, req) {
        var isBarter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var newItems, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        newItems = [];
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 4;
                        _iterator = items[Symbol.iterator]();

                    case 6:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 16;
                            break;
                        }

                        item = _step.value;
                        _context.t0 = newItems;
                        _context.next = 11;
                        return checkMyOfferAndFavouriteIn(item, req, isBarter);

                    case 11:
                        _context.t1 = _context.sent;

                        _context.t0.push.call(_context.t0, _context.t1);

                    case 13:
                        _iteratorNormalCompletion = true;
                        _context.next = 6;
                        break;

                    case 16:
                        _context.next = 22;
                        break;

                    case 18:
                        _context.prev = 18;
                        _context.t2 = _context['catch'](4);
                        _didIteratorError = true;
                        _iteratorError = _context.t2;

                    case 22:
                        _context.prev = 22;
                        _context.prev = 23;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 25:
                        _context.prev = 25;

                        if (!_didIteratorError) {
                            _context.next = 28;
                            break;
                        }

                        throw _iteratorError;

                    case 28:
                        return _context.finish(25);

                    case 29:
                        return _context.finish(22);

                    case 30:
                        return _context.abrupt('return', newItems);

                    case 31:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[4, 18, 22, 30], [23,, 25, 29]]);
    }));

    return function checkAllMyOfferAndFavouriteIn(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var checkMyOfferAndFavouriteIn = exports.checkMyOfferAndFavouriteIn = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(item, req) {
        var isBarter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var newItem, myOfferId, inMyFavourites, inMyOffers, barterOffer;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        newItem = void 0;
                        myOfferId = undefined;
                        inMyFavourites = item.favUsers.some(function (favUser) {
                            return favUser.equals(req.user.id);
                        });
                        inMyOffers = item.offerUsers.some(function (offerUser) {
                            return offerUser.equals(req.user.id);
                        });

                        if (!(isBarter && inMyOffers)) {
                            _context2.next = 9;
                            break;
                        }

                        _context2.next = 7;
                        return _barterOffer2.default.findOne({ relatedBarter: item.id, relatedUser: req.user.id });

                    case 7:
                        barterOffer = _context2.sent;

                        myOfferId = barterOffer.id;

                    case 9:

                        newItem = _extends({}, item.toJSON(), { inMyOffers: inMyOffers, inMyFavourites: inMyFavourites, myOfferId: myOfferId });
                        return _context2.abrupt('return', newItem);

                    case 11:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function checkMyOfferAndFavouriteIn(_x4, _x5) {
        return _ref2.apply(this, arguments);
    };
}();

var _barterOffer = require('../models/barter-offer.model');

var _barterOffer2 = _interopRequireDefault(_barterOffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
//# sourceMappingURL=Barter&AuctionHelper.js.map