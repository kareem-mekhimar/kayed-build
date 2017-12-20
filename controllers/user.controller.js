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

var _favBarter = require("../models/fav-barter.model");

var _favBarter2 = _interopRequireDefault(_favBarter);

var _favAuction = require("../models/fav-auction.model");

var _favAuction2 = _interopRequireDefault(_favAuction);

var _ApiResponse = require("../helpers/ApiResponse");

var _ApiResponse2 = _interopRequireDefault(_ApiResponse);

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

var _utils = require("../utils");

var _BarterAuctionHelper = require("../helpers/Barter&AuctionHelper");

var _PushNotificationsHelper = require("../helpers/PushNotificationsHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var jwtSecret = _config2.default.jwtSecret;


var generateToken = function generateToken(id) {

    return _jsonwebtoken2.default.sign({
        sub: id,
        iss: 'App',
        iat: new Date().getTime(),
        expiresIn: 604800000
    }, jwtSecret);
};

var validateUserBody = function validateUserBody(req) {
    var isUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (isUpdate) {
        req.checkBody("email").notEmpty().withMessage("Email Required").custom(function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
                var user;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(req.user.email !== value)) {
                                    _context.next = 6;
                                    break;
                                }

                                _context.next = 3;
                                return _user2.default.findOne({ email: value, _id: { $ne: req.user._id } });

                            case 3:
                                user = _context.sent;

                                if (!user) {
                                    _context.next = 6;
                                    break;
                                }

                                throw new Error("email already taken");

                            case 6:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, undefined);
            }));

            return function (_x2) {
                return _ref.apply(this, arguments);
            };
        }()).withMessage("email already taken");
    } else {
        req.checkBody("email").notEmpty().withMessage("Email Required").custom(function (value) {
            return _user2.default.findOne({ email: value }).then(function (user) {
                if (user) throw new Error("email already exists");
            });
        }).withMessage("email already exists");
    }
    req.checkBody("password").notEmpty().withMessage("Password required");
    req.checkBody("phone").notEmpty().withMessage("Phone required");
    req.checkBody("fullName").notEmpty().withMessage("FullName required");
    req.checkBody("country").notEmpty().withMessage("Country required");

    return req.getValidationResult();
};

