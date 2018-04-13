/**
 * Admin router.
 */

/**
 * Load Module Dependencies.
 */
var express   = require('express');
var debug     = require('debug')('api:product-router');
var sectorController = require('../controllers/sector');
var userController = require('../controllers/user');
var accessControl  = require('../controllers/auth').accessControl;

var router  = express.Router();
/**
 * @api {post} /sectors Create Sectors
 * @apiName CreateSector
 * @apiGroup Sector
 *
 * @apiDescription Create Sector
 * 
 * @apiParamExample Request Example:
 *   {
		"name":"Sector"
     }
* @apiSuccessExample Response Example:
{
    "_id": "5a9523c9a8461544472dbc56",
    "name": "Sector",
    "created_at": "2018-02-27T09:24:25.731Z",
    "updated_at": null,
    "archived_at": null,
    "archived": false
}
*/
router.post('/',sectorController.create);
/**
 * @api {get} /sectors Get Sectors
 * @apiName GetSectors
 * @apiGroup Sector
 *
 * @apiDescription Get Sectors
 * 
 *  * @apiSuccessExample Response Example:
 [
    {
        "_id": "5a9533dea5084a312a7fa620",
        "name": "Sector1",
        "created_at": "2018-02-27T10:33:02.374Z",
        "created_by": "5a8c98edfa995ced29338a50",
        "updated_at": null,
        "archived_at": null,
        "archived": false
    },
    {
        "_id": "5a9533dea5084a312a7fa620",
        "name": "Sector2",
        "created_at": "2018-02-27T10:33:02.374Z",
        "created_by": "5a8c98edfa995ced29338a50",
        "updated_at": null,
        "archived_at": null,
        "archived": false
    }
]

*/
router.get('/', sectorController.fetchAll);
router.param('id',sectorController.validateSector);
router.get('/:id', sectorController.fetchOne);
router.delete('/:id', sectorController.deleteSector);
router.put('/:id', sectorController.update);

// Expose User Router
module.exports = router;
