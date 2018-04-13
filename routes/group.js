/**
 * Admin router.
 */

/**
 * Load Module Dependencies.
 */
var express   = require('express');
var debug     = require('debug')('api:product-router');
var groupController = require('../controllers/group');
var userController = require('../controllers/user');
var accessControl  = require('../controllers/auth').accessControl;

var router  = express.Router();
/**
 * @api {post} /groups Create Group
 * @apiName CreateGroup
 * @apiGroup Group
 *
 * @apiDescription Create Group
 * 
 * @apiParamExample Request Example:
 *   {
	"name":"Automobiles",
	"parameters":[{
		"param_name":"color",
		"options":[{
			"opt_name":"green"
		
		},
		{
			"opt_name":"blue"
		
		},
		{
			"opt_name":"black"
		
		}]
	},
	{
		"param_name":"year",
		"options":[{
			"opt_name":"1990"
		
		},
		{
			"opt_name":"1999"
		
		},
		{
			"opt_name":"1997"
		
		},
		{
			"opt_name":"2018"
		
		}
		]
	},
	{
		"param_name":"Brand",
		"options":[{
			"opt_name":"toyota"
		
		},
		{
			"opt_name":"Nissan"
		
		}]
	}
	]
}
* @apiSuccessExample Response Example:
{
    "_id": "5a8c98fefa995ced29338a53",
    "name": "Automobiles",
    "updated_at": null,
    "created_at": "2018-02-20T21:48:04.319Z",
    "archived_at": null,
    "archived": false,
    "parameters": [
        {
            "param_name": "color",
            "_id": "5a8c98fefa995ced29338a5c",
            "options": [
                {
                    "opt_name": "green",
                    "_id": "5a8c98fefa995ced29338a5f"
                },
                {
                    "opt_name": "blue",
                    "_id": "5a8c98fefa995ced29338a5e"
                },
                {
                    "opt_name": "black",
                    "_id": "5a8c98fefa995ced29338a5d"
                }
            ]
        },
        {
            "param_name": "year",
            "_id": "5a8c98fefa995ced29338a57",
            "options": [
                {
                    "opt_name": "1990",
                    "_id": "5a8c98fefa995ced29338a5b"
                },
                {
                    "opt_name": "1999",
                    "_id": "5a8c98fefa995ced29338a5a"
                },
                {
                    "opt_name": "1997",
                    "_id": "5a8c98fefa995ced29338a59"
                },
                {
                    "opt_name": "2018",
                    "_id": "5a8c98fefa995ced29338a58"
                }
            ]
        },
        {
            "param_name": "Brand",
            "_id": "5a8c98fefa995ced29338a54",
            "options": [
                {
                    "opt_name": "toyota",
                    "_id": "5a8c98fefa995ced29338a56"
                },
                {
                    "opt_name": "Nissan",
                    "_id": "5a8c98fefa995ced29338a55"
                }
            ]
        }
    ]
}
 *

*/
router.post('/', groupController.createGroup);
/**
 * @api {get} /groups Get Groups
 * @apiName GetGroups
 * @apiGroup Group
 *
 * @apiDescription Get Groups
 * 
 *  * @apiSuccessExample Response Example:
 *[
    {
        "_id": "5a8c98fefa995ced29338a53",
        "name": "Automobiles",
        "updated_at": null,
        "created_at": "2018-02-20T21:48:04.319Z",
        "archived_at": null,
        "archived": false,
        "parameters": [
            {
                "param_name": "color",
                "_id": "5a8c98fefa995ced29338a5c",
                "options": [
                    {
                        "opt_name": "green",
                        "_id": "5a8c98fefa995ced29338a5f"
                    },
                    {
                        "opt_name": "blue",
                        "_id": "5a8c98fefa995ced29338a5e"
                    },
                    {
                        "opt_name": "black",
                        "_id": "5a8c98fefa995ced29338a5d"
                    }
                ]
            },
            {
                "param_name": "year",
                "_id": "5a8c98fefa995ced29338a57",
                "options": [
                    {
                        "opt_name": "1990",
                        "_id": "5a8c98fefa995ced29338a5b"
                    },
                    {
                        "opt_name": "1999",
                        "_id": "5a8c98fefa995ced29338a5a"
                    },
                    {
                        "opt_name": "1997",
                        "_id": "5a8c98fefa995ced29338a59"
                    },
                    {
                        "opt_name": "2018",
                        "_id": "5a8c98fefa995ced29338a58"
                    }
                ]
            },
            {
                "param_name": "Brand",
                "_id": "5a8c98fefa995ced29338a54",
                "options": [
                    {
                        "opt_name": "toyota",
                        "_id": "5a8c98fefa995ced29338a56"
                    },
                    {
                        "opt_name": "Nissan",
                        "_id": "5a8c98fefa995ced29338a55"
                    }
                ]
            }
        ]
    },
    {
        "_id": "5a8c99d7fa995ced29338a60",
        "name": "House",
        "updated_at": null,
        "created_at": "2018-02-20T21:48:04.319Z",
        "archived_at": null,
        "archived": false,
        "parameters": [
            {
                "param_name": "Location",
                "_id": "5a8c99d7fa995ced29338a65",
                "options": [
                    {
                        "opt_name": "Bole",
                        "_id": "5a8c99d7fa995ced29338a68"
                    },
                    {
                        "opt_name": "Arada",
                        "_id": "5a8c99d7fa995ced29338a67"
                    },
                    {
                        "opt_name": "Kirkos",
                        "_id": "5a8c99d7fa995ced29338a66"
                    }
                ]
            },
            {
                "param_name": "Door",
                "_id": "5a8c99d7fa995ced29338a61",
                "options": [
                    {
                        "opt_name": "wood",
                        "_id": "5a8c99d7fa995ced29338a64"
                    },
                    {
                        "opt_name": "aluminium",
                        "_id": "5a8c99d7fa995ced29338a63"
                    },
                    {
                        "opt_name": "Metal",
                        "_id": "5a8c99d7fa995ced29338a62"
                    }
                ]
            }
        ]
    }
]
 *  }

*/
router.get('/', groupController.getGroups);


// Expose User Router
module.exports = router;
