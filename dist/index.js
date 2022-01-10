'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-split-text.cjs.production.min.js');
} else {
  module.exports = require('./react-split-text.cjs.development.js');
}