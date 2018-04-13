/**
 * User router.
 *
 * @summary
 *  user.create()
 *  user.update()
 *  user.delete()
 *  user.fetchOne()
 *  user.fetchAll()
 */

/**
 * Load Module Dependencies.
 */
var express   = require('express');
var debug     = require('debug')('api:user-router');


var authController = require('../controllers/auth');
var userController = require('../controllers/user');
var accessControl  = require('../controllers/auth').accessControl;

var router  = express.Router();
/**
 * @api {post} /users/signup Signup User
 * @apiVersion 1.0.0
 * @apiName Signup
 * @apiGroup User
 *
 * @apiDescription Signup  user
 *
 * @apiParam {String} username Username
 * @apiParam {String} password Password
 * @apiParam {String} user_type User Type Like client 
  * @apiParam {String} [fax] Fax  
 * @apiParam {String} [first_name] First Name
 * @apiParam {String} [middle_name] Middle Name
 * @apiParam {String} [last_name] Last Name
 * @apiParam {String} [mobile] Users Mobile
 * @apiParam {String} [facebook_link] Facebook Link
 * @apiParam {String} [twitter_link] Twiter Link
 * @apiParam {String} [linkedin_link] Linkedin Link
 * @apiParam {Date}   [date_of_birth] DOB
 * @apiParam {String} [city] City
 * @apiParam {String} [country] Country
 * @apiParam {String} [address] Adress
 * @apiParam {String} [gender] Gender
 * @apiParam {String} [about] Bio
 * @apiParam {String} [title] Title 
 * 
 * @apiParamExample Request Example:
 * {
 *  "username":"goldgy@gmail.com",
	"password":"123445555",
	"user_type":"client",
	"name":"GoldG"
	
 *  }
 * 
 * @apiSuccessExample Response Example for Client/Service Provide Signup:
 * 
{
    "_id": "5a4a3b802f9db05f75c33639",
    "username": "dm2@gmail.com",
    "role": "client",
    "realm": "client",
    "client": {
        "_id": "5a4a3b802f9db05f75c3363a",
        "created_at": "2018-01-01T13:45:36.014Z",
        "user": "5a4a3b802f9db05f75c33639",
        "updated_at": null,
        "archived_at": null,
        "archived": false,
        "follower": [],
        "following": [],
        "services": []
    },
    "archived_at": null,
    "archived": false,
    "status": "active"
}
* @apiSuccessExample Response Example for Client Signup:
{
    "_id": "5a4a3baa9dde105b763c3dbf",
    "username": "add@gmail.com",
    "role": "admin",
    "realm": "admin",
    "admin": {
        "_id": "5a4a3baa9dde105b763c3dc0",
        "created_at": "2018-01-01T13:46:18.784Z",
        "user": "5a4a3baa9dde105b763c3dbf",
        "updated_at": null,
        "archived_at": null,
        "archived": null
    },
    "archived_at": null,
    "archived": false,
    "status": "active"
}
*/
router.post('/signup', userController.createUser);
router.put('/preferences', userController.preference);

/**
 * @api {post} /users/login Login a user
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup User
 *
 * @apiDescription Log in a user. The request returns a token used to authentication
 * of the user on subsequent requests. The token is placed as an HTTP header ie
 * ```Authorization: Bearer <Token-here>``` otherwise requests are rejected.
 *
 * @apiParam {String} username Username
 * @apiParam {String} password Password
 *
 * @apiParamExample Request Example:
 *  {
 *    "username":"tasuser"
 *    "password": "pass@123"
 *  }
 *
 * @apiSuccess {String} token auth token
 * @apiSuccess {Object} user user info
 * @apiSuccess {Object} user user info
 *
 * @apiSuccessExample Response Example:
{
    "token": "I6KehNVejGDx",
    "user": {
        "_id": "5a28b6a7ff13b08b6f09acf4",
        "username": "masireclient@gmail.com",
        "role": "client",
        "realm": "client",
        "client": {
            "_id": "5a28b6a7ff13b08b6f09acf5",
            "created_at": "2017-12-07T03:33:59.333Z",
            "user": "5a28b6a7ff13b08b6f09acf4",
            "updated_at": null,
            "archived_at": null,
            "archived": false,
            "follower": [],
            "following": []
        },
        "last_login": "2017-12-07T03:34:31.889Z",
        "archived_at": null,
        "archived": false,
        "status": "active"
    }
}
 *
 */
router.post('/login', authController.login);

/**
 * @api {post} /users/logout Logout a user
 * @apiVersion 1.0.0
 * @apiName Logout
 * @apiGroup User
 *
 * @apiDescription Invalidate a users token
 *
 * @apiSuccess {Boolean} logged_out message
 *
 * @apiSuccessExample Response Example:
 *  {
 *    "logged_out" : true
 *  }
 *
 */
