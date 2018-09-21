'use strict';
// require('dotenv').config();

exports.DATABASE_URL =
  process.env.DATABASE_URL || 'mongodb://localhost/bike-rack-backend';
exports.TEST_DATABASE_URL = 
  process.env.TEST_DATABASE_URL ||
  'mongodb://localhost/bike-rack-backend-test';
exports.PORT = process.env.PORT || 5004;
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5005',
exports.JWT_SECRET = process.env.JWT_SECRET ||'uuu';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
