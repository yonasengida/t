/**
 * Admin router.
 */

/**
 * Load Module Dependencies.
 */
var express   = require('express');
var debug     = require('debug')('api:product-router');
var surveyController = require('../controllers/survey');
var userController = require('../controllers/user');
var accessControl  = require('../controllers/auth').accessControl;

var router  = express.Router();

router.post('/',surveyController.createSurvey);

router.get('/', surveyController.getAllSurvey);
router.param('id',surveyController.validateBussinessType);
router.get('/:id', surveyController.getSurvey);
router.delete('/:id', surveyController.deleteSurvey);
router.put('/:id', surveyController.updateSurvey);

// Expose User Router
module.exports = router;
