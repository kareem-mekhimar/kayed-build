"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _barter = require("../controllers/barter.controller");

var _barter2 = _interopRequireDefault(_barter);

var _barterOffer = require("./barter-offer.route");

var _barterOffer2 = _interopRequireDefault(_barterOffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
* @swagger
* definitions:
*   Barter:
*     type: "object"
*     required:
*     - "title"
*     - "description"
*     - "neededProduct"
*     - "relatedUser"
*     - "relatedCategory"
*     properties:
*       id:
*         type: string
*         readOnly: true
*       title:
*         type: string
*       description:
*         type: string
*       neededProduct:
*         type: string
*       relatedUser:
*         type: string
*       relatedCategory:
*         type: string
*       type:
*         type: string
*         enum:
*         - "TEMP"
*         - "PERM"
*       imgs:
*         type: array
*         items:
*           type: string
*           format: "base64"
*       finished:
*         type: boolean
*         default: false
*         readOnly: true
*       barterOffer:
*         type: string
*         readOnly: true
*       creationDate:
*         type: string
*         format: date-time
*         readOnly: true
*     
*/

/**
 * @swagger
 * /barters:
 *   get:
 *     tags:
 *       - Barters
 *     summary: Get all barters
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "page"
 *         in: "query"
 *         type: number
 *         default: 1
 *       - name: "limit"
 *         in: "query"
 *         type: number
 *         default: 20
 *       - name: "categories"
 *         in: "query"
 *         type: string
 *         description: "EX: id1,id2,id3"
 *       - name: "type"
 *         in: "query"
 *         type: string
 *         description: TEMP - PERM
 *       - name: "finished"
 *         in: "query"
 *         type: boolean
 *         description: true - false
 *     responses:
 *       200:
 *         description: Get An Array of Barters
 *         example: 
 *               {
 *                   "links": {
 *                       "self": "http://localhost:3000/api/v1/barters?page=1&limit=2",
 *                       "next": "http://localhost:3000/api/v1/barters?page=2&limit=2",
 *                       "last": "http://localhost:3000/api/v1/barters?page=5&limit=2"
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
 *                               "phone": "123456",
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
 *                           "title": "Samsung Note 8",
 *                           "description": "This is a description for new mobile phone of samsung",
 *                           "neededProduct": "Iphone x",
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
 *                           "creationDate": "2017-12-06T21:02:28.264Z",
 *                           "finished": false,
 *                           "imgs": [
 *                               "http://localhost:3000/uploads/barters/5a285ae4b23b592ca4bf42030.jpeg"
 *                           ],
 *                           "type": "TEMP",
 *                           "id": "5a285ae4b23b592ca4bf4203",
 *                           "inMyOffers": true,
 *                           "inMyFavourites": false
 *                       }
 *                   ],
 *                   "page": 1,
 *                   "pageCount": 5,
 *                   "limit": 2,
 *                   "totalCount": 10
 *               }
 */

/**
 * @swagger
 * /barters:
 *   post:
 *     tags:
 *       - Barters
 *     summary: Add a new barter
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Barter Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Barter'   
 *     responses:
 *       201:
 *         description: Return Created Barter
 *         example:           
 *               {
 *                   "title": "Samsung Note 8",
 *                   "description": "This is a description for new mobile phone of samsung",
 *                   "neededProduct": "Iphone x",
 *                   "relatedUser": {
 *                       "fullName": "magdy",
 *                       "email": "demo@demo.com",
 *                       "address": "82Fatma El zhraa",
 *                       "phone": "01157954393",
 *                       "country": "egypt",
 *                       "id": "5a1db2b8a3c9862828910bef"
 *                   },
 *                   "relatedCategory": {
 *                       "name": "mobiles",
 *                       "id": "5a1db3a29246d21c0c4056cf"
 *                   },
 *                   "creationDate": "2017-12-03T12:15:05.679Z",
 *                   "finished": false,
 *                   "imgs": [],
 *                   "type": "TEMP",
 *                   "id": "5a23eac99c10230a8c3e6cc5"
 *               }
 *       422:
 *         description: |
 *              - titles is Required
 *              - description is Required
 *              - neededProduct is Required
 *              ----------------------------
 *              - relatedUser is Required 
 *              - User doesn't exist
 *              ----------------------------
 *              - relatedCategory is Required 
 *              - Category doesn't exist
 *              ----------------------------
 *              - Optional type: type of barter should be 'TEMP' OR 'PERM'
 *              - Optional finished: finished should be true or false
 *              - Optional imgs : Imgs should be an array of strings 'images 64base
 */

router.route('/').get(_barter2.default.findAll).post(_barter2.default.createBarter);

/**
 * @swagger
 * /barters/{id}:
 *   get:
 *     tags:
 *       - Barters
 *     summary: Get a sepcific barter
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Get a barter
 *         example: 
 *               {
 *                   "title": "Samsung Note 8",
 *                   "description": "This is a description for new mobile phone of samsung",
 *                   "neededProduct": "Iphone x",
 *                   "relatedUser": {
 *                       "fullName": "Magdyxy",
 *                       "email": "x2x@x2x.com",
 *                       "address": "82 Fatma",
 *                       "phone": "01157954393",
 *                       "country": "Egypt",
 *                       "id": "5a23d9a74bc62c0014489e3b"
 *                   },
 *                   "relatedCategory": {
 *                       "name": "موبايلات",
 *                       "id": "5a24430e4311cd0014c1bfba"
 *                   },
 *                   "creationDate": "2017-12-06T21:02:28.264Z",
 *                   "finished": false,
 *                   "imgs": [
 *                       "http://localhost:3000/uploads/barters/5a285ae4b23b592ca4bf42030.jpeg"
 *                   ],
 *                   "type": "TEMP",
 *                   "id": "5a285ae4b23b592ca4bf4203",
 *                   "inMyOffers": false,
 *                   "inMyFavourites": true
 *               }
 *       404:
 *         description:  Barter Not Found
*/

/**
 * @swagger
 * /barters/{id}:
 *   put:
 *     tags:
 *       - Barters
 *     summary: Update an existing barter
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: Barter Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Barter'   
 *     responses:
 *       201:
 *         description: Return Updated Barter
 *         example:           
 *               {
 *                   "title": "Samsung A",
 *                   "description": "assasasaasasas",
 *                   "neededProduct": "AAAAK",
 *                   "relatedUser": {
 *                       "fullName": "Magdyxy",
 *                       "email": "x2x@x2x.com",
 *                       "address": "82 Fatma",
 *                       "phone": "01157954393",
 *                       "country": "Egypt",
 *                       "id": "5a23d9a74bc62c0014489e3b"
 *                   },
 *                   "relatedCategory": {
 *                       "name": "موبايلات",
 *                       "id": "5a24430e4311cd0014c1bfba"
 *                   },
 *                   "barterOffer": {
 *                       "relatedUser": "5a1db2b8a3c9862828910bef",
 *                       "description": "Samsung Note A",
 *                       "offeredProduct": "LG TV 2017",
 *                       "relatedBarter": "5a249e4148d6362638faeb9d",
 *                       "status": "DONE",
 *                       "imgs": [
 *                           "http://localhost:3000/uploads/barter-offers/5a2532c7cb4ed22fc0831e610.jpeg"
 *                       ],
 *                       "creationDate": "2017-12-04T11:34:31.576Z",
 *                       "id": "5a2532c7cb4ed22fc0831e61"
 *                   },
 *                   "creationDate": "2017-12-04T01:00:49.846Z",
 *                   "finished": true,
 *                   "imgs": [
 *                       "http://localhost:3000/uploads/barters/5a249e4148d6362638faeb9d0.jpeg"
 *                   ],
 *                   "type": "TEMP",
 *                   "id": "5a249e4148d6362638faeb9d",
 *                   "inMyOffers": true,
 *                   "inMyFavourites": false
 *               }
 *       404:
 *         description:  Barter Not Found
 *       422:
 *         description: |
 *              - titles is Required
 *              - description is Required
 *              - neededProduct is Required
 *              ----------------------------
 *              - relatedUser is Required 
 *              - User doesn't exist
 *              ----------------------------
 *              - relatedCategory is Required 
 *              - Category doesn't exist
 *              ----------------------------
 *              - Optional type: type of barter should be 'TEMP' OR 'PERM'
 *              - Optional finished: finished should be true or false
 *              - Optional imgs : Imgs should be an array of strings 'images 64base
 */

/**
 * @swagger
 * /barters/{id}:
 *   delete:
 *     tags:
 *       - Barters
 *     summary: Delete a barter
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Successed. No Content
 *       404:
 *         description: Barter Not Found
*/
router.route('/:id').get(_barter2.default.findById).put(_barter2.default.updateBarter).delete(_barter2.default.deleteBarter);

router.use(_barterOffer2.default);

exports.default = router;
//# sourceMappingURL=barter.route.js.map