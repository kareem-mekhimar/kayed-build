"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _category = require("../models/category.model");

var _category2 = _interopRequireDefault(_category);

var _ApiResponse = require("../helpers/ApiResponse");

var _ApiResponse2 = _interopRequireDefault(_ApiResponse);

var _ApiError = require("../helpers/ApiError");

var _ApiError2 = _interopRequireDefault(_ApiError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var validateCategory = function validateCategory(req) {
    req.checkBody("name").notEmpty().withMessage("category's name is required").custom(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
            var category;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _category2.default.findOne({ name: value });

                        case 2:
                            category = _context.sent;

                            if (!category) {
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

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }()).withMessage("this category name already exists");
    return req.getValidationResult();
};

exports.default = {
    findAll: function findAll(req, res, next) {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var allCategories;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return _category2.default.find({});

                        case 3:
                            allCategories = _context2.sent;

                            res.status(200).send(allCategories);
                            _context2.next = 10;
                            break;

                        case 7:
                            _context2.prev = 7;
                            _context2.t0 = _context2["catch"](0);

                            next(_context2.t0);

                        case 10:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this, [[0, 7]]);
        }))();
    },
    createCategory: function createCategory(req, res, next) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var validationErrors, createdCategory;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return validateCategory(req);

                        case 2:
                            validationErrors = _context3.sent;

                            if (validationErrors.isEmpty()) {
                                _context3.next = 5;
                                break;
                            }

                            return _context3.abrupt("return", next(new _ApiError2.default(422, validationErrors.mapped())));

                        case 5:
                            _context3.prev = 5;
                            _context3.next = 8;
                            return _category2.default.create(req.body);

                        case 8:
                            createdCategory = _context3.sent;

                            res.status(201).send(createdCategory);
                            _context3.next = 15;
                            break;

                        case 12:
                            _context3.prev = 12;
                            _context3.t0 = _context3["catch"](5);

                            next(_context3.t0);

                        case 15:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this2, [[5, 12]]);
        }))();
    },
    updateCategory: function updateCategory(req, res, next) {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var id, validationErrors, updatedCategory;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            id = req.params.id;
                            _context4.next = 3;
                            return validateCategory(req);

                        case 3:
                            validationErrors = _context4.sent;

                            if (validationErrors.isEmpty()) {
                                _context4.next = 6;
                                break;
                            }

                            return _context4.abrupt("return", next(new _ApiError2.default(422, validationErrors.mapped())));

                        case 6:
                            _context4.prev = 6;
                            _context4.next = 9;
                            return _category2.default.findByIdAndUpdate(id, req.body, { new: true });

                        case 9:
                            updatedCategory = _context4.sent;

                            if (updatedCategory) {
                                _context4.next = 12;
                                break;
                            }

                            return _context4.abrupt("return", next(new _ApiError2.default.NotFound('Category')));

                        case 12:
                            res.status(200).send(updatedCategory);
                            _context4.next = 18;
                            break;

                        case 15:
                            _context4.prev = 15;
                            _context4.t0 = _context4["catch"](6);

                            next(_context4.t0);

                        case 18:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, _this3, [[6, 15]]);
        }))();
    },
    deleteCategory: function deleteCategory(req, res, next) {
        var _this4 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var id, deletedCategory;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            id = req.params.id;
                            _context5.prev = 1;
                            _context5.next = 4;
                            return _category2.default.findByIdAndRemove(id);

                        case 4:
                            deletedCategory = _context5.sent;

                            if (deletedCategory) {
                                _context5.next = 7;
                                break;
                            }

                            return _context5.abrupt("return", next(new _ApiError2.default.NotFound('Category')));

                        case 7:

                            res.status(204).send();
                            _context5.next = 13;
                            break;

                        case 10:
                            _context5.prev = 10;
                            _context5.t0 = _context5["catch"](1);

                            next(_context5.t0);

                        case 13:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, _this4, [[1, 10]]);
        }))();
    }
};
//# sourceMappingURL=category.controller.js.map