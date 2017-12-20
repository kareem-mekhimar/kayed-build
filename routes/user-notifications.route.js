"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _auctionNotification = require("../controllers/auction-notification.controller");

var _auctionNotification2 = _interopRequireDefault(_auctionNotification);

var _barterOfferNotification = require("../controllers/barter-offer-notification.controller");

var _barterOfferNotification2 = _interopRequireDefault(_barterOfferNotification);

var _offerMessageNotification = require("../controllers/offer-message-notification.controller");

var _offerMessageNotification2 = _interopRequireDefault(_offerMessageNotification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
* @swagger
* definitions:
*   AuctionNotification:
*     type: "object"
*     required:
*     - "bidder"
*     - "user"
*     - "relatedAuction"
*     properties:
*       id:
*         type: string
*         readOnly: true
*       bidder:
*         type: object
*         readOnly: true
*       user:
*         type: string
*         readOnly: true
*       relatedAuction:
*         type: object
*         readOnly: true
*       seen:
*         type: boolean
*         default: false
*         readOnly: true
*       creationDate:
*         type: string
*         format: date-time
*         readOnly: true
*/

/**
 * @swagger
 * /users/{id}/notifications/auctions:
 *   get:
 *     tags:
 *       - Notifications
 *     summary: Get a page of auctions notifications
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
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
 *     responses:
 *       200:
 *         description: Get a page of auctions notifications
 *         example: 
 *               {
 *                   "links": {
 *                       "self": "http://localhost:3000/api/v1/auctions?page=6&limit=2",
 *                       "first": "http://localhost:3000/api/v1/auctions?page=1&limit=2",
 *                       "prev": "http://localhost:3000/api/v1/auctions?page=5&limit=2",
 *                       "next": "http://localhost:3000/api/v1/auctions?page=7&limit=2",
 *                       "last": "http://localhost:3000/api/v1/auctions?page=7&limit=2"
 *                   },
 *                   "data": [
 *                       {
 *                           "title": "oppo",
 *                           "description": "good device",
 *                           "startPrice": 100000,
 *                           "relatedCategory": {
 *                               "name": "مجديات",
 *                               "id": "5a2443970b92ff001421a3b9"
 *                           },
 *                           "relatedUser": {
 *                               "email": "hazem.tarek@gmail.com",
 *                               "fullName": "Hazem Tarek",
 *                               "phone": "01014466503",
 *                               "country": "مصر",
 *                               "address": "بورسعيد",
 *                               "img": "http://kayed-api.herokuapp.com/uploads/5a24117b4bc62c0014489e43.png",
 *                               "id": "5a24117b4bc62c0014489e43"
 *                           },
 *                           "endDate": "2017-12-31T00:00:00.000Z",
 *                           "highestPrice": 1300025,
 *                           "creationDate": "2017-12-03T19:27:58.447Z",
 *                           "finished": false,
 *                           "imgs": [
 *                               "http://kayed-api.herokuapp.com/uploads/auctions/5a24503e7585730014f103c61512329278453.jpeg"
 *                           ],
 *                           "id": "5a24503e7585730014f103c6",
 *                           "inMyOffers": true,
 *                           "inMyFavourites": false
 *                       },
 *                       {
 *                           "title": "opel astra",
 *                           "description": "good car",
 *                           "startPrice": 1000,
 *                           "relatedCategory": {
 *                               "name": "سيارات",
 *                               "id": "5a2442fb4311cd0014c1bfb9"
 *                           },
 *                           "relatedUser": {
 *                               "email": "hazem.tarek@gmail.com",
 *                               "fullName": "Hazem Tarek",
 *                               "phone": "01014466503",
 *                               "country": "مصر",
 *                               "address": "بورسعيد",
 *                               "img": "http://kayed-api.herokuapp.com/uploads/5a24117b4bc62c0014489e43.png",
 *                               "id": "5a24117b4bc62c0014489e43"
 *                           },
 *                           "endDate": "2017-12-24T00:00:00.000Z",
 *                           "highestPrice": 10000000000002,
 *                           "creationDate": "2017-12-04T16:14:53.719Z",
 *                           "finished": false,
 *                           "imgs": [
 *                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093721.jpeg",
 *                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093722.jpeg",
 *                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093722.jpeg"
 *                           ],
 *                           "id": "5a25747dcda9950014db1bc1",
 *                           "inMyOffers": true,
 *                           "inMyFavourites": false
 *                       }
 *                   ],
 *                   "page": 6,
 *                   "pageCount": 7,
 *                   "limit": "2",
 *                   "totalCount": 14
 *               }
 */

/**
* @swagger
* /users/{id}/notifications/auctions/unseen:
*   get:
*     tags:
*       - Notifications
*     summary: Get last 10 unseen notifications
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: Get An Array of Auctions Notifications
*         example: 
*               {
*                   "links": {
*                       "self": "http://localhost:3000/api/v1/auctions?page=6&limit=2",
*                       "first": "http://localhost:3000/api/v1/auctions?page=1&limit=2",
*                       "prev": "http://localhost:3000/api/v1/auctions?page=5&limit=2",
*                       "next": "http://localhost:3000/api/v1/auctions?page=7&limit=2",
*                       "last": "http://localhost:3000/api/v1/auctions?page=7&limit=2"
*                   },
*                   "data": [
*                       {
*                           "title": "oppo",
*                           "description": "good device",
*                           "startPrice": 100000,
*                           "relatedCategory": {
*                               "name": "مجديات",
*                               "id": "5a2443970b92ff001421a3b9"
*                           },
*                           "relatedUser": {
*                               "email": "hazem.tarek@gmail.com",
*                               "fullName": "Hazem Tarek",
*                               "phone": "01014466503",
*                               "country": "مصر",
*                               "address": "بورسعيد",
*                               "img": "http://kayed-api.herokuapp.com/uploads/5a24117b4bc62c0014489e43.png",
*                               "id": "5a24117b4bc62c0014489e43"
*                           },
*                           "endDate": "2017-12-31T00:00:00.000Z",
*                           "highestPrice": 1300025,
*                           "creationDate": "2017-12-03T19:27:58.447Z",
*                           "finished": false,
*                           "imgs": [
*                               "http://kayed-api.herokuapp.com/uploads/auctions/5a24503e7585730014f103c61512329278453.jpeg"
*                           ],
*                           "id": "5a24503e7585730014f103c6",
*                           "inMyOffers": true,
*                           "inMyFavourites": false
*                       },
*                       {
*                           "title": "opel astra",
*                           "description": "good car",
*                           "startPrice": 1000,
*                           "relatedCategory": {
*                               "name": "سيارات",
*                               "id": "5a2442fb4311cd0014c1bfb9"
*                           },
*                           "relatedUser": {
*                               "email": "hazem.tarek@gmail.com",
*                               "fullName": "Hazem Tarek",
*                               "phone": "01014466503",
*                               "country": "مصر",
*                               "address": "بورسعيد",
*                               "img": "http://kayed-api.herokuapp.com/uploads/5a24117b4bc62c0014489e43.png",
*                               "id": "5a24117b4bc62c0014489e43"
*                           },
*                           "endDate": "2017-12-24T00:00:00.000Z",
*                           "highestPrice": 10000000000002,
*                           "creationDate": "2017-12-04T16:14:53.719Z",
*                           "finished": false,
*                           "imgs": [
*                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093721.jpeg",
*                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093722.jpeg",
*                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093722.jpeg"
*                           ],
*                           "id": "5a25747dcda9950014db1bc1",
*                           "inMyOffers": true,
*                           "inMyFavourites": false
*                       }
*                   ],
*                   "page": 6,
*                   "pageCount": 7,
*                   "limit": "2",
*                   "totalCount": 14
*               }
*/

/**
 * @swagger
 * /users/{id}/notifications/auctions/reset:
 *   put:
 *     tags:
 *       - Notifications
 *     summary: Reset notifications
 *     produces:
 *       - application/json 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Success No Content
 *         example:           
 *               {
 *               "title": "new Car",
 *               "description": "Full HD , 3d support",
 *               "startPrice": 10000,
 *               "endDate": "2017-12-05T22:00:00.000Z",
 *               "relatedUser": "5a23d9a74bc62c0014489e3b",
 *               "relatedCategory": "5a25841337560312b08bb05b",
 *               "highestPrice": 10000,
 *               "creationDate": "2017-12-04T17:24:29.201Z",
 *               "finished": false,
 *               "imgs": [
 *                   "http://localhost:3000/uploads/auctions/5a2584cd37560312b08bb05c1512408269292.jpeg"
 *               ],
 *               "id": "5a2584cd37560312b08bb05c"
 *               }
 *       422:
 *         description: |
 *              - relatedUser is Required
 *              - Related user Is Not Found
 *              ----------------------------
 *              - relatedCategory is Required 
 *              - Related category Is Not Found
 *              ----------------------------
 *              - title is Required 
 *              - description is Required 
 *              - endDate is Required 
 *              ----------------------------
 *              - startPrice is Required 
 *              - Invalid Number
 *              ----------------------------
 *              - Provide at least one image
*/

// Auctions Notifications

router.route('/:id/notifications/auctions').get(_auctionNotification2.default.findAll);

router.route('/:id/notifications/auctions/unseen').get(_auctionNotification2.default.findUnseen);

router.route('/:id/notifications/auctions/reset').put(_auctionNotification2.default.reset);

/**
* @swagger
* definitions:
*   BarterOfferNotification:
*     type: "object"
*     properties:
*       id:
*         type: string
*         readOnly: true
*       user:
*         type: string
*         readOnly: true
*       offerUser:
*         type: string
*         readOnly: true
*       relatedBarter:
*         type: object
*         readOnly: true
*       seen:
*         type: boolean
*         default: false
*         readOnly: true
*       creationDate:
*         type: string
*         format: date-time
*         readOnly: true
*/

/**
 * @swagger
 * /users/{id}/notifications/barters-offers:
 *   get:
 *     tags:
 *       - Notifications
 *     summary: Get a page of barters-offers notifications
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
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
 *     responses:
 *       200:
 *         description: Get a page of barters-offers notifications
 *         example: 
 *               {
 *                   "links": {
 *                       "self": "http://localhost:3000/api/v1/auctions?page=6&limit=2",
 *                       "first": "http://localhost:3000/api/v1/auctions?page=1&limit=2",
 *                       "prev": "http://localhost:3000/api/v1/auctions?page=5&limit=2",
 *                       "next": "http://localhost:3000/api/v1/auctions?page=7&limit=2",
 *                       "last": "http://localhost:3000/api/v1/auctions?page=7&limit=2"
 *                   },
 *                   "data": [
 *                       {
 *                           "title": "oppo",
 *                           "description": "good device",
 *                           "startPrice": 100000,
 *                           "relatedCategory": {
 *                               "name": "مجديات",
 *                               "id": "5a2443970b92ff001421a3b9"
 *                           },
 *                           "relatedUser": {
 *                               "email": "hazem.tarek@gmail.com",
 *                               "fullName": "Hazem Tarek",
 *                               "phone": "01014466503",
 *                               "country": "مصر",
 *                               "address": "بورسعيد",
 *                               "img": "http://kayed-api.herokuapp.com/uploads/5a24117b4bc62c0014489e43.png",
 *                               "id": "5a24117b4bc62c0014489e43"
 *                           },
 *                           "endDate": "2017-12-31T00:00:00.000Z",
 *                           "highestPrice": 1300025,
 *                           "creationDate": "2017-12-03T19:27:58.447Z",
 *                           "finished": false,
 *                           "imgs": [
 *                               "http://kayed-api.herokuapp.com/uploads/auctions/5a24503e7585730014f103c61512329278453.jpeg"
 *                           ],
 *                           "id": "5a24503e7585730014f103c6",
 *                           "inMyOffers": true,
 *                           "inMyFavourites": false
 *                       },
 *                       {
 *                           "title": "opel astra",
 *                           "description": "good car",
 *                           "startPrice": 1000,
 *                           "relatedCategory": {
 *                               "name": "سيارات",
 *                               "id": "5a2442fb4311cd0014c1bfb9"
 *                           },
 *                           "relatedUser": {
 *                               "email": "hazem.tarek@gmail.com",
 *                               "fullName": "Hazem Tarek",
 *                               "phone": "01014466503",
 *                               "country": "مصر",
 *                               "address": "بورسعيد",
 *                               "img": "http://kayed-api.herokuapp.com/uploads/5a24117b4bc62c0014489e43.png",
 *                               "id": "5a24117b4bc62c0014489e43"
 *                           },
 *                           "endDate": "2017-12-24T00:00:00.000Z",
 *                           "highestPrice": 10000000000002,
 *                           "creationDate": "2017-12-04T16:14:53.719Z",
 *                           "finished": false,
 *                           "imgs": [
 *                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093721.jpeg",
 *                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093722.jpeg",
 *                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093722.jpeg"
 *                           ],
 *                           "id": "5a25747dcda9950014db1bc1",
 *                           "inMyOffers": true,
 *                           "inMyFavourites": false
 *                       }
 *                   ],
 *                   "page": 6,
 *                   "pageCount": 7,
 *                   "limit": "2",
 *                   "totalCount": 14
 *               }
 */

/**
* @swagger
* /users/{id}/notifications/barters-offers/unseen:
*   get:
*     tags:
*       - Notifications
*     summary: Get last 10 unseen notifications
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: Get An Array of Auctions Notifications
*         example: 
*               {
*                   "links": {
*                       "self": "http://localhost:3000/api/v1/auctions?page=6&limit=2",
*                       "first": "http://localhost:3000/api/v1/auctions?page=1&limit=2",
*                       "prev": "http://localhost:3000/api/v1/auctions?page=5&limit=2",
*                       "next": "http://localhost:3000/api/v1/auctions?page=7&limit=2",
*                       "last": "http://localhost:3000/api/v1/auctions?page=7&limit=2"
*                   },
*                   "data": [
*                       {
*                           "title": "oppo",
*                           "description": "good device",
*                           "startPrice": 100000,
*                           "relatedCategory": {
*                               "name": "مجديات",
*                               "id": "5a2443970b92ff001421a3b9"
*                           },
*                           "relatedUser": {
*                               "email": "hazem.tarek@gmail.com",
*                               "fullName": "Hazem Tarek",
*                               "phone": "01014466503",
*                               "country": "مصر",
*                               "address": "بورسعيد",
*                               "img": "http://kayed-api.herokuapp.com/uploads/5a24117b4bc62c0014489e43.png",
*                               "id": "5a24117b4bc62c0014489e43"
*                           },
*                           "endDate": "2017-12-31T00:00:00.000Z",
*                           "highestPrice": 1300025,
*                           "creationDate": "2017-12-03T19:27:58.447Z",
*                           "finished": false,
*                           "imgs": [
*                               "http://kayed-api.herokuapp.com/uploads/auctions/5a24503e7585730014f103c61512329278453.jpeg"
*                           ],
*                           "id": "5a24503e7585730014f103c6",
*                           "inMyOffers": true,
*                           "inMyFavourites": false
*                       },
*                       {
*                           "title": "opel astra",
*                           "description": "good car",
*                           "startPrice": 1000,
*                           "relatedCategory": {
*                               "name": "سيارات",
*                               "id": "5a2442fb4311cd0014c1bfb9"
*                           },
*                           "relatedUser": {
*                               "email": "hazem.tarek@gmail.com",
*                               "fullName": "Hazem Tarek",
*                               "phone": "01014466503",
*                               "country": "مصر",
*                               "address": "بورسعيد",
*                               "img": "http://kayed-api.herokuapp.com/uploads/5a24117b4bc62c0014489e43.png",
*                               "id": "5a24117b4bc62c0014489e43"
*                           },
*                           "endDate": "2017-12-24T00:00:00.000Z",
*                           "highestPrice": 10000000000002,
*                           "creationDate": "2017-12-04T16:14:53.719Z",
*                           "finished": false,
*                           "imgs": [
*                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093721.jpeg",
*                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093722.jpeg",
*                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093722.jpeg"
*                           ],
*                           "id": "5a25747dcda9950014db1bc1",
*                           "inMyOffers": true,
*                           "inMyFavourites": false
*                       }
*                   ],
*                   "page": 6,
*                   "pageCount": 7,
*                   "limit": "2",
*                   "totalCount": 14
*               }
*/

/**
 * @swagger
 * /users/{id}/notifications/barters-offers/reset:
 *   put:
 *     tags:
 *       - Notifications
 *     summary: Reset notifications
 *     produces:
 *       - application/json 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Success No Content
 *         example:           
 *               {
 *               "title": "new Car",
 *               "description": "Full HD , 3d support",
 *               "startPrice": 10000,
 *               "endDate": "2017-12-05T22:00:00.000Z",
 *               "relatedUser": "5a23d9a74bc62c0014489e3b",
 *               "relatedCategory": "5a25841337560312b08bb05b",
 *               "highestPrice": 10000,
 *               "creationDate": "2017-12-04T17:24:29.201Z",
 *               "finished": false,
 *               "imgs": [
 *                   "http://localhost:3000/uploads/auctions/5a2584cd37560312b08bb05c1512408269292.jpeg"
 *               ],
 *               "id": "5a2584cd37560312b08bb05c"
 *               }
 *       422:
 *         description: |
 *              - relatedUser is Required
 *              - Related user Is Not Found
 *              ----------------------------
 *              - relatedCategory is Required 
 *              - Related category Is Not Found
 *              ----------------------------
 *              - title is Required 
 *              - description is Required 
 *              - endDate is Required 
 *              ----------------------------
 *              - startPrice is Required 
 *              - Invalid Number
 *              ----------------------------
 *              - Provide at least one image
*/

// BarterOffer Notifications

router.route('/:id/notifications/barters-offers').get(_barterOfferNotification2.default.findAll);

router.route('/:id/notifications/barters-offers/unseen').get(_barterOfferNotification2.default.findManyUnseen);

router.route('/:id/notifications/barters-offers/reset').put(_barterOfferNotification2.default.resetAll);
// --------------------------------------------------------------


/**
* @swagger
* definitions:
*   OfferMessageNotification:
*     type: "object"
*     properties:
*       id:
*         type: string
*         readOnly: true
*       user:
*         type: string
*         readOnly: true
*       offerUser:
*         type: string
*         readOnly: true
*       relatedBarterOffer:
*         type: object
*         readOnly: true
*       seen:
*         type: boolean
*         default: false
*         readOnly: true
*       creationDate:
*         type: string
*         format: date-time
*         readOnly: true
*/

/**
 * @swagger
 * /users/{id}/notifications/offer-messages:
 *   get:
 *     tags:
 *       - Notifications
 *     summary: Get a page of offer-messages notifications
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
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
 *     responses:
 *       200:
 *         description: Get a page of offer-messages notifications
 *         example: 
 *               {
 *                   "links": {
 *                       "self": "http://localhost:3000/api/v1/auctions?page=6&limit=2",
 *                       "first": "http://localhost:3000/api/v1/auctions?page=1&limit=2",
 *                       "prev": "http://localhost:3000/api/v1/auctions?page=5&limit=2",
 *                       "next": "http://localhost:3000/api/v1/auctions?page=7&limit=2",
 *                       "last": "http://localhost:3000/api/v1/auctions?page=7&limit=2"
 *                   },
 *                   "data": [
 *                       {
 *                           "title": "oppo",
 *                           "description": "good device",
 *                           "startPrice": 100000,
 *                           "relatedCategory": {
 *                               "name": "مجديات",
 *                               "id": "5a2443970b92ff001421a3b9"
 *                           },
 *                           "relatedUser": {
 *                               "email": "hazem.tarek@gmail.com",
 *                               "fullName": "Hazem Tarek",
 *                               "phone": "01014466503",
 *                               "country": "مصر",
 *                               "address": "بورسعيد",
 *                               "img": "http://kayed-api.herokuapp.com/uploads/5a24117b4bc62c0014489e43.png",
 *                               "id": "5a24117b4bc62c0014489e43"
 *                           },
 *                           "endDate": "2017-12-31T00:00:00.000Z",
 *                           "highestPrice": 1300025,
 *                           "creationDate": "2017-12-03T19:27:58.447Z",
 *                           "finished": false,
 *                           "imgs": [
 *                               "http://kayed-api.herokuapp.com/uploads/auctions/5a24503e7585730014f103c61512329278453.jpeg"
 *                           ],
 *                           "id": "5a24503e7585730014f103c6",
 *                           "inMyOffers": true,
 *                           "inMyFavourites": false
 *                       },
 *                       {
 *                           "title": "opel astra",
 *                           "description": "good car",
 *                           "startPrice": 1000,
 *                           "relatedCategory": {
 *                               "name": "سيارات",
 *                               "id": "5a2442fb4311cd0014c1bfb9"
 *                           },
 *                           "relatedUser": {
 *                               "email": "hazem.tarek@gmail.com",
 *                               "fullName": "Hazem Tarek",
 *                               "phone": "01014466503",
 *                               "country": "مصر",
 *                               "address": "بورسعيد",
 *                               "img": "http://kayed-api.herokuapp.com/uploads/5a24117b4bc62c0014489e43.png",
 *                               "id": "5a24117b4bc62c0014489e43"
 *                           },
 *                           "endDate": "2017-12-24T00:00:00.000Z",
 *                           "highestPrice": 10000000000002,
 *                           "creationDate": "2017-12-04T16:14:53.719Z",
 *                           "finished": false,
 *                           "imgs": [
 *                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093721.jpeg",
 *                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093722.jpeg",
 *                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093722.jpeg"
 *                           ],
 *                           "id": "5a25747dcda9950014db1bc1",
 *                           "inMyOffers": true,
 *                           "inMyFavourites": false
 *                       }
 *                   ],
 *                   "page": 6,
 *                   "pageCount": 7,
 *                   "limit": "2",
 *                   "totalCount": 14
 *               }
 */

/**
* @swagger
* /users/{id}/notifications/offer-messages/unseen:
*   get:
*     tags:
*       - Notifications
*     summary: Get last 10 unseen notifications
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: Get An Array of offer-messages Notifications
*         example: 
*               {
*                   "links": {
*                       "self": "http://localhost:3000/api/v1/auctions?page=6&limit=2",
*                       "first": "http://localhost:3000/api/v1/auctions?page=1&limit=2",
*                       "prev": "http://localhost:3000/api/v1/auctions?page=5&limit=2",
*                       "next": "http://localhost:3000/api/v1/auctions?page=7&limit=2",
*                       "last": "http://localhost:3000/api/v1/auctions?page=7&limit=2"
*                   },
*                   "data": [
*                       {
*                           "title": "oppo",
*                           "description": "good device",
*                           "startPrice": 100000,
*                           "relatedCategory": {
*                               "name": "مجديات",
*                               "id": "5a2443970b92ff001421a3b9"
*                           },
*                           "relatedUser": {
*                               "email": "hazem.tarek@gmail.com",
*                               "fullName": "Hazem Tarek",
*                               "phone": "01014466503",
*                               "country": "مصر",
*                               "address": "بورسعيد",
*                               "img": "http://kayed-api.herokuapp.com/uploads/5a24117b4bc62c0014489e43.png",
*                               "id": "5a24117b4bc62c0014489e43"
*                           },
*                           "endDate": "2017-12-31T00:00:00.000Z",
*                           "highestPrice": 1300025,
*                           "creationDate": "2017-12-03T19:27:58.447Z",
*                           "finished": false,
*                           "imgs": [
*                               "http://kayed-api.herokuapp.com/uploads/auctions/5a24503e7585730014f103c61512329278453.jpeg"
*                           ],
*                           "id": "5a24503e7585730014f103c6",
*                           "inMyOffers": true,
*                           "inMyFavourites": false
*                       },
*                       {
*                           "title": "opel astra",
*                           "description": "good car",
*                           "startPrice": 1000,
*                           "relatedCategory": {
*                               "name": "سيارات",
*                               "id": "5a2442fb4311cd0014c1bfb9"
*                           },
*                           "relatedUser": {
*                               "email": "hazem.tarek@gmail.com",
*                               "fullName": "Hazem Tarek",
*                               "phone": "01014466503",
*                               "country": "مصر",
*                               "address": "بورسعيد",
*                               "img": "http://kayed-api.herokuapp.com/uploads/5a24117b4bc62c0014489e43.png",
*                               "id": "5a24117b4bc62c0014489e43"
*                           },
*                           "endDate": "2017-12-24T00:00:00.000Z",
*                           "highestPrice": 10000000000002,
*                           "creationDate": "2017-12-04T16:14:53.719Z",
*                           "finished": false,
*                           "imgs": [
*                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093721.jpeg",
*                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093722.jpeg",
*                               "http://kayed-api.herokuapp.com/uploads/auctions/5a25747dcda9950014db1bc11512404093722.jpeg"
*                           ],
*                           "id": "5a25747dcda9950014db1bc1",
*                           "inMyOffers": true,
*                           "inMyFavourites": false
*                       }
*                   ],
*                   "page": 6,
*                   "pageCount": 7,
*                   "limit": "2",
*                   "totalCount": 14
*               }
*/

/**
 * @swagger
 * /users/{id}/notifications/offer-messages/reset:
 *   put:
 *     tags:
 *       - Notifications
 *     summary: Reset notifications
 *     produces:
 *       - application/json 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Success No Content
 *         example:           
 *               {
 *               "title": "new Car",
 *               "description": "Full HD , 3d support",
 *               "startPrice": 10000,
 *               "endDate": "2017-12-05T22:00:00.000Z",
 *               "relatedUser": "5a23d9a74bc62c0014489e3b",
 *               "relatedCategory": "5a25841337560312b08bb05b",
 *               "highestPrice": 10000,
 *               "creationDate": "2017-12-04T17:24:29.201Z",
 *               "finished": false,
 *               "imgs": [
 *                   "http://localhost:3000/uploads/auctions/5a2584cd37560312b08bb05c1512408269292.jpeg"
 *               ],
 *               "id": "5a2584cd37560312b08bb05c"
 *               }
 *       422:
 *         description: |
 *              - relatedUser is Required
 *              - Related user Is Not Found
 *              ----------------------------
 *              - relatedCategory is Required 
 *              - Related category Is Not Found
 *              ----------------------------
 *              - title is Required 
 *              - description is Required 
 *              - endDate is Required 
 *              ----------------------------
 *              - startPrice is Required 
 *              - Invalid Number
 *              ----------------------------
 *              - Provide at least one image
*/

// OfferMessages Notifications

router.route('/:id/notifications/offer-messages').get(_offerMessageNotification2.default.findAll);

router.route('/:id/notifications/offer-messages/unseen').get(_offerMessageNotification2.default.findManyUnseen);

router.route('/:id/notifications/offer-messages/reset').put(_offerMessageNotification2.default.resetAll);

exports.default = router;
//# sourceMappingURL=user-notifications.route.js.map