var checkIfUserExist = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, next) {
        var user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _user2.default.findById(id);

                    case 2:
                        user = _context2.sent;

                        if (user) {
                            _context2.next = 5;
                            break;
                        }

                        return _context2.abrupt("return", next(new _ApiError2.default.NotFound('User')));

                    case 5:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function checkIfUserExist(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

var registerAsMyFavourite = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(itemId, userId) {
        var isBarter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if (!isBarter) {
                            _context3.next = 5;
                            break;
                        }

                        _context3.next = 3;
                        return _barter2.default.findByIdAndUpdate(itemId, { $addToSet: { favUsers: userId } });

                    case 3:
                        _context3.next = 7;
                        break;

                    case 5:
                        _context3.next = 7;
                        return _auction2.default.findByIdAndUpdate(itemId, { $addToSet: { favUsers: userId } });

                    case 7:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function registerAsMyFavourite(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var UnRegisterAsMyFavourite = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(itemId, userId) {
        var isBarter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        if (!isBarter) {
                            _context4.next = 5;
                            break;
                        }

                        _context4.next = 3;
                        return _barter2.default.findByIdAndUpdate(itemId, { '$pull': { favUsers: userId } });

                    case 3:
                        _context4.next = 7;
                        break;

                    case 5:
                        _context4.next = 7;
                        return _auction2.default.findByIdAndUpdate(itemId, { '$pull': { favUsers: userId } });

                    case 7:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function UnRegisterAsMyFavourite(_x8, _x9) {
        return _ref4.apply(this, arguments);
    };
}();

exports.default = {
    signUp: function signUp(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var validationErrors, img;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return validateUserBody(req);

                        case 2:
                            validationErrors = _context5.sent;


                            if (!validationErrors.isEmpty()) next(new _ApiError2.default(422, validationErrors.mapped()));else {
                                img = req.body.img;

                                delete req.body.img;

                                _user2.default.create(req.body).then(function (user) {

                                    var id = user.id;
                                    if (img) {
                                        user.img = (0, _utils.writeBase64AndReturnUrl)(img, "users/" + id, req);
                                        user.save();
                                    }
                                    res.status(201).send({ user: user, token: generateToken(id) });
                                });
                            }

                        case 4:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, _this);
        }))();
    },
    signIn: function signIn(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var user;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            user = req.user;

                            res.status(200).send({ user: user, token: generateToken(user.id) });

                        case 2:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, _this2);
        }))();
    },
    findById: function findById(req, res, next) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            var id, user;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            id = req.params.id;
                            _context7.next = 3;
                            return _user2.default.findById(id);

                        case 3:
                            user = _context7.sent;

                            if (user) {
                                _context7.next = 6;
                                break;
                            }

                            return _context7.abrupt("return", next(new _ApiError2.default.NotFound("User")));

                        case 6:

                            res.send(user);

                        case 7:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, _this3);
        }))();
    },
    updateUser: function updateUser(req, res, next) {
        var _this4 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
            var validationErrors, id, img, updatedUser;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _context8.next = 2;
                            return validateUserBody(req, true);

                        case 2:
                            validationErrors = _context8.sent;

                            if (validationErrors.isEmpty()) {
                                _context8.next = 5;
                                break;
                            }

                            return _context8.abrupt("return", next(new _ApiError2.default(422, validationErrors.mapped())));

                        case 5:
                            id = req.params.id;

                            checkIfUserExist(id, next);

                            _context8.prev = 7;
                            img = req.body.img;

                            delete req.body.img;

                            _context8.next = 12;
                            return _user2.default.findByIdAndUpdate(id, req.body, { new: true });

                        case 12:
                            updatedUser = _context8.sent;

                            if (updatedUser) {
                                _context8.next = 15;
                                break;
                            }

                            return _context8.abrupt("return", next(new _ApiError2.default.NotFound('User')));

                        case 15:

                            if (img) {
                                if (!(0, _utils.isValidImgUrl)(img)) {
                                    updatedUser.img = (0, _utils.writeBase64AndReturnUrl)(img, "users/" + id, req);
                                    updatedUser.save();
                                }
                            }

                            res.status(200).send({ user: updatedUser });

                            _context8.next = 22;
                            break;

                        case 19:
                            _context8.prev = 19;
                            _context8.t0 = _context8["catch"](7);

                            next(_context8.t0);

                        case 22:
                        case "end":
                            return _context8.stop();
                    }
                }
            }, _callee8, _this4, [[7, 19]]);
        }))();
    },
    getUserBarters: function getUserBarters(req, res, next) {
        var _this5 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
            var id, _req$query, page, limit, userBarters, userBartersCount, pageCount, response;

            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            id = req.params.id;

                            checkIfUserExist(id, next);

                            _req$query = req.query, page = _req$query.page, limit = _req$query.limit;


                            page = page ? parseInt(page) : 1;
                            limit = limit ? parseInt(limit) : 20;

                            _context9.prev = 5;
                            _context9.next = 8;
                            return _barter2.default.find({ relatedUser: id }).populate('relatedCategory relatedUser barterOffer').sort({ creationDate: -1 }).limit(limit).skip((page - 1) * limit);

                        case 8:
                            userBarters = _context9.sent;
                            _context9.next = 11;
                            return _barter2.default.count({ relatedUser: id });

                        case 11:
                            userBartersCount = _context9.sent;
                            _context9.next = 14;
                            return (0, _BarterAuctionHelper.checkAllMyOfferAndFavouriteIn)(userBarters, req);

                        case 14:
                            userBarters = _context9.sent;
                            pageCount = Math.ceil(userBartersCount / limit);
                            response = new _ApiResponse2.default(userBarters, page, pageCount, limit, userBartersCount);

                            response.addSelfLink(req);

                            if (page > 1) {
                                response.addPrevLink(req);
                            }
                            if (page < pageCount) {
                                response.addNextLink(req);
                            }
                            res.send(response);
                            _context9.next = 26;
                            break;

                        case 23:
                            _context9.prev = 23;
                            _context9.t0 = _context9["catch"](5);

                            next(_context9.t0);

                        case 26:
                        case "end":
                            return _context9.stop();
                    }
                }
            }, _callee9, _this5, [[5, 23]]);
        }))();
    },
    getUserAuctions: function getUserAuctions(req, res, next) {
        var _this6 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
            var id, _req$query2, page, limit, userAuctions, userAuctionsCount, pageCount, response;

            return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            id = req.params.id;

                            checkIfUserExist(id, next);

                            _req$query2 = req.query, page = _req$query2.page, limit = _req$query2.limit;


                            page = page ? parseInt(page) : 1;
                            limit = limit ? parseInt(limit) : 20;

                            _context10.prev = 5;
                            _context10.next = 8;
                            return _auction2.default.find({ relatedUser: id }).populate('relatedCategory relatedUser auctionOffer').sort({ creationDate: -1 }).limit(limit).skip((page - 1) * limit);

                        case 8:
                            userAuctions = _context10.sent;
                            _context10.next = 11;
                            return _auction2.default.count({ relatedUser: id });

                        case 11:
                            userAuctionsCount = _context10.sent;
                            _context10.next = 14;
                            return (0, _BarterAuctionHelper.checkAllMyOfferAndFavouriteIn)(userAuctions, req, false);

                        case 14:
                            userAuctions = _context10.sent;
                            pageCount = Math.ceil(userAuctionsCount / limit);
                            response = new _ApiResponse2.default(userAuctions, page, pageCount, limit, userAuctionsCount);

                            response.addSelfLink(req);

                            if (page > 1) {
                                response.addPrevLink(req);
                            }
                            if (page < pageCount) {
                                response.addNextLink(req);
                            }
                            res.send(response);
                            _context10.next = 26;
                            break;

                        case 23:
                            _context10.prev = 23;
                            _context10.t0 = _context10["catch"](5);

                            next(_context10.t0);

                        case 26:
                        case "end":
                            return _context10.stop();
                    }
                }
            }, _callee10, _this6, [[5, 23]]);
        }))();
    },
    getUserFavoriteBarters: function getUserFavoriteBarters(req, res, next) {
        var _this7 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
            var id, _req$query3, page, limit, userFavBarters, userFavBartersCount, pageCount, response;

            return regeneratorRuntime.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            id = req.params.id;

                            checkIfUserExist(id, next);

                            _req$query3 = req.query, page = _req$query3.page, limit = _req$query3.limit;


                            page = page ? parseInt(page) : 1;
                            limit = limit ? parseInt(limit) : 20;

                            _context11.prev = 5;
                            _context11.next = 8;
                            return _favBarter2.default.find({ user: req.user.id }).select('barter').populate({
                                path: 'barter',
                                model: 'barter',
                                populate: {
                                    path: 'relatedUser relatedCategory barterOffer'
                                }
                            }).sort({ creationDate: -1 }).limit(limit).skip((page - 1) * limit);

                        case 8:
                            userFavBarters = _context11.sent;
                            _context11.next = 11;
                            return _favBarter2.default.count({ user: id });

                        case 11:
                            userFavBartersCount = _context11.sent;
                            pageCount = Math.ceil(userFavBartersCount / limit);
                            response = new _ApiResponse2.default(userFavBarters, page, pageCount, limit, userFavBartersCount);

                            response.addSelfLink(req);

                            if (page > 1) {
                                response.addPrevLink(req);
                            }
                            if (page < pageCount) {
                                response.addNextLink(req);
                            }
                            res.send(response);
                            _context11.next = 23;
                            break;

                        case 20:
                            _context11.prev = 20;
                            _context11.t0 = _context11["catch"](5);

                            next(_context11.t0);

                        case 23:
                        case "end":
                            return _context11.stop();
                    }
                }
            }, _callee11, _this7, [[5, 20]]);
        }))();
    },
    getUserFavoriteAuctions: function getUserFavoriteAuctions(req, res, next) {
        var _this8 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
            var id, _req$query4, page, limit, userFavAuctions, userFavAuctionsCount, pageCount, response;

            return regeneratorRuntime.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            id = req.params.id;

                            checkIfUserExist(id, next);

                            _req$query4 = req.query, page = _req$query4.page, limit = _req$query4.limit;


                            page = page ? parseInt(page) : 1;
                            limit = limit ? parseInt(limit) : 20;

                            _context12.prev = 5;
                            _context12.next = 8;
                            return _favAuction2.default.find({ user: req.user.id }).select('auction').populate({
                                path: 'auction',
                                model: 'auction',
                                populate: {
                                    path: 'relatedUser relatedCategory auctionOffer'
                                }
                            }).sort({ creationDate: -1 }).limit(limit).skip((page - 1) * limit);

                        case 8:
                            userFavAuctions = _context12.sent;
                            _context12.next = 11;
                            return _favAuction2.default.count({ user: id });

                        case 11:
                            userFavAuctionsCount = _context12.sent;
                            pageCount = Math.ceil(userFavAuctionsCount / limit);
                            response = new _ApiResponse2.default(userFavAuctions, page, pageCount, limit, userFavAuctionsCount);

                            response.addSelfLink(req);

                            if (page > 1) {
                                response.addPrevLink(req);
                            }
                            if (page < pageCount) {
                                response.addNextLink(req);
                            }
                            res.send(response);
                            _context12.next = 23;
                            break;

                        case 20:
                            _context12.prev = 20;
                            _context12.t0 = _context12["catch"](5);

                            next(_context12.t0);

                        case 23:
                        case "end":
                            return _context12.stop();
                    }
                }
            }, _callee12, _this8, [[5, 20]]);
        }))();
    },
    updateFavBarter: function updateFavBarter(req, res, next) {
        var _this9 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
            var id, barter, userFavBarter, createdUserFavBarter;
            return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            id = req.params.id;

                            checkIfUserExist(id, next);

                            if (req.body.barter) {
                                _context13.next = 4;
                                break;
                            }

                            return _context13.abrupt("return", next(new _ApiError2.default(422, 'barter is required')));

                        case 4:
                            ;

                            _context13.prev = 5;
                            _context13.next = 8;
                            return _barter2.default.findById(req.body.barter);

                        case 8:
                            barter = _context13.sent;

                            if (barter) {
                                _context13.next = 11;
                                break;
                            }

                            return _context13.abrupt("return", next(new _ApiError2.default.NotFound('Barter')));

                        case 11:
                            _context13.next = 13;
                            return _favBarter2.default.findOne({ user: req.user.id, barter: barter.id });

                        case 13:
                            userFavBarter = _context13.sent;

                            if (userFavBarter) {
                                _context13.next = 20;
                                break;
                            }

                            registerAsMyFavourite(barter.id, req.user.id);

                            _context13.next = 18;
                            return _favBarter2.default.create({ user: req.user.id, barter: req.body.barter });

                        case 18:
                            createdUserFavBarter = _context13.sent;

                            res.status(200).send(createdUserFavBarter);

                        case 20:

                            // Already Exist Nothing to do..
                            res.send();
                            _context13.next = 26;
                            break;

                        case 23:
                            _context13.prev = 23;
                            _context13.t0 = _context13["catch"](5);

                            next(_context13.t0);

                        case 26:
                        case "end":
                            return _context13.stop();
                    }
                }
            }, _callee13, _this9, [[5, 23]]);
        }))();
    },
    updateFavAuction: function updateFavAuction(req, res, next) {
        var _this10 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
            var id, auction, userFavAuction, createdUserFavAuction;
            return regeneratorRuntime.wrap(function _callee14$(_context14) {
                while (1) {
                    switch (_context14.prev = _context14.next) {
                        case 0:
                            id = req.params.id;

                            checkIfUserExist(id, next);

                            if (req.body.auction) {
                                _context14.next = 4;
                                break;
                            }

                            return _context14.abrupt("return", next(new _ApiError2.default(422, 'auction is required')));

                        case 4:
                            ;

                            _context14.prev = 5;
                            _context14.next = 8;
                            return _auction2.default.findById(req.body.auction);

                        case 8:
                            auction = _context14.sent;

                            if (auction) {
                                _context14.next = 11;
                                break;
                            }

                            return _context14.abrupt("return", next(new _ApiError2.default.NotFound('Auction')));

                        case 11:
                            _context14.next = 13;
                            return _favAuction2.default.findOne({ user: req.user.id, auction: auction.id });

                        case 13:
                            userFavAuction = _context14.sent;

                            if (userFavAuction) {
                                _context14.next = 20;
                                break;
                            }

                            registerAsMyFavourite(auction.id, req.user.id, false);

                            _context14.next = 18;
                            return _favAuction2.default.create({ user: req.user.id, auction: req.body.auction });

                        case 18:
                            createdUserFavAuction = _context14.sent;

                            res.status(200).send(createdUserFavAuction);

                        case 20:

                            // Already Exist Nothing to do..
                            res.send();
                            _context14.next = 26;
                            break;

                        case 23:
                            _context14.prev = 23;
                            _context14.t0 = _context14["catch"](5);

                            next(_context14.t0);

                        case 26:
                        case "end":
                            return _context14.stop();
                    }
                }
            }, _callee14, _this10, [[5, 23]]);
        }))();
    },
    deleteFavBarter: function deleteFavBarter(req, res, next) {
        var _this11 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
            var _req$params, id, barterId, deletedFavBarter;

            return regeneratorRuntime.wrap(function _callee15$(_context15) {
                while (1) {
                    switch (_context15.prev = _context15.next) {
                        case 0:
                            _req$params = req.params, id = _req$params.id, barterId = _req$params.barterId;
                            _context15.prev = 1;
                            _context15.next = 4;
                            return _favBarter2.default.findOne({ user: id, barter: barterId }).remove();

                        case 4:
                            deletedFavBarter = _context15.sent;

                            if (deletedFavBarter) {
                                _context15.next = 7;
                                break;
                            }

                            return _context15.abrupt("return", next(new _ApiError2.default.NotFound('User FavouriteBarter')));

                        case 7:

                            UnRegisterAsMyFavourite(barterId, req.user.id);
                            res.status(204).send();
                            _context15.next = 14;
                            break;

                        case 11:
                            _context15.prev = 11;
                            _context15.t0 = _context15["catch"](1);

                            next(_context15.t0);

                        case 14:
                        case "end":
                            return _context15.stop();
                    }
                }
            }, _callee15, _this11, [[1, 11]]);
        }))();
    },
    deleteFavAuction: function deleteFavAuction(req, res, next) {
        var _this12 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
            var _req$params2, id, auctionId, deletedFavAuction;

            return regeneratorRuntime.wrap(function _callee16$(_context16) {
                while (1) {
                    switch (_context16.prev = _context16.next) {
                        case 0:
                            _req$params2 = req.params, id = _req$params2.id, auctionId = _req$params2.auctionId;
                            _context16.prev = 1;
                            _context16.next = 4;
                            return _favAuction2.default.findOne({ user: id, auction: auctionId }).remove();

                        case 4:
                            deletedFavAuction = _context16.sent;

                            if (deletedFavAuction) {
                                _context16.next = 7;
                                break;
                            }

                            return _context16.abrupt("return", next(new _ApiError2.default.NotFound('User FavouriteAuction')));

                        case 7:

                            UnRegisterAsMyFavourite(auctionId, req.user.id, false);
                            res.status(204).send();
                            _context16.next = 14;
                            break;

                        case 11:
                            _context16.prev = 11;
                            _context16.t0 = _context16["catch"](1);

                            next(_context16.t0);

                        case 14:
                        case "end":
                            return _context16.stop();
                    }
                }
            }, _callee16, _this12, [[1, 11]]);
        }))();
    }
};
//# sourceMappingURL=user.controller.js.map