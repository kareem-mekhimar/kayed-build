"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _barterOffer = require("../controllers/barter-offer.controller");

var _barterOffer2 = _interopRequireDefault(_barterOffer);

var _offerMessage = require("../routes/offer-message.route");

var _offerMessage2 = _interopRequireDefault(_offerMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
* @swagger
* definitions:
*   BarterOffer:
*     required:
*     - "relatedBarter"
*     - "relatedUser"
*     - "description"
*     - "offeredProduct"
*     - "imgs"
*     properties:
*       id:
*         type: string
*         readOnly: true
*       relatedBarter:
*         type: string
*         readOnly: true
*       relatedUser:
*         type: string
*       description:
*         type: string
*       offeredProduct:
*         type: string
*       imgs:
*         type: array
*         items:
*           type: string
*           format: "base64"
*       status:
*         type: string
*         enum:
*         - "PENDING"
*         - "ACCEPTED"
*         - "REJECTED"
*         - "DONE"
*         readOnly: true
*         default: "PENDING"
*   Status:
*     properties:
*       status:
*         type: string
*
*/

/**
 * @swagger
 * /barters/{barterId}/offers:
 *   get:
 *     tags:
 *       - BarterOffer
 *     summary: Get all BarterOffers
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: barterId
 *         in: path
 *         required: true
 *         type: string
 *       - name: "page"
 *         in: "query"
 *         type: number
 *         default: 1
 *       - name: "limit"
 *         in: "query"
 *         type: number
 *         default: 20
 *       - name: "status"
 *         in: "query"
 *         type: string
 *         description: PENDING - ACCEPTED - REJECTED - DONE
 *     responses:
 *       200:
 *         description: Get An Array of BartersOffers
 *         example: 
 *               {
 *               "links": {
 *                   "self": "http://localhost:3000/api/v1/barters/5a249e4148d6362638faeb9d/offers?page=1&limit=20"
 *               },
 *               "data": [
 *                   {
 *                   "relatedUser": {
 *                       "fullName": "Magdyxa",
 *                       "email": "x2a@x2a.com",
 *                       "address": "82 Fatma",
 *                       "phone": "01157954393",
 *                       "country": "Egypt",
 *                       "id": "5a1db2b8a3c9862828910bef"
 *                   },
 *                   "description": "Samsung Note B",
 *                   "offeredProduct": "LG TV 2018",
 *                   "relatedBarter": {
 *                       "title": "Samsung A",
 *                       "description": "assasasaasasas",
 *                       "neededProduct": "AAAAK",
 *                       "relatedUser": "5a23d9a74bc62c0014489e3b",
 *                       "relatedCategory": "5a24430e4311cd0014c1bfba",
 *                       "barterOffer": "5a2532c7cb4ed22fc0831e61",
 *                       "creationDate": "2017-12-04T01:00:49.846Z",
 *                       "finished": true,
 *                       "imgs": [
 *                       "http://localhost:3000/uploads/barters/5a249e4148d6362638faeb9d0.jpeg"
 *                       ],
 *                       "type": "TEMP",
 *                       "id": "5a249e4148d6362638faeb9d"
 *                   },
 *                   "status": "PENDING",
 *                   "imgs": [
 *                       "http://localhost:3000/uploads/barter-offers/5a25341ecb4ed22fc0831e620.jpeg"
 *                   ],
 *                   "creationDate": "2017-12-04T11:40:14.678Z",
 *                   "id": "5a25341ecb4ed22fc0831e62"
 *                   },
 *                   {
 *                   "relatedUser": {
 *                       "fullName": "Magdyxa",
 *                       "email": "x2a@x2a.com",
 *                       "address": "82 Fatma",
 *                       "phone": "01157954393",
 *                       "country": "Egypt",
 *                       "id": "5a1db2b8a3c9862828910bef"
 *                   },
 *                   "description": "Samsung Note A",
 *                   "offeredProduct": "LG TV 2017",
 *                   "relatedBarter": {
 *                       "title": "Samsung A",
 *                       "description": "assasasaasasas",
 *                       "neededProduct": "AAAAK",
 *                       "relatedUser": "5a23d9a74bc62c0014489e3b",
 *                       "relatedCategory": "5a24430e4311cd0014c1bfba",
 *                       "barterOffer": "5a2532c7cb4ed22fc0831e61",
 *                       "creationDate": "2017-12-04T01:00:49.846Z",
 *                       "finished": true,
 *                       "imgs": [
 *                       "http://localhost:3000/uploads/barters/5a249e4148d6362638faeb9d0.jpeg"
 *                       ],
 *                       "type": "TEMP",
 *                       "id": "5a249e4148d6362638faeb9d"
 *                   },
 *                   "status": "DONE",
 *                   "imgs": [
 *                       "http://localhost:3000/uploads/barter-offers/5a2532c7cb4ed22fc0831e610.jpeg"
 *                   ],
 *                   "creationDate": "2017-12-04T11:34:31.576Z",
 *                   "id": "5a2532c7cb4ed22fc0831e61"
 *                   }
 *               ],
 *               "page": 1,
 *               "pageCount": 1,
 *               "limit": 20,
 *               "totalCount": 2
 *               }
 */

/**
 * @swagger
 * /barters/{barterId}/offers:
 *   post:
 *     tags:
 *       - BarterOffer
 *     summary: Create a barter offer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: barterId
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: BarterOffer Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/BarterOffer'   
 *     responses:
 *       201:
 *         description: Return Created BarterOffer
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

router.route('/:barterId/offers').get(_barterOffer2.default.findAll).post(_barterOffer2.default.createBarterOffer);

router.use(_offerMessage2.default);

/**
 * @swagger
 * /barters/{barterId}/offers/{offerId}:
 *   get:
 *     tags:
 *       - BarterOffer
 *     summary: Get a sepcific barter offer
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
 *     responses:
 *       200:
 *         description: Get a barter offer
 *         example: 
 *               {
 *                   "relatedBarter": {
 *                       "title": "Samsung Note 8",
 *                       "description": "This is a description for new mobile phone of samsung",
 *                       "neededProduct": "Iphone x",
 *                       "relatedUser": "5a1db2b8a3c9862828910bef",
 *                       "relatedCategory": "5a1db3a29246d21c0c4056cf",
 *                       "barterOffer": "5a20514241be11491c6a00e0",
 *                       "creationDate": "2017-11-30T11:49:25.392Z",
 *                       "finished": true,
 *                       "imgs": [],
 *                       "type": "TEMP",
 *                       "id": "5a1ff0456cd27932acaad627"
 *                   },
 *                   "relatedUser": {
 *                       "fullName": "magdy",
 *                       "email": "demo@demo.com",
 *                       "address": "ASasasas",
 *                       "phone": "01157954393",
 *                       "country": "egypt",
 *                       "id": "5a1db2b8a3c9862828910bef"
 *                   },
 *                   "description": "Samsung Note",
 *                   "offeredProduct": "LG TV 2017",
 *                   "status": "ACCEPTED",
 *                   "imgs": [
 *                       "https://wallpaperbrowse.com/media/images/81.jpg"
 *                   ],
 *                   "creationDate": "2017-12-02T14:54:37.521Z",
 *                   "id": "5a22beadf76e80383c82cb0a"
 *               }
 *       404:
 *         description: BarterOffer Not Found
*/

/**
 * @swagger
 * /barters/{barterId}/offers/{offerId}:
 *   put:
 *     tags:
 *       - BarterOffer
 *     summary: Update an existing barter offer
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
 *         description: BarterOffer Object
 *         in: body
 *         required: true
 *         schema:
 *             $ref: "#/definitions/Status"
 *     responses:
 *       200:
 *         description: Return Updated BarterOffer
 *         example:           
 *                {
 *                   "relatedBarter": "5a1ff0456cd27932acaad627",
 *                   "relatedUser": "5a1db2b8a3c9862828910bef",
 *                   "description": "Samsung Note",
 *                   "offeredProduct": "LG TV 2017",
 *                   "status": "ACCEPTED",
 *                   "imgs": [
 *                       "https://wallpaperbrowse.com/media/images/81.jpg"
 *                   ],
 *                   "creationDate": "2017-12-02T14:54:37.521Z",
 *                   "id": "5a22beadf76e80383c82cb0a"
 *               }
 *       400:
 *         description: | 
 *              - status should be ACCEPTED or REJECTED IF status of barterOffer is PENDING
 *              - status should be DONE or REJECTED is IF status of barterOffer is ACCEPTED
 *              - you can't update DONE or REJECTED offer IF status of barterOffer is DONE OR REJECTED
 *       404:
 *         description: BarterOffer Not Found
 *       422:
 *         description: |
 *              ----------------------------
 *              - status: valid status is required
 *              - status should be one of ['PENDING','ACCEPTED','REJECTED','DONE']
 */

router.route('/:barterId/offers/:offerId').get(_barterOffer2.default.findById).put(_barterOffer2.default.updateBarterOffer);

exports.default = router;
//# sourceMappingURL=barter-offer.route.js.map