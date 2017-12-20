"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passport3 = require("../services/passport");

var _passport4 = _interopRequireDefault(_passport3);

var _auth = require("./auth.route");

var _auth2 = _interopRequireDefault(_auth);

var _user = require("./user.route");

var _user2 = _interopRequireDefault(_user);

var _category = require("./category.route");

var _category2 = _interopRequireDefault(_category);

var _barter = require("./barter.route");

var _barter2 = _interopRequireDefault(_barter);

var _auction = require("./auction.route");

var _auction2 = _interopRequireDefault(_auction);

var _search = require("./search.route");

var _search2 = _interopRequireDefault(_search);

var _pushNotifications = require("./push-notifications.route");

var _pushNotifications2 = _interopRequireDefault(_pushNotifications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requireAuth = _passport2.default.authenticate('jwt', { session: false });

var router = _express2.default.Router();

router.use("/", _auth2.default);

router.use("/search", requireAuth, _search2.default);

router.use("/users", requireAuth, _user2.default);

router.use("/categories", requireAuth, _category2.default);

router.use("/barters", requireAuth, _barter2.default);

router.use("/auctions", requireAuth, _auction2.default);

router.use("/notifications", requireAuth, _pushNotifications2.default);

exports.default = router;
//# sourceMappingURL=index.js.map