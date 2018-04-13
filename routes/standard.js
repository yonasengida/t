/**
 * Admin router.
 */

/**
 * Load Module Dependencies.
 */
var express   = require('express');
var debug     = require('debug')('api:product-router');
var standardController = require('../controllers/standard');
var userController = require('../controllers/user');
var accessControl  = require('../controllers/auth').accessControl;

var router  = express.Router();

router.post('/',standardController.createStandard);

router.get('/', standardController.getAllStandard);
router.param('id',standardController.validateBussinessType);
router.get('/:id', standardController.getStandard);
router.delete('/:id', standardController.deleteStandard);
router.put('/:id', standardController.updateStandard);

// Expose User Router
module.exports = router;
