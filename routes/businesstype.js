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

router.post('/',businessTypeController.noop);

router.get('/', businessTypeController.noop);
router.param('id',businessTypeController.noop);
// router.get('/:id', sectorController.fetchOne);
// router.delete('/:id', sectorController.deleteSector);
// router.put('/:id', sectorController.update);

// Expose User Router
module.exports = router;
