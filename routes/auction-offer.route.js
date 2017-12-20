"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _auctionOffer = require("../controllers/auction-offer.controller");

var _auctionOffer2 = _interopRequireDefault(_auctionOffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
* @swagger
* definitions:
*   AuctionOffer:
*     required:
*     - "bidder"
*     - "price"
*     properties:
*       id:
*         type: string
*         readOnly: true
*       relatedAuction:
*         type: string
*         readOnly: true
*       bidder:
*         type: string
*       price:
*         type: number
*
*/

/**
 * @swagger
 * /auctions/{auctionId}/offers:
 *   post:
 *     tags:
 *       - AuctionOffer
 *     summary: Create an auction offer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: auctionId
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: AuctionOffer Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/AuctionOffer'   
 *     responses:
 *       201:
 *         description: Return Created Auction Offer
 *         example:           
 *               {
 *               "bidder": {
 *                   "fullName": "Magdy",
 *                   "email": "xx@xx.com",
 *                   "address": "82 Fatma",
 *                   "phone": "01157954393",
 *                   "country": "Egypt",
 *                   "id": "5a23d9a74bc62c0014489e3b"
 *               },
 *               "price": 12000,
 *               "relatedAuction": {
 *                   "title": "new Car",
 *                   "description": "Full HD , 3d support",
 *                   "startPrice": 10000,
 *                   "endDate": "2017-12-05T22:00:00.000Z",
 *                   "relatedUser": "5a23d9a74bc62c0014489e3b",
 *                   "relatedCategory": "5a25841337560312b08bb05b",
 *                   "highestPrice": 12000,
 *                   "creationDate": "2017-12-04T17:24:29.201Z",
 *                   "finished": false,
 *                   "imgs": [
 *                   "http://localhost:3000/uploads/auctions/5a2584cd37560312b08bb05c1512408269292.jpeg"
 *                   ],
 *                   "id": "5a2584cd37560312b08bb05c"
 *               },
 *               "id": "5a258970adcca41228e246d3"
 *               }
 *       404: 
 *         description: Auction Not Found
 *       422:
 *         description: |
 *              - bidder Required
 *              - bidder user Is Not Found
 *              ----------------------------
 *              - price required
 *              - Invalid Number
 *              - price must be more than highest price
 */

router.route('/:auctionId/offers').post(_auctionOffer2.default.create);

exports.default = router;
//# sourceMappingURL=auction-offer.route.js.map