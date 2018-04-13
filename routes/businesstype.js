/**
 * Admin router.
 */

/**
 * Load Module Dependencies.
 */
var express   = require('express');
var debug     = require('debug')('api:product-router');
var businessTypeController = require('../controllers/businesstype');
var userController = require('../controllers/user');
var accessControl  = require('../controllers/auth').accessControl;

var router  = express.Router();

router.post('/',businessTypeController.createBussinessType);

router.get('/', businessTypeController.getAllBussinessType);
router.param('id',businessTypeController.validateBussinessType);
router.get('/:id', businessTypeController.getBussinessType);
router.get('/:id/business', businessTypeController.getSpecificBusiness);
router.delete('/:id', businessTypeController.deleteBussinessType);
router.put('/:id', businessTypeController.updateBussinessType);

// Expose User Router
module.exports = router;
