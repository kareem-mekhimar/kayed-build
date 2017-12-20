"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _barter = require("../models/barter.model");

var _barter2 = _interopRequireDefault(_barter);

var _user = require("../models/user.model");

var _user2 = _interopRequireDefault(_user);

var _category = require("../models/category.model");

var _category2 = _interopRequireDefault(_category);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _ApiResponse = require("../helpers/ApiResponse");

var _ApiResponse2 = _interopRequireDefault(_ApiResponse);

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

var _utils = require("../utils");

var _BarterAuctionHelper = require("../helpers/Barter&AuctionHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var validateBarter = function validateBarter(req) {
    var isUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    req.checkBody("title").notEmpty().withMessage("titles is Required");
    req.checkBody("description").notEmpty().withMessage("description is required");
    req.checkBody("neededProduct").notEmpty().withMessage("neededProduct is required");
    req.checkBody("relatedUser").notEmpty().withMessage("relatedUser is required").custom(function () {
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

                            throw new Error("User doesn't exist");

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
    }()).withMessage('User doesnt exist');
    req.checkBody("relatedCategory").notEmpty().withMessage("relatedCategory is required").custom(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value) {
            var category;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _category2.default.findById(value);

                        case 2:
                            category = _context2.sent;

                            if (category) {
                                _context2.next = 5;
                                break;
                            }

                            throw new Error("Category doesn't exist");

                        case 5:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function (_x3) {
            return _ref2.apply(this, arguments);
        };
    }()).withMessage("Category doesn't exist");

    req.checkBody('type').optional().isIn(['TEMP', 'PERM']).withMessage("type of barter should be 'TEMP' OR 'PERM'");
    req.checkBody('finished').optional().isIn(['true', 'false']).withMessage("finished should be true or false");
    req.checkBody('imgs').optional().isArray().withMessage("Imgs should be an array of strings 'images 64base'");

    if (isUpdate) req.checkParams('id').custom(function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(value) {
            var barter;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _barter2.default.findById(value);

                        case 2:
                            barter = _context3.sent;

                            if (barter) {
                                _context3.next = 5;
                                break;
                            }

                            throw new Error('Barter Not Found');

                        case 5:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        }));

        return function (_x4) {
            return _ref3.apply(this, arguments);
        };
    }()).withMessage('Barter Not Found');

    return req.getValidationResult();
};
var checkIfValidIds = function checkIfValidIds(categories, next) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = categories[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var category = _step.value;

            if (!_mongoose2.default.Types.ObjectId.isValid(category)) return next(new _ApiError2.default.BadRequest(400, 'you have sent an invalid category id: ', category));
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};

