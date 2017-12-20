"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _user = require("../controllers/user.controller");

var _user2 = _interopRequireDefault(_user);

var _userOffers = require("./user-offers.route");

var _userOffers2 = _interopRequireDefault(_userOffers);

var _userNotifications = require("./user-notifications.route");

var _userNotifications2 = _interopRequireDefault(_userNotifications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
* @swagger
* definitions:
*   FavBarter:
*     type: "object"
*     required:
*     - "barter"
*     properties:
*       user:
*         type: string
*         readOnly: true
*       barter:
*         type: string
*       creationDate:
*         type: string
*         format: date-time
*         readOnly: true
*/

/**
* @swagger
* definitions:
*   FavAuction:
*     type: "object"
*     required:
*     - "auction"
*     properties:
*       user:
*         type: string
*         readOnly: true
*       auction:
*         type: string
*       creationDate:
*         type: string
*         format: date-time
*         readOnly: true
*/

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get a specific user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string 
 *     responses:
 *       200:
 *         description: Return Updated User
 *         example:                  
 *              {
 *                       "fullName": "Magdy",
 *                       "email": "demo@demo.com",
 *                       "address": "82 Fatma El zhraa",
 *                       "phone": "01157954393",
 *                       "country": "Egypt",
 *                       "id": "5a1db2b8a3c9862828910bef"
 *              }
 *       404:
 *         description:  User Not Found
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - User
 *     summary: Update an existing user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: User Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'   
 *     responses:
 *       200:
 *         description: Return Updated User
 *         example:           
 *             {
 *               "user": {
 *                       "fullName": "Magdy",
 *                       "email": "demo@demo.com",
 *                       "address": "82 Fatma El zhraa",
 *                       "phone": "01157954393",
 *                       "country": "Egypt",
 *                       "id": "5a1db2b8a3c9862828910bef"
 *               },
 *               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YTFk..."
 *              }
 *       404:
 *         description:  User Not Found
 *       422:
 *         description: |
 *              - email is Required
 *              - email already exists
 *              ---------------------------
 *              - password is Required
 *              - phone is Required 
 *              - fullName is Required 
 *              - country is Required 
 */

router.route('/:id').put(_user2.default.updateUser).get(_user2.default.findById);

/**
 * @swagger
 * /users/{id}/barters:
 *   get:
 *     tags:
 *       - User
 *     summary: Get all barters of user
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
 *         description: Get An Array of User Barters
 *         example: 
 *               {
 *               "links": {
 *                       "self": "http://localhost:3000/api/v1/users/5a23d9a74bc62c0014489e3b/barters?page=1&limit=1",
 *                       "next": "http://localhost:3000/api/v1/users/5a23d9a74bc62c0014489e3b/barters?page=2&limit=1",
 *                       "last": "http://localhost:3000/api/v1/users/5a23d9a74bc62c0014489e3b/barters?page=5&limit=1"
 *               },
 *               "data": [
 *                       {
 *                       "title": "Samsung Note 8",
 *                       "description": "This is a description for new mobile phone of samsung",
 *                       "neededProduct": "Iphone x",
 *                       "relatedUser": {
 *                               "fullName": "Magdyxy",
 *                               "email": "x2x@x2x.com",
 *                               "address": "82 Fatma",
 *                               "phone": "01157954393",
 *                               "country": "Egypt",
 *                               "id": "5a23d9a74bc62c0014489e3b"
 *                       },
 *                       "relatedCategory": {
 *                               "name": "موبايلات",
 *                               "id": "5a24430e4311cd0014c1bfba"
 *                       },
 *                       "creationDate": "2017-12-06T21:02:28.264Z",
 *                       "finished": false,
 *                       "imgs": [
 *                               "http://localhost:3000/uploads/barters/5a285ae4b23b592ca4bf42030.jpeg"
 *                       ],
 *                       "type": "TEMP",
 *                       "id": "5a285ae4b23b592ca4bf4203",
 *                       "inMyOffers": true,
 *                       "inMyFavourites": false
 *                       }
 *               ],
 *               "page": 1,
 *               "pageCount": 5,
 *               "limit": 1,
 *               "totalCount": 5
 *               }
 *       404:
 *         description:  User Not Found
 */

router.route('/:id/barters').get(_user2.default.getUserBarters);

/**
 * @swagger
 * /users/{id}/auctions:
 *   get:
 *     tags:
 *       - User
 *     summary: Get all auctions of user
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
 *         description: Get An Array of User Auctions
 *         example: 
 *               {
 *               "links": {
 *                       "self": "http://localhost:3000/api/v1/users/5a23d9a74bc62c0014489e3b/auctions?page=1&limit=20"
 *               },
 *               "data": [
 *                       {
 *                       "title": "new Car",
 *                       "description": "Full HD , 3d support",
 *                       "startPrice": 10000,
 *                       "endDate": "2017-12-05T22:00:00.000Z",
 *                       "relatedUser": {
 *                               "fullName": "Magdyxy",
 *                               "email": "x2x@x2x.com",
 *                               "address": "82 Fatma",
 *                               "phone": "01157954393",
 *                               "country": "Egypt",
 *                               "id": "5a23d9a74bc62c0014489e3b"
 *                       },
 *                       "relatedCategory": {
 *                               "name": "تلفزيونات",
 *                               "id": "5a25841337560312b08bb05b"
 *                       },
 *                       "highestPrice": 12000,
 *                       "creationDate": "2017-12-04T17:24:29.201Z",
 *                       "finished": false,
 *                       "favUsers": [],
 *                       "imgs": [
 *                               "http://localhost:3000/uploads/auctions/5a2584cd37560312b08bb05c1512408269292.jpeg"
 *                       ],
 *                       "id": "5a2584cd37560312b08bb05c",
 *                       "inMyFavourites": false
 *                       }
 *               ],
 *               "page": 1,
 *               "pageCount": 1,
 *               "limit": 20,
 *               "totalCount": 1
 *               }
 *       404:
 *         description:  User Not Found
 */

router.route('/:id/auctions').get(_user2.default.getUserAuctions);

/**
 * @swagger
 * /users/{id}/favourites/barters:
 *   get:
 *     tags:
 *       - User
 *     summary: Get all favourite barters of user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User Id
 *         type: string
 *       - name: "page"
 *         in: "query"
 *         type: number
 *       - name: "limit"
 *         in: "query"
 *         type: number
 *     responses:
 *       200:
 *         description: Get An Array of User Favourite Barters
 *         example: 
 *               {
 *               "links": {
 *                       "self": "http://localhost:3000/api/v1/users/5a2698c11287c23b1868278b/favourites/barters?page=1&limit=20"
 *               },
 *               "data": [
 *                       {
 *                       "user": "5a2698c11287c23b1868278b",
 *                       "barter": {
 *                               "title": "بي",
 *                               "description": "  بي ي ر",
 *                               "neededProduct": "ررثقر",
 *                               "relatedCategory": {
 *                               "name": "سيارات",
 *                               "id": "5a2442fb4311cd0014c1bfb9"
 *                               },
 *                               "relatedUser": {
 *                               "email": "marmar@mar.com",
 *                               "fullName": "maradona",
 *                               "phone": "123455",
 *                               "country": "مصر",
 *                               "address": "بوسعيد",
 *                               "id": "5a23dfd04bc62c0014489e3c"
 *                               },
 *                               "creationDate": "2017-12-04T13:50:56.910Z",
 *                               "offerUsers": [],
 *                               "favUsers": [],
 *                               "finished": false,
 *                               "imgs": [
 *                               "http://kayed-api.herokuapp.com/uploads/barters/5a2552c020d3b60014b4fc4e0.jpeg"
 *                               ],
 *                               "type": "TEMP",
 *                               "id": "5a2552c020d3b60014b4fc4e"
 *                       },
 *                       "creationDate": "2017-12-05T19:11:33.471Z",
 *                       "id": "5a26ef65c862504b24f8c229"
 *                       }
 *               ],
 *               "page": 1,
 *               "pageCount": 1,
 *               "limit": 20,
 *               "totalCount": 1
 *               }
 *       404:
 *         description:  User Not Found
 */

/**
 * @swagger
 * /users/{id}/favourites/barters:
 *   put:
 *     tags:
 *       - User
 *     summary: Create User Favourite barter
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: FavBarter Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/FavBarter'   
 *     responses:
 *       200:
 *         description: Return Updated Favourite Barter
 *         example:
 *               {
 *               "user": "5a2698c11287c23b1868278b",
 *               "barter": "5a2552c020d3b60014b4fc4e",
 *               "creationDate": "2017-12-05T19:11:33.471Z",
 *               "id": "5a26ef65c862504b24f8c229"
 *               }
 *       404:
 *         description:  User Not Found
 *       422:
 *         description: barter is required
 */

router.route('/:id/favourites/barters').get(_user2.default.getUserFavoriteBarters).put(_user2.default.updateFavBarter);
/**
 * @swagger
 * /users/{id}/favourites/barters/{barterId}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete User Favourite barter
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: barterId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Successed. No Content
 *       404:
 *         description: User FavouriteBarter Not Found
*/
router.route('/:id/favourites/barters/:barterId').delete(_user2.default.deleteFavBarter);

/**
* @swagger
* /users/{id}/favourites/auctions:
*   get:
*     tags:
*       - User
*     summary: Get all favourite auctions of user
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: User Id
*         type: string
*       - name: "page"
*         in: "query"
*         type: number
*       - name: "limit"
*         in: "query"
*         type: number
*     responses:
*       200:
*         description: Get An Array of User Favourite Auctions
*         example:
*                {
*                "links": {
*                        "self": "http://localhost:3000/api/v1/users/5a2698c11287c23b1868278b/favourites/auctions?page=1&limit=20"
*                },
*                "data": [
*                        {
*                        "user": "5a2698c11287c23b1868278b",
*                        "auction": {
*                                "title": "new Car",
*                                "description": "Full HD , 3d support",
*                                "startPrice": 10000,
*                                "endDate": "2017-12-05T22:00:00.000Z",
*                                "relatedUser": {
*                                "fullName": "Magdyxy",
*                                "email": "x2x@x2x.com",
*                                "address": "82 Fatma",
*                                "phone": "01157954393",
*                                "country": "Egypt",
*                                "id": "5a23d9a74bc62c0014489e3b"
*                                },
*                                "relatedCategory": {
*                                "name": "تلفزيونات",
*                                "id": "5a25841337560312b08bb05b"
*                                },
*                                "highestPrice": 12000,
*                                "creationDate": "2017-12-04T17:24:29.201Z",
*                                "finished": false,
*                                "imgs": [
*                                "http://localhost:3000/uploads/auctions/5a2584cd37560312b08bb05c1512408269292.jpeg"
*                                ],
*                                "id": "5a2584cd37560312b08bb05c"
*                        },
*                        "creationDate": "2017-12-05T19:09:54.712Z",
*                        "id": "5a26ef02c862504b24f8c228"
*                        }
*                ],
*                "page": 1,
*                "pageCount": 1,
*                "limit": 20,
*                "totalCount": 1
*                }
*       404:
*         description:  User Not Found
*/

/**
 * @swagger
 * /users/{id}/favourites/auctions:
 *   put:
 *     tags:
 *       - User
 *     summary: Create User Favourite Auction
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: FavBarter Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/FavAuction'   
 *     responses:
 *       200:
 *         description: Return Updated Favourite Auction
 *         example:
 *               {
 *               "user": "5a2698c11287c23b1868278b",
 *               "auction": "5a2584cd37560312b08bb05c",
 *               "creationDate": "2017-12-05T19:09:54.712Z",
 *               "id": "5a26ef02c862504b24f8c228"
 *               }
 *       404:
 *         description:  User Not Found
 *       422:
 *         description: auction is required
 */

router.route('/:id/favourites/auctions').get(_user2.default.getUserFavoriteAuctions).put(_user2.default.updateFavAuction);

/**
 * @swagger
 * /users/{id}/favourites/auctions/{auctionId}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete User Favourite Auction
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: auctionId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Successed. No Content
 *       404:
 *         description: User FavouriteAuction Not Found
*/
router.route('/:id/favourites/auctions/:auctionId').delete(_user2.default.deleteFavAuction);

router.use(_userNotifications2.default);
router.use(_userOffers2.default);

exports.default = router;
//# sourceMappingURL=user.route.js.map