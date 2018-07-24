/**
 * Admin router.
 */

/**
 * Load Module Dependencies.
 */
var express   = require('express');
var debug     = require('debug')('api:product-router');
var categoryController = require('../controllers/category');
var userController = require('../controllers/user');
var accessControl  = require('../controllers/auth').accessControl;

var router  = express.Router();
/**
 * @api {post} /types Create types
 * @apiName Createtype
 * @apiGroup type
 *
 * @apiDescription Create type
 * 
 * @apiParamExample Request Example:
 *   {
		"name":"type"
     }
* @apiSuccessExample Response Example:
{
    "_id": "5a9523c9a8461544472dbc56",
    "name": "type",
    "created_at": "2018-02-27T09:24:25.731Z",
    "updated_at": null,
    "archived_at": null,
    "archived": false
}
*/
router.post('/',categoryController.create);
/**
 * @api {get} /types Get types
 * @apiName Gettypes
 * @apiGroup type
 *
 * @apiDescription Get types
 * 
 *  * @apiSuccessExample Response Example:
 [
    {
        "_id": "5a9533dea5084a312a7fa620",
        "name": "type1",
        "created_at": "2018-02-27T10:33:02.374Z",
        "created_by": "5a8c98edfa995ced29338a50",
        "updated_at": null,
        "archived_at": null,
        "archived": false
    },
    {
        "_id": "5a9533dea5084a312a7fa620",
        "name": "type2",
        "created_at": "2018-02-27T10:33:02.374Z",
        "created_by": "5a8c98edfa995ced29338a50",
        "updated_at": null,
        "archived_at": null,
        "archived": false
    }
]

*/
router.get('/', categoryController.fetchAll);
router.param('id',categoryController.validateCategory);
router.get('/:id', categoryController.fetchOne);
// router.delete('/:id', categoryController.);
router.put('/:id', categoryController.update);

// Expose User Router
module.exports = router;