exports.default = {
    findAll: function findAll(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var _req$query, page, limit, categories, type, finished, query, barters, bartersCount, pageCount, response;

            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _req$query = req.query, page = _req$query.page, limit = _req$query.limit, categories = _req$query.categories, type = _req$query.type, finished = _req$query.finished;
                            query = {};


                            if (categories) {
                                categories = categories.split(',');
                                checkIfValidIds(categories, next);
                                if (categories.length > 1) {
                                    query.relatedCategory = { $in: categories };
                                } else query.relatedCategory = categories[0];
                            }
                            if (type) query.type = type;
                            if (finished) query.finished = finished;

                            page = page ? parseInt(page) : 1;
                            limit = limit ? parseInt(limit) : 20;

                            _context4.prev = 7;
                            _context4.next = 10;
                            return _barter2.default.find(query).populate('relatedCategory relatedUser barterOffer').sort({ creationDate: -1 }).limit(limit).skip((page - 1) * limit);

                        case 10:
                            barters = _context4.sent;
                            _context4.next = 13;
                            return _barter2.default.count(query);

                        case 13:
                            bartersCount = _context4.sent;
                            pageCount = Math.ceil(bartersCount / limit);
                            _context4.next = 17;
                            return (0, _BarterAuctionHelper.checkAllMyOfferAndFavouriteIn)(barters, req);

                        case 17:
                            barters = _context4.sent;
                            response = new _ApiResponse2.default(barters, page, pageCount, limit, bartersCount);

                            response.addSelfLink(req);

                            if (page > 1) {
                                response.addPrevLink(req);
                            }
                            if (page < pageCount) {
                                response.addNextLink(req);
                            }
                            res.send(response);
                            _context4.next = 28;
                            break;

                        case 25:
                            _context4.prev = 25;
                            _context4.t0 = _context4["catch"](7);

                            next(_context4.t0);

                        case 28:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, _this, [[7, 25]]);
        }))();
    },
    createBarter: function createBarter(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var validationErrors, newBarterId, createdBarter, barter;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return validateBarter(req);

                        case 2:
                            validationErrors = _context5.sent;

                            if (validationErrors.isEmpty()) {
                                _context5.next = 5;
                                break;
                            }

                            return _context5.abrupt("return", next(new _ApiError2.default(422, validationErrors.mapped())));

                        case 5:
                            _context5.prev = 5;
                            newBarterId = _mongoose2.default.Types.ObjectId();

                            if (req.body.imgs) req.body.imgs = (0, _utils.handleImgs)(req.body.imgs, "barters", newBarterId, req);

                            _context5.next = 10;
                            return _barter2.default.create(_extends({ _id: newBarterId }, req.body));

                        case 10:
                            createdBarter = _context5.sent;
                            _context5.next = 13;
                            return _barter2.default.findById(createdBarter.id).populate('relatedCategory relatedUser');

                        case 13:
                            barter = _context5.sent;


                            res.status(201).send(barter);

                            _context5.next = 20;
                            break;

                        case 17:
                            _context5.prev = 17;
                            _context5.t0 = _context5["catch"](5);

                            next(_context5.t0);

                        case 20:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, _this2, [[5, 17]]);
        }))();
    },
    findById: function findById(req, res, next) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var id, barter;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            id = req.params.id;
                            _context6.prev = 1;
                            _context6.next = 4;
                            return _barter2.default.findById(id).populate('relatedCategory relatedUser barterOffer');

                        case 4:
                            barter = _context6.sent;

                            if (barter) {
                                _context6.next = 7;
                                break;
                            }

                            return _context6.abrupt("return", next(new _ApiError2.default.NotFound('Barter')));

                        case 7:
                            _context6.next = 9;
                            return (0, _BarterAuctionHelper.checkMyOfferAndFavouriteIn)(barter, req);

                        case 9:
                            barter = _context6.sent;

                            res.send(barter);
                            _context6.next = 16;
                            break;

                        case 13:
                            _context6.prev = 13;
                            _context6.t0 = _context6["catch"](1);

                            next(_context6.t0);

                        case 16:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, _this3, [[1, 13]]);
        }))();
    },
    updateBarter: function updateBarter(req, res, next) {
        var _this4 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            var validationErrors, id, updatedBarter;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.next = 2;
                            return validateBarter(req, true);

                        case 2:
                            validationErrors = _context7.sent;

                            if (validationErrors.isEmpty()) {
                                _context7.next = 5;
                                break;
                            }

                            return _context7.abrupt("return", next(new _ApiError2.default(422, validationErrors.mapped())));

                        case 5:
                            id = req.params.id;
                            _context7.prev = 6;


                            if (req.body.imgs) req.body.imgs = (0, _utils.handleImgs)(req.body.imgs, "barters", id, req);

                            _context7.next = 10;
                            return _barter2.default.findByIdAndUpdate(id, req.body, { new: true }).populate('relatedCategory relatedUser barterOffer');

                        case 10:
                            updatedBarter = _context7.sent;
                            _context7.next = 13;
                            return (0, _BarterAuctionHelper.checkMyOfferAndFavouriteIn)(updatedBarter, req);

                        case 13:
                            updatedBarter = _context7.sent;

                            res.status(200).send(updatedBarter);
                            _context7.next = 20;
                            break;

                        case 17:
                            _context7.prev = 17;
                            _context7.t0 = _context7["catch"](6);

                            next(_context7.t0);

                        case 20:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, _this4, [[6, 17]]);
        }))();
    },
    deleteBarter: function deleteBarter(req, res, next) {
        var _this5 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
            var id, deletedBarter;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            id = req.params.id;
                            _context8.prev = 1;
                            _context8.next = 4;
                            return _barter2.default.findByIdAndRemove(id);

                        case 4:
                            deletedBarter = _context8.sent;

                            if (deletedBarter) {
                                _context8.next = 7;
                                break;
                            }

                            return _context8.abrupt("return", next(new _ApiError2.default.NotFound('Barter')));

                        case 7:
                            res.status(204).send();
                            _context8.next = 13;
                            break;

                        case 10:
                            _context8.prev = 10;
                            _context8.t0 = _context8["catch"](1);

                            next(_context8.t0);

                        case 13:
                        case "end":
                            return _context8.stop();
                    }
                }
            }, _callee8, _this5, [[1, 10]]);
        }))();
    }
};
//# sourceMappingURL=barter.controller.js.map