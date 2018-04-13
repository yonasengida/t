/**
 * Admin router.
 */

/**
 * Load Module Dependencies.
 */
var express   = require('express');
var debug     = require('debug')('api:product-router');
var businessController = require('../controllers/business');
var userController = require('../controllers/user');
var accessControl  = require('../controllers/auth').accessControl;

var router  = express.Router();

router.post('/',businessController.createBussiness);

router.get('/', businessController.getAllBussiness);
router.param('id',businessController.validateBussinessType);
router.get('/:id', businessController.getBussiness);
router.get('/:id/standards', businessController.getStandards);
router.delete('/:id', businessController.deleteBussiness);
router.put('/:id', businessController.updateBussiness);

// Expose User Router
module.exports = router;
