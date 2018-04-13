/**
 * Client router.
 */

/**
 * Load Module Dependencies.
 */
var express   = require('express');
var debug     = require('debug')('api:admin-router');
var clientController = require('../controllers/client');
var accessControl  = require('../controllers/auth').accessControl;

var router  = express.Router();
/**
 * @api {get} /clients Get Clients
 * @apiVersion 1.0.0
 * @apiName GetClients
 * @apiGroup Client
 *
 * @apiDescription Get Clients

*/
router.get('/',accessControl(['admin','client','organization']), clientController.getClients);
router.get('/search',accessControl(['client','organization']), clientController.searchClient);
/**
 * @api {post} /clients/search/service Search Service & Products
 * @apiName SearchProductandServce
 * @apiGroup Client
 *
 * @apiDescription Search Service & Products 
 * @apiParamExample Request Example:
    {
        "service":"5a277463a7e793d35baedaf5",	

                "parameters":[
                    {
                        "param":"5a3b9a54661d44783e8492c5",
                        "value":["1","2"]
                    },
                    {
                        "param":"5a3b9a54661d44783e8492c5",
                        "value":["1","2"]
                    },
                    {
                        "param":"5a3b9a54661d44783e8492c5",
                        "value":["1","2"]
                    }
                ]	
    }
*/
// router.get('/search/service',accessControl(['client','organization']), clientController.searchClientsServiceandProduct);
router.post('/search/service',accessControl(['client','organization']), clientController.searchClientsService);
/**
 * @api {put} /clients/language Change Language
 * @apiVersion 1.0.0
 * @apiName ChangeLanaguage
 * @apiGroup Client
 *
 * @apiDescription Change Language
 *
 * @apiParamExample Request Example:
 *  {
 * 
 *  
 *  }
*/

router.put('/language',accessControl(['client','organization']), clientController.changeLanguage);
/**
 * @api {put} /clients/profilePic Uplaod Profile Picture
 * @apiVersion 1.0.0
 * @apiName UploadProfilePicture
 * @apiGroup Client
 *
 * @apiDescription Upload Profile Picture
 *
 * @apiParam {File} file Client Image
* @apiSuccessExample Response Example:
     HTTP/1.1 200 OK
 {
    "error": false,
    "upload": "Success",
    "status": 200
}
 * 

*/
router.put('/profilePic',accessControl(['*']), clientController.uploadProfile);
/**
 * @api {put} /clients/profile Manage Profile
 * 
 * @apiName ManageProfile
 * @apiGroup Client
 *
 * @apiDescription Manage Profile
 *
 * @apiParam {String} service Service
 * @apiParam {String} parameter Parameter
 * @apiParam {Array} value Value
 * 
 * @apiParamExample Request Example:
 * {
	"service":"5a277463a7e793d35baedaf5",
	"parameter":"5a3b9a54661d44783e8492c5",
	"value":["263"]

}
* @apiSuccessExample Response Example:
     HTTP/1.1 200 OK
{
    "_id": "5a4a4e0971c3ee583f6c066d",
    "service": "5a277463a7e793d35baedaf5",
    "parameter": "5a3b9a54661d44783e8492c5",
    "value": ["263"],
    "client": "5a4a4c2faa6ac17932810a3a",
    "updated_at": null,
    "archived_at": null,
    "archived": false
}
*/
router.put('/profile',accessControl(['client']), clientController.manageProfile);
/**
 * @api {put} /clients/profile Get Profile
 * 
 * @apiName GetProfile
 * @apiGroup Client
 *
 * @apiDescription Get Profile
 *
*/
router.get('/profile',accessControl(['client','*']), clientController.getProfiles);
router.get('/profile/services',accessControl(['client','*']), clientController.getServcies);
router.get('/profile/services/:servid/parameters',accessControl(['client','*']), clientController.getParameters);
router.param('id', clientController.validateClient);
router.get('/:id',accessControl(['client','organization']), clientController.getClient);
/**
 * @api {put} /clients/:id Update Client Profile
 * @apiVersion 1.0.0
 * @apiName UpdateClient
 * @apiGroup Client
 *
 * @apiDescription Update Client Profile
 *
 * @apiParam {String} id client ID
 * @apiParam {Object} data Data to Update
 * @apiParamExample Request Example:
 *  {
 * 
 *  
 *  }
*/
router.put('/:id',accessControl(['client','organization','*']), clientController.updateClient);
/**
 * @api {put} /clients/:id/follow Follow Client
 * @apiVersion 1.0.0
 * @apiName FollowClient
 * @apiGroup Client
 *
 * @apiDescription Follow Client
 *
 * @apiParamExample Request Example:
 *  {
 * 
 *  
 *  }
*/
router.put('/:id/follow',accessControl(['client','organization']), clientController.follow);

/**
 * @api {delete} /clients/:id/unfollow UnFollow Client
 * @apiVersion 1.0.0
 * @apiName UnFollowClient
 * @apiGroup Client
 *
 * @apiDescription UnFollow Client
 *
 * @apiParamExample Request Example:
 *  {
 * 
 *  
 *  }
*/
router.delete('/:id/unfollow',accessControl(['client','organization']), clientController.unfollow);
router.delete('/:id',accessControl(['admin']), clientController.deleteClient);


// Expose User Router
module.exports = router;
