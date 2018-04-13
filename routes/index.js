/**
 * Load Module dependencies
 */
const debug = require('debug')('api:routes');
const pkg                   = require('../package.json');
const userController        = require('./user');
const adminRouter           = require('./admin');
const clientRouter          = require('./client');
const groupRouter         = require('./group');
const productsRouter       = require('./products');
const servicesRouter       =require('./service');
const sectorsRouter       =require('./sector');
const businessRouter       =require('./business');
const businesstypeRouter       =require('./businesstype');
const standardRouter       =require('./standard');
const surveyRouter       =require('./survey');

const config                = require('../config');

module.exports = function initRoutes(app) {
  debug('loading routes');

  app.use('/users', userController);
  app.use('/admins', adminRouter);
  app.use('/clients', clientRouter);
  app.use('/groups', groupRouter);
  app.use('/products', productsRouter);
  app.use('/services', servicesRouter);
  app.use('/sectors', sectorsRouter);
  app.use('/business', businessRouter);
  app.use('/businesstypes', businesstypeRouter);
  app.use('/standards', standardRouter);
  app.use('/surveys', surveyRouter);
 
 

  app.get('/', function (req, res) {
    res.json({
      name:       pkg.name,
      version:    pkg.version,
      description: pkg.description,
      documentation: config.DOCS_URL,
      uptime: process.uptime() + 's'
    });
  });

  debug('routes loaded');
};

// OPEN ENDPOINTS
module.exports.OPEN_ENDPOINTS = [
    /\/media\/.*/,
    /\/documentation\/.*/,
    '/users/login',
    '/users/signup',
    '/sectors/parents',
    '/'
];
