"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _user = require("../controllers/user.controller");

var _user2 = _interopRequireDefault(_user);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passport3 = require("../services/passport");

var _passport4 = _interopRequireDefault(_passport3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requireSignIn = _passport2.default.authenticate('local', { session: false });
var router = _express2.default.Router();

/**
 * @swagger
 * /signin:
 *   post:
 *     tags:
 *       - Auth
 *     description: Sign in to the api
         *     parameters:
         *       - name: body
         *         description: Credentials
         *         in: body
         *         required: true
         *         schema:
         *           $ref: '#/definitions/LoginBody'
         *     responses:
         *       200:
         *         description: Returns saved user + your token
         *       400:
         *         description: You have made an error maybe you didn't provide a required attribute
 */

/**
* @swagger
* definitions:
*   LoginBody:
*     required:
*     - "email"
*     - "password"
*     properties:
*       email:
*         type: string
*       password:
*         type: string
*/

router.post("/signin", requireSignIn, _user2.default.signIn);

/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - Auth
 *     description: Sign up to the api
 *     parameters:
 *       - name: body
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: Returns saved user + your token
 *       400:
 *         description: You have made an error maybe you didn't provide a required attribute
 */

/**
* @swagger
* definitions:
*   User:
*     required:
*     - "fullName"
*     - "email"
*     - "password"
*     - "address"
*     - "phone"
*     - "country"
*     properties:
*       fullName:
*         type: string
*       email:
*         type: string
*       password:
*         type: string
*       address:
*         type: string
*       phone:
*         type: string
*       country:
*         type: string
*       img:
*         type: string
*/

router.route('/signup').post(_user2.default.signUp);

exports.default = router;
//# sourceMappingURL=auth.route.js.map