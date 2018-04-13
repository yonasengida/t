/**
 * Admin router.
 */

/**
 * Load Module Dependencies.
 */
var express   = require('express');
var debug     = require('debug')('api:admin-router');
var adminController = require('../controllers/admin');
var userController = require('../controllers/user');
var accessControl  = require('../controllers/auth').accessControl;

var router  = express.Router();
/**
 * @api {get} /admins Get Admins Profile
 * @apiVersion 1.0.0
 * @apiName GetAdmins
 * @apiGroup Admin
 *
 * @apiDescription Get Admins Profile

*/
router.get('/', adminController.getAdmins);
router.param('id', adminController.validateAdmin);
router.get('/:id', adminController.getAdmin);
/**
 * @api {put} /admins/:id Update Admin Profile
 * @apiVersion 1.0.0
 * @apiName UpdateAdmin
 * @apiGroup Admin
 *
 * @apiDescription Update Admin Profile
 *
 *  @apiParam {String} id Admin ID
 * @apiParam {Object} username Username
 * @apiParamExample Request Example:
 *  {
 * 
 *  
 *  }
*/
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);



// Expose User Router
module.exports = router;
