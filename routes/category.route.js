"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _category = require("../controllers/category.controller");

var _category2 = _interopRequireDefault(_category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/**
* @swagger
* definitions:
*   Category:
*     required:
*     - "name"
*     properties:
*       id:
*         type: string
*         readOnly: true
*       name:
*         type: string
*/

/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get all categories
 *     produces:
 *       - application/json

 *     responses:
 *       200:
 *         description: Get An Array of Categories
 *         example: 
 *               [
 *                   {
 *                       "name": "cars",
 *                       "id": "5a1d59d25be03c12907a6771"
 *                   },
 *                   {
 *                       "name": "mobiles",
 *                       "id": "5a1db3a29246d21c0c4056cf"
 *                   },
 *                   {
 *                       "name": "planes",
 *                       "id": "5a1db488834c400708f70689"
 *                   }
 *               ]
 *       404:
 *         description: No Categories Found
*/

/**
 * @swagger
 * /categories:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Add a new category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Category Object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Category'   
 *     responses:
 *       201:
 *         description: Return Created Category
 *         example:           
 *                {
 *                 "name": "test category2",
 *                 "id": "5a1dbdddc1e5142cb8cb78f6"
 *                }
 *       400:
 *         description: Bad Request , Check your inputs
*/
router.route('/').get(_category2.default.findAll).post(_category2.default.createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     tags:
 *       - Categories
 *     summary: Update an existing category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Category"
 *     responses:
 *       200:
 *         example:
 *               {
 *                   "name": "planes",
 *                   "id": "5a1db488834c400708f70689"
 *               }
 *         description: Return Updated Category
 *       404:
 *         description: Category Not Found
*/

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Delete a category
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
 *         description: Category Not Found
*/
router.route('/:id').put(_category2.default.updateCategory).delete(_category2.default.deleteCategory);

exports.default = router;
//# sourceMappingURL=category.route.js.map