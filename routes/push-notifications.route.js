"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _pushNotifications = require("../controllers/push-notifications.controller");

var _pushNotifications2 = _interopRequireDefault(_pushNotifications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
* @swagger
* definitions:
*   PushNotification:
*     type: "object"
*     properties:
*       token:
*         type: string
*/

/**
 * @swagger
 * /notifications/subscribe:
 *   post:
 *     tags:
 *       - PushNotifications
 *     summary: Subscribe
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: PushNotification Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/PushNotification'
 *     responses:
 *       204:
 *         description: Success
 *       422:
 *         description: |
 *              - To Be Added
 */

/**
 * @swagger
 * /notifications/unsubscribe:
 *   delete:
 *     tags:
 *       - PushNotifications
 *     summary: UnSubscribe
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: Success
 */

router.route('/subscribe').post(_pushNotifications2.default.subscribe);
router.route('/unsubscribe').delete(_pushNotifications2.default.unsubscribe);

exports.default = router;
//# sourceMappingURL=push-notifications.route.js.map