/**
 * Admin router.
 */

/**
 * Load Module Dependencies.
 */
var express   = require('express');
var debug     = require('debug')('api:product-router');
var servicesController = require('../controllers/service');
var userController = require('../controllers/user');
var accessControl  = require('../controllers/auth').accessControl;

var router  = express.Router();
/**
 * @api {post} /services Create Services
 * @apiName CreateService
 * @apiGroup Service
 *
 * @apiDescription Create Service
 * 
 * @apiParamExample Request Example:
 *   {
		"name":"Fee Service"
     }
* @apiSuccessExample Response Example:
{
    "_id": "5a9523c9a8461544472dbc56",
    "name": "Fee Service",
    "created_at": "2018-02-27T09:24:25.731Z",
    "updated_at": null,
    "archived_at": null,
    "archived": false
}
*/
router.post('/', servicesController.createService);
/**
 * @api {get} /services Get Services
 * @apiName GetServices
 * @apiGroup Service
 *
 * @apiDescription Get Services
 * 
 *  * @apiSuccessExample Response Example:
 [
    {
        "_id": "5a952394a8461544472dbc55",
        "name": "Sales Service",
        "created_at": "2018-02-27T09:23:32.064Z",
        "updated_at": null,
        "archived_at": null,
        "archived": false
    },
    {
        "_id": "5a9523c9a8461544472dbc56",
        "name": "Fee Service",
        "created_at": "2018-02-27T09:24:25.731Z",
        "updated_at": null,
        "archived_at": null,
        "archived": false
    }
]

*/
router.get('/', servicesController.getServices);
router.param('id',servicesController.validateService);
router.get('/:id', servicesController.getService);
router.delete('/:id', servicesController.deleteService);
router.put('/:id', servicesController.updateService);

// Expose User Router
module.exports = router;
