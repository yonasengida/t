/**
 * Admin router.
 */

/**
 * Load Module Dependencies.
 */
var express   = require('express');
var debug     = require('debug')('api:product-router');
var productController = require('../controllers/product');
var userController = require('../controllers/user');
var accessControl  = require('../controllers/auth').accessControl;

var router  = express.Router();
/**
 * @api {post} /products Create Product
 * @apiName CreateProduct
 * @apiGroup Product
 *
 * @apiDescription Create Product
*/
router.post('/', productController.createProduct);

/**
 * @api {get} /products Get Products
 * @apiName GetProducts
 * @apiGroup Product
 *
 * @apiDescription Get Products
 
*/
router.get('/', productController.getProducts);
/**
 * @api {get} /products/search Search Products
 * @apiName SearchProducts
 * @apiGroup Product
 *
 * @apiDescription Serch Products
 
*/
router.get('/search', productController.searchProduct);
router.get('/search/paginate', productController.searchPaninateProduct);
router.param('id',productController.validateProduct);
/**
 * @api {get} /products/:id Get Product
 * @apiName GetProduct
 * @apiGroup Product
 *
 * @apiDescription Get Product
 
*/
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
/**
 * @api {post} /products/:id/prices Get Price Forcast
 * @apiName GetPriceForecast
 * @apiGroup Product
 * @apiDescription Add Parameter
 *
 *  @apiParam id ProductID
 * 
 
 *  @apiParamExample Request Example:
*  {
  "parametrs":[
	{
	"parameter":"5a9a7a7101b95b6442ec744b",
	"options":[{"opt_name":"option1"},{"opt_name":"option4"}]
    } 
 ]
}  

* @apiSuccessExample Response Example:
{
    "product": {
        "_id": "5a9a7a6801b95b6442ec744a",
        "name": "Product1",
        "sector": "5a9533dea5084a312a7fa620",
        "service": "5a9523c9a8461544472dbc56",
        "updated_at": null,
        "created_at": "2018-03-03T10:34:55.389Z",
        "archived_at": null,
        "archived": false,
        "parameters": [
            {
                "_id": "5a9a7a7101b95b6442ec744b",
                "name": "testParam6",
                "updated_at": null,
                "archived_at": null,
                "archived": false
            },
            {
                "_id": "5a9a7a7101b95b6442ec744c",
                "name": "testParam3",
                "updated_at": null,
                "archived_at": null,
                "archived": false
            },
            {
                "_id": "5a9a7a7101b95b6442ec744d",
                "name": "testParam5",
                "updated_at": null,
                "archived_at": null,
                "archived": false
            },
            {
                "_id": "5a9a7a7101b95b6442ec744e",
                "name": "testParam5100",
                "updated_at": null,
                "archived_at": null,
                "archived": false
            }
        ]
    },
    "price": 300
}
*/
router.post('/:id/prices', productController.priceForeCast);
/**
 * @api {put} /products/:id/parameters Add Product Parameter
 * @apiName AddParameter
 * @apiGroup Product
 *
 *  @apiParam id ProductID
 * 
 * @apiDescription Add Parameter
 *  @apiParamExample Request Example:
    *   {

        "parameters":[{"param_name":"testParam6"},{"param_name":"testParam3"},{"param_name":"testParam5"}]
        
    }
* @apiSuccessExample Response Example:
{
    "erro": false,
    "msg": "Succesfully Added",
    "status": 200
}
*/
router.put('/:id/parameters', productController.addParameter);

/**
 * @api {put} /products/:id/parameter/options Add Product Parameter Options
 * @apiName AddParameterOptions
 * @apiGroup Product
 *
 * @apiParam id ProductID
 * 
 * @apiDescription Add Parameter Options
 *  @apiParamExample Request Example:
   {
	"parameter":"testParam3",
	"options":[{"opt_name":"option1"},{"opt_name":"option1"},{"opt_name":"option1"},{"opt_name":"option1"}]
	
}
* @apiSuccessExample Response Example:
{
    "erro": false,
    "msg": "Succesfully Added",
    "status": 200
}
*/
router.put('/:id/parameter/options', productController.setPrice);
// router.put('/:id/parameter/options/prices', productController.test);

// Expose User Router
module.exports = router;
