// Load Module Dependencies
var express     = require('express');
var bodyParser  = require('body-parser');
var debug       = require('debug')('eagles-api');
var mongoose    = require('mongoose');
var validator   = require('express-validator');
// var search      = require('express-partial-response');
var config      = require('./config');
var router      = require('./routes');
// var authenticate = require('./lib/authenticate');
var path = require('path');
var cors       = require('cors');
var multer = require('multer');
//lets require/import the mongodb native drivers.
// var mongodb = require('mongodb');

//var authorize = require('./lib/authorize');

// Connect to Mongodb
mongoose.connect(config.MONGODB_URL);
// listen to connection event
mongoose.connection.on('connected', function mongodbConnectionListener() {
  debug('THESIS-Mongodb Connected successfully');
   console.log("THESIS Mongodb Connected successfully!")
});
// handle error eventy
mongoose.connection.on('error', function mongodbErrorListener() {
  debug('Connection to Mongodb Failed!!');
  console.log("Connection to Mongodb Failed!!")
  // Try and Reconnect
  mongoose.connect(config.MONGODB_URL);
 // mongoose.connect(config.MONGODB_UR, { useMongoClient: true, /* other options */ })

});

// Initialize app
var app = express();
/**
 * Set Up File uplaod
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploades')
  },
  filename: function (req, file, cb) {
    // cb(null, file.originalname)
    cb(null,  Date.now()+path.extname(file.originalname))
    // file.fieldname + '-' + Date.now()
  }
})
const upload = multer({storage: storage})
app.use(upload.any());
// Documentation resource
app.use('/media', express.static(path.join(__dirname, 'media')));
app.use(express.static('public'));
app.use(express.static('public/uploades'));
app.use(express.static('docs'));
// app.use(express.static('docs'));
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public')
//   },
//   filename: function (req, file, cb) {
//     // cb(null, file.originalname)
//     cb(null,  Date.now()+path.extname(file.originalname))
//     // file.fieldname + '-' + Date.now()
//   }
// })
// const upload = multer({storage: storage})
// app.use(upload.any());
// // app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

// // //Authentication Middleware
// app.use(authenticate({set_auth:true}).unless({
//   path: ['/users/login', '/users/signup','/vacancies/open','/comments','/news','/key/activate','customers/category']
// }));
app.use(cors(config.CORS_OPTS));
// Set Middleware
app.use(bodyParser.json());

// This is Middleware is used to filter and search
// app.use(search());
// Set Validator
app.use(validator());
//CORS -enable cross-origin resource sharing
// app.use(function (req, res, next) {
//   // res.config.COR
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   next();
// });
//Authentication Middleware
app.use(authenticate({set_auth:true}).unless({
  path: ['/users/g/login','/users/ln/login','/users/fb/login','/links/open/search','/links/open','/sectors/open','/users/login', '/users/signup','/theses/open','/forums/open','/forums/comment','/forums/:id/comment','/blogs/comment','/blogs/open','/comments','/news','/key/activate','customers/category']
}));
// Set Routes
router(app);
//Not Found Handler
app.use(function notFoundHandler(req, res, next) {
  res.status(404).json({
    error: true,
    msg: "UNDEFINED ENDPOINT",
    status: 404
  });
});

// Error Handling Middleware
app.use(function errorHandler(err, req, res, next) {
  if(err.name === 'CastError') {
    err.STATUS = 400;
  }
  res.status(err.STATUS || 500);
  res.json({
    error: true,
    message: err.message,
    type: err.name,
    status: err.STATUS || 500
  });
});

// Listen to HTTP Port
app.listen(config.HTTP_PORT, function connectionListener() {
  console.log("App is running"+ config.HTTP_PORT);
  debug('Thesis API running on port %s', config.HTTP_PORT);
});

module.exports = app;