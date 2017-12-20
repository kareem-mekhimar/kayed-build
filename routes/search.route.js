"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _search = require("../controllers/search.controller");

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
 * @swagger
 * /search:
 *   get:
 *     tags:
 *       - Search
 *     summary: Search For Auction Or Barter
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "q"
 *         in: "query"
 *         type: string
 *         description: Search Word
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
 *         description: |
 *                      Get An Array of Barters & Auction
 *                      tested on : api/v1/search?q=MAZDA
 *         example:
 *               {
 *                   "barters": [
 *                       {
 *                           "title": "MAZDA New Car 2018",
 *                           "description": "This is a description for new car ",
 *                           "neededProduct": "BMW",
 *                           "relatedUser": {
 *                               "fullName": "Demo",
 *                               "email": "demo@demo.com",
 *                               "address": "82 Fatma El Zhraa",
 *                               "phone": "01157954393",
 *                               "country": "Egypt",
 *                               "img": "http://localhost:3000/uploads/users/5a2e6f1c45797127909b5045.jpeg",
 *                               "id": "5a2e6f1c45797127909b5045"
 *                           },
 *                           "relatedCategory": {
 *                               "name": "سيارات",
 *                               "id": "5a2bbf7416774c00142d6e42"
 *                           },
 *                           "creationDate": "2017-12-11T14:08:29.712Z",
 *                           "finished": false,
 *                           "imgs": [
 *                               "http://localhost:3000/uploads/barters/5a2e915dfbbe8030104c3e580.jpeg"
 *                           ],
 *                           "type": "TEMP",
 *                           "id": "5a2e915dfbbe8030104c3e58",
 *                           "inMyOffers": false,
 *                           "inMyFavourites": false
 *                       }
 *                   ],
 *                   "auctions": [
 *                       {
 *                           "title": "NEW MAZDA 2",
 *                           "description": "This A new Modern car 2018",
 *                           "startPrice": 120000,
 *                           "endDate": "2017-12-12T00:00:00.000Z",
 *                           "relatedUser": {
 *                               "fullName": "Demo",
 *                               "email": "demo@demo.com",
 *                               "address": "82 Fatma El Zhraa",
 *                               "phone": "01157954393",
 *                               "country": "Egypt",
 *                               "img": "http://localhost:3000/uploads/users/5a2e6f1c45797127909b5045.jpeg",
 *                               "id": "5a2e6f1c45797127909b5045"
 *                           },
 *                           "relatedCategory": {
 *                               "name": "سيارات",
 *                               "id": "5a2bbf7416774c00142d6e42"
 *                           },
 *                           "highestPrice": 120000,
 *                           "creationDate": "2017-12-11T12:15:38.752Z",
 *                           "finished": false,
 *                           "imgs": [
 *                               "http://localhost:3000/uploads/auctions/5a2e76ea1b662c1cf883ab061512994538870.jpeg"
 *                           ],
 *                           "id": "5a2e76ea1b662c1cf883ab06",
 *                           "inMyOffers": false,
 *                           "inMyFavourites": false
 *                       },
 *                       {
 *                           "title": "NEW MAZDA",
 *                           "description": "This A new Modern car 2018",
 *                           "startPrice": 120000,
 *                           "endDate": "2017-12-12T00:00:00.000Z",
 *                           "relatedUser": {
 *                               "fullName": "Demo",
 *                               "email": "demo@demo.com",
 *                               "address": "82 Fatma El Zhraa",
 *                               "phone": "01157954393",
 *                               "country": "Egypt",
 *                               "img": "http://localhost:3000/uploads/users/5a2e6f1c45797127909b5045.jpeg",
 *                               "id": "5a2e6f1c45797127909b5045"
 *                           },
 *                           "relatedCategory": {
 *                               "name": "سيارات",
 *                               "id": "5a2bbf7416774c00142d6e42"
 *                           },
 *                           "highestPrice": 120000,
 *                           "creationDate": "2017-12-11T12:07:15.869Z",
 *                           "finished": false,
 *                           "imgs": [
 *                               "http://localhost:3000/uploads/auctions/5a2e74f345797127909b50491512994035963.jpeg"
 *                           ],
 *                           "id": "5a2e74f345797127909b5049",
 *                           "inMyOffers": false,
 *                           "inMyFavourites": false
 *                       }
 *                   ],
 *                   "links": {
 *                       "self": "http://localhost:3000/api/v1/search?page=1&limit=20"
 *                   },
 *                   "page": 1,
 *                   "pageCount": 1,
 *                   "limit": 20,
 *                   "totalCount": 3
 *               }
 */

router.route('/').get(_search2.default.search);
exports.default = router;
//# sourceMappingURL=search.route.js.map