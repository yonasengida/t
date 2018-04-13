/** * Load Module dependencies.
 */
var path = require('path');
var env     = process.env;

var PORT        = env.PORT || 8081;
var API_URL     = env.API_URL || '127.0.0.1:8081';
var MONGODB_URL = env.MONGODB_URL || 'mongodb://127.0.0.1:27017/be';
var NODE_ENV    = env.NODE_ENV || 'development';
var HOST        = env.HOST || 'localhost';

module.exports = {

  API_URL: API_URL,

  ENV: NODE_ENV,

  PORT: PORT,

  HOST: HOST,
  DOCS_URL:API_URL,
TOKEN_LENGTH:9,
TOKEN:{
RANDOM_BYTE_LENGTH:12},
  // MongoDB URL
  MONGODB: {
    URL: MONGODB_URL,
    OPTS: {
      server:{
        auto_reconnect:true
      }
    }
  },

  CORS_OPTS: {
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization'
  },

  SALT_FACTOR: 12,

  TOKEN: {
    RANDOM_BYTE_LENGTH: 32
  },

  MEDIA: {
    FILE_SIZE: 2 * 1024 * 1024, // 1MB,
    URL: API_URL + '/media/',
    FILES_FOLDER: path.resolve(process.cwd(), './media') + '/'
  },
     errorResponse:{
    userNameEmpty:{
      code:700,
      msg:'User Name Should not be empty'
    },userNameEmail:{
      code:701,
      msg:'User Name should be valid email'
    },passwordEmpty:{
      code:702,
      msg:'Password should not be empty'
    },
    passwordLength:{
      code:703,
      msg:'6 to 20 characters required'
    }
  },
  MEDIA: {
    FILE_SIZE: 2 * 1024 * 1024, // 1MB,
    URL: API_URL + '/media/',
    FILES_FOLDER: path.resolve(process.cwd(), './media') + '/',
    UPLOADES:path.resolve(process.cwd(), './public/uploads') + '/',
  }
};
