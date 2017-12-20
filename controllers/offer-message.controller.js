"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _offerMessage = require("../models/offer-message.model");

var _offerMessage2 = _interopRequireDefault(_offerMessage);

var _barterOffer = require("../models/barter-offer.model");

var _barterOffer2 = _interopRequireDefault(_barterOffer);

var _barter = require("../models/barter.model");

var _barter2 = _interopRequireDefault(_barter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
    findAll: function findAll(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var barterId, offerId, barter, offer, messages;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            barterId = req.params.barterId;
                            offerId = req.params.offerId;
                            _context.next = 4;
                            return _barter2.default.findById(barterId);

                        case 4:
                            barter = _context.sent;

                            if (barter) {
                                _context.next = 7;
                                break;
                            }

                            return _context.abrupt("return", next(new ApiError.NotFound('Barter')));

                        case 7:
                            _context.next = 9;
                            return _barterOffer2.default.findById(offerId);

                        case 9:
                            offer = _context.sent;

                            if (offer) {
                                _context.next = 12;
                                break;
                            }

                            return _context.abrupt("return", next(new ApiError.NotFound('BarterOffer')));

                        case 12:
                            _context.next = 14;
                            return _offerMessage2.default.find({ relatedBarterOffer: offerId }).populate("relatedUser");

                        case 14:
                            messages = _context.sent;

                            res.send(messages);

                        case 16:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    }
};
//# sourceMappingURL=offer-message.controller.js.map