"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _offerMessage = require("../controllers/offer-message.controller");

var _offerMessage2 = _interopRequireDefault(_offerMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
* @swagger
* definitions:
*   OfferMessage:
*     required:
*     - "text"
*     - "relatedUser"
*     properties:
*       id:
*         type: string
*         readOnly: true
*       relatedUser:
*         type: string
*       relatedBarterOffer:
*         type: string
*         readOnly: true
*       text:
*         type: string
*       creationDate:
*         type: string
*         format: date-time
*         readOnly: true
*/

/**
 * @swagger
 * /barters/{barterId}/offers/{offerId}/messages:
 *   get:
 *     tags:
 *       - OfferMessage
 *     summary: Get all Messsages
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: barterId
 *         in: path
 *         required: true
 *         type: string
 *       - name: offerId
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: OfferMessage Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/OfferMessage'   
 *     responses:
 *       201:
 *         description: Return Created Message
 *         example:           
 *               {
 *                   "relatedBarter": {
 *                       "title": "Samsung Note 8",
 *                       "description": "This is a description for new mobile phone of samsung",
 *                       "neededProduct": "Iphone x",
 *                       "relatedUser": "5a1db2b8a3c9862828910bef",
 *                       "relatedCategory": "5a1db3a29246d21c0c4056cf",
 *                       "creationDate": "2017-11-30T11:49:25.392Z",
 *                       "finished": false,
 *                       "imgs": [],
 *                       "type": "TEMP",
 *                       "id": "5a1ff0456cd27932acaad627"
 *                   },
 *                   "relatedUser": {
 *                       "fullName": "magdy",
 *                       "email": "demo@demo.com",
 *                       "address": "82 Fatma El zhraa",
 *                       "phone": "01157954393",
 *                       "country": "egypt",
 *                       "id": "5a1db2b8a3c9862828910bef"
 *                   },
 *                   "description": "Samsung Note",
 *                   "offeredProduct": "TV Samsung",
 *                   "status": "PENDING",
 *                   "imgs": [
 *                       "https://wallpaperbrowse.com/media/images/maxresdefault_9As8F3D.jpg"
 *                   ],
 *                   "creationDate": "2017-11-30T14:27:32.457Z",
 *                   "id": "5a2015540031364a2043efa8"
 *               }
 *       422:
 *         description: |
 *              - relatedBarter is Required
 *              - Enter a valid barter id
 *              ----------------------------
 *              - relatedUser is Required
 *              - Enter a valid user id
 *              ----------------------------
 *              - description is Required 
 *              - offeredProduct is Required 
 *              ----------------------------
 *              - imgs is Required 
 *              - Imgs Should be an array of imgs's urls
 *              ----------------------------
 *              - Optional status: you can't overwrite status it's PENDING by default
 */

router.route('/:barterId/offers/:offerId/messages').get(_offerMessage2.default.findAll);

exports.default = router;
//# sourceMappingURL=offer-message.route.js.map