router.post('/logout', authController.logout);

/**
 * @api {get} /users Get users collection
 * @apiVersion 1.0.0
 * @apiName FetchAll
 * @apiGroup User
 *
 * @apiDescription Get a collection of users.
 *
 * @apiSuccess {String} _id user id
 *
 * @apiSuccessExample Response Example:
 *  [{
 *      "_id" : "556e1174a8952c9521286a60",
 *  }]
 */
router.get('/', userController.getUsers);
// router.get('/', accessControl(['admin']), userController.getUsers);


/**
 * @api {get} /users/paginate?page=<RESULTS_PAGE>&per_page=<RESULTS_PER_PAGE> Get paginated users collection 
 * @apiVersion 1.0.0
 * @apiName FetchPaginated
 * @apiGroup User
 *
 * @apiDescription Get a collection of users. The endpoint has pagination
 * out of the box. Use these params to query with pagination: `page=<RESULTS_PAGE`
 * and `per_page=<RESULTS_PER_PAGE>`.
 *
 * @apiSuccess {String} _id user id
 *
 * @apiSuccessExample Response Example:
 *  {
 *    "total_pages": 1,
 *    "total_docs_count": 0,
 *    "docs": [{
 *      "_id" : "556e1174a8952c9521286a60",
 *    }]
 *  }
 */
router.get('/paginate', accessControl(['admin']), userController.getByPagination);


/**
 * @api {get} /users/:id Get User
 * @apiVersion 1.0.0
 * @apiName Get
 * @apiGroup User
 *
 * @apiDescription Get a user with the given id
 *
 * @apiSuccess {String} _id user id
 *
 * @apiSuccessExample Response Example:
 *  {
 *    "_id" : "556e1174a8952c9521286a60"
 *  }
 */
router.param('id',userController.validateUser);
router.get('/:id', accessControl(['admin']), userController.getUser);

/**
 * @api {put} /users/:id Update User
 * @apiVersion 1.0.0
 * @apiName Update
 * @apiGroup User
 *
 * @apiDescription Update a user with the given id
 *
 * @apiSuccess {String} _id user id
 *
 * @apiSuccessExample Response Example:
 *  {
 *    "_id" : "556e1174a8952c9521286a60"
 *  }
 */
router.put('/:id', accessControl(['consumer', 'admin']), userController.updateUser);



/**
 * @api {delete} /users/:id Delete User
 * @apiVersion 1.0.0
 * @apiName Delete
 * @apiGroup User
 *
 * @apiDescription Delete a user with the given id
 *
 * @apiSuccess {String} _id user id
 *
 * @apiSuccessExample Response Example:
 *  {
 *    "_id" : "556e1174a8952c9521286a60"
 *  }
 *
 */
// router.delete('/:id', accessControl(['consumer', 'admin']), userController.delete);

/**
 * @api {delete} /users/:id/Archive Delete User
 * @apiVersion 1.0.0
 * @apiName Delete
 * @apiGroup User
 *
 * @apiDescription Archive a user with the given id
 *
 * @apiSuccess {String} _id user id
 *
 * @apiSuccessExample Response Example:
 *  {
 *    "_id" : "556e1174a8952c9521286a60"
 *  }
 *
 */
// router.post('/:id/archive', accessControl(['consumer', 'admin']), userController.archive);

/**
 * @api {put} /users/password/update Update user password
 * @apiVersion 1.0.0
 * @apiName UpdatePassword
 * @apiGroup User
 *
 * @apiDescription Update password of a given user.
 *
 * @apiParam {String} security_question_answer security question answer
 * @apiParam {String} phone_number phone number
 * @apiParam {String} new_password new password/pin
 *
 * @apiParamExample Request Example:
 * {
      "username":"2email1@gmail.com",
      "old_password":"pass@123",
      "new_password":"test@123"
 * }
 *
 * @apiSuccessExample Response Example:
 *  {
    "error": false,
    "message": "Sucessfully changed.",
    "status": 200
}
 */
router.put('/password/update', userController.passwordChange);

/**
 * @api {put} /users/password/forgot Reset Password
 * @apiVersion 1.0.0
 * @apiName ResetPassword
 * @apiGroup User
 *
 * @apiDescription Reset password of a given user.
 *
 * @apiParam {String} email User Email

 *
 * @apiParamExample Request Example:
 * {
      "email":"2email1@gmail.com",
    
 * }
 *
 * @apiSuccessExample Response Example:
     HTTP/1.1 200 OK
        {
            "error": false,
            "msg": "Suceesfully Reset, Please check your email "
            "status": 200
        }

 */
router.post('/password/forgot', userController.forgotPassword);


// Expose User Router
module.exports = router;
