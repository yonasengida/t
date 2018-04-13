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

router.post('/',businessController.noop);

router.get('/', businessController.noop);
router.param('id',businessController.noop);
// router.get('/:id', sectorController.fetchOne);
// router.delete('/:id', sectorController.deleteSector);
// router.put('/:id', sectorController.update);

// Expose User Router
module.exports = router;
