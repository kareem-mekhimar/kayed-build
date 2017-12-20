"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _userOffers = require("../controllers/user-offers.controller");

var _userOffers2 = _interopRequireDefault(_userOffers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * @swagger
 * /users/{id}/barter-offers:
 *   get:
 *     tags:
 *       - User Offers
 *     summary: Get all User's barters which has Offered on !
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
 *       - name: "limit"
 *         in: "query"
 *         type: number
 *       - name: "status"
 *         in: "query"
 *         type: string
 *         description: PENDING - ACCEPTED - REJECTED - DONE
 *     responses:
 *       200:
 *         description: Get An Array of User's Barters which has offered on
 *         example: 
 *               {
 *                   "links": {
 *                       "self": "http://localhost:3000/api/v1/users/5a2698c11287c23b1868278b/barter-offers?page=1&limit=2",
 *                       "next": "http://localhost:3000/api/v1/users/5a2698c11287c23b1868278b/barter-offers?page=2&limit=2",
 *                       "last": "http://localhost:3000/api/v1/users/5a2698c11287c23b1868278b/barter-offers?page=3&limit=2"
 *                   },
 *                   "data": [
 *                       {
 *                           "title": "اقف4الا",
 *                           "description": "5ا54ا",
 *                           "neededProduct": "ا45ا",
 *                           "relatedCategory": {
 *                               "name": "اكسسوارات",
 *                               "id": "5a2443740b92ff001421a3b8"
 *                           },
 *                           "relatedUser": {
 *                               "email": "mish@mish.com",
 *                               "fullName": "miso",
 *                               "phone": "121335",
 *                               "country": "السعودية",
 *                               "address": "جدة",
 *                               "img": "http://kayed-api.herokuapp.com/uploads/5a284d13656ea20014103b22.jpeg",
 *                               "id": "5a284d13656ea20014103b22"
 *                           },
 *                           "creationDate": "2017-12-06T20:04:18.390Z",
 *                           "finished": false,
 *                           "imgs": [
 *                               "http://kayed-api.herokuapp.com/uploads/barters/5a284d42656ea20014103b230.jpeg"
 *                           ],
 *                           "type": "TEMP",
 *                           "id": "5a284d42656ea20014103b23",
 *                           "inMyOffers": true,
 *                           "inMyFavourites": false
 *                       },
 *                       {
 *                           "title": "Samsung A",
 *                           "description": "assasasaasasas",
 *                           "neededProduct": "AAAAK",
 *                           "relatedUser": {
 *                               "fullName": "Magdyxy",
 *                               "email": "x2x@x2x.com",
 *                               "address": "82 Fatma",
 *                               "phone": "01157954393",
 *                               "country": "Egypt",
 *                               "id": "5a23d9a74bc62c0014489e3b"
 *                           },
 *                           "relatedCategory": {
 *                               "name": "موبايلات",
 *                               "id": "5a24430e4311cd0014c1bfba"
 *                           },
 *                           "barterOffer": {
 *                               "relatedUser": "5a1db2b8a3c9862828910bef",
 *                               "description": "Samsung Note A",
 *                               "offeredProduct": "LG TV 2017",
 *                               "relatedBarter": "5a249e4148d6362638faeb9d",
 *                               "status": "DONE",
 *                               "imgs": [
 *                                   "http://localhost:3000/uploads/barter-offers/5a2532c7cb4ed22fc0831e610.jpeg"
 *                               ],
 *                               "creationDate": "2017-12-04T11:34:31.576Z",
 *                               "id": "5a2532c7cb4ed22fc0831e61"
 *                           },
 *                           "creationDate": "2017-12-04T01:00:49.846Z",
 *                           "finished": true,
 *                           "imgs": [
 *                               "http://localhost:3000/uploads/barters/5a249e4148d6362638faeb9d0.jpeg"
 *                           ],
 *                           "type": "TEMP",
 *                           "id": "5a249e4148d6362638faeb9d",
 *                           "inMyOffers": true,
 *                           "inMyFavourites": false
 *                       }
 *                   ],
 *                   "page": 1,
 *                   "pageCount": 3,
 *                   "limit": 2,
 *                   "totalCount": 6
 *               }
 */

router.route('/:id/barter-offers').get(_userOffers2.default.getUserBartersInMyOffers);

/**
 * @swagger
 * /users/{id}/auction-offers:
 *   get:
 *     tags:
 *       - User Offers
 *     summary: Get all User's Auctions which has Offered on !
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
 *       - name: "limit"
 *         in: "query"
 *         type: number
 *       - name: "finished"
 *         in: "query"
 *         type: boolean
 *         description: true - false
 *     responses:
 *       200:
 *         description: Get An Array of User's Auctions which has offered on
 *         example: 
 *               {
 *                   "links": {
 *                       "self": "http://localhost:3000/api/v1/users/5a2698c11287c23b1868278b/auction-offers?page=1&limit=20"
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
 *                       },
 *                       {
 *                           "title": "new Car",
 *                           "description": "Full HD , 3d support",
 *                           "startPrice": 10000,
 *                           "endDate": "2017-12-05T22:00:00.000Z",
 *                           "relatedUser": {
 *                               "fullName": "Magdyxy",
 *                               "email": "x2x@x2x.com",
 *                               "address": "82 Fatma",
 *                               "phone": "01157954393",
 *                               "country": "Egypt",
 *                               "id": "5a23d9a74bc62c0014489e3b"
 *                           },
 *                           "relatedCategory": {
 *                               "name": "تلفزيونات",
 *                               "id": "5a25841337560312b08bb05b"
 *                           },
 *                           "highestPrice": 1111111,
 *                           "creationDate": "2017-12-04T17:24:29.201Z",
 *                           "finished": false,
 *                           "imgs": [
 *                               "http://localhost:3000/uploads/auctions/5a2584cd37560312b08bb05c1512408269292.jpeg"
 *                           ],
 *                           "id": "5a2584cd37560312b08bb05c",
 *                           "inMyOffers": true,
 *                           "inMyFavourites": false
 *                       }
 *                   ],
 *                   "page": 1,
 *                   "pageCount": 1,
 *                   "limit": 20,
 *                   "totalCount": 3
 *               }
 */

router.route('/:id/auction-offers').get(_userOffers2.default.getUserAuctionsInMyOffers);

/**
 * @swagger
 * /users/{id}/winned-auctions:
 *   get:
 *     tags:
 *       - User Offers
 *     summary: Get all User's Auctions which has Offered on !
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
 *       - name: "limit"
 *         in: "query"
 *         type: number
 *     responses:
 *       200:
 *         description: Get An Array of User's Winned Auctions
 *         example: 
 *               {
 *                   "links": {
 *                       "self": "http://localhost:3000/api/v1/users/5a2698c11287c23b1868278b/winned-auctions?page=1&limit=1",
 *                       "next": "http://localhost:3000/api/v1/users/5a2698c11287c23b1868278b/winned-auctions?page=2&limit=1",
 *                       "last": "http://localhost:3000/api/v1/users/5a2698c11287c23b1868278b/winned-auctions?page=2&limit=1"
 *                   },
 *                   "data": [
 *                       {
 *                           "title": "rber",
 *                           "description": "rhrehE",
 *                           "startPrice": 65745274,
 *                           "relatedCategory": {
 *                               "name": "مجديات",
 *                               "id": "5a2443970b92ff001421a3b9"
 *                           },
 *                           "relatedUser": {
 *                               "email": "rrr@rrr.com",
 *                               "fullName": "MuhammaD",
 *                               "phone": "123456",
 *                               "country": "مصر",
 *                               "address": "دمنهور",
 *                               "img": "http://kayed-api.herokuapp.com/uploads/5a29772f175e2300149d15cb.jpeg",
 *                               "id": "5a29772f175e2300149d15cb"
 *                           },
 *                           "endDate": "2017-12-09T00:00:00.000Z",
 *                           "highestPrice": 65745278,
 *                           "auctionOffer": {
 *                               "bidder": "5a2698c11287c23b1868278b",
 *                               "price": 65745275,
 *                               "relatedAuction": "5a29c00537dc24001493d7a4",
 *                               "winned": false,
 *                               "id": "5a2aaf97c03eea2da8170f26"
 *                           },
 *                           "creationDate": "2017-12-07T22:26:13.957Z",
 *                           "finished": true,
 *                           "imgs": [
 *                               "http://kayed-api.herokuapp.com/uploads/auctions/5a29c00537dc24001493d7a41512685573962.jpeg"
 *                           ],
 *                           "id": "5a29c00537dc24001493d7a4",
 *                           "inMyOffers": true,
 *                           "inMyFavourites": false
 *                       }
 *                   ],
 *                   "page": 1,
 *                   "pageCount": 2,
 *                   "limit": 1,
 *                   "totalCount": 2
 *               }
 */

router.route('/:id/winned-auctions').get(_userOffers2.default.getUserWinnedAuctions);

exports.default = router;
//# sourceMappingURL=user-offers.route.js.map