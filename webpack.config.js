/**
 * Copyright 2015-2017 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
/* eslint-env node */

const pkg = require( './package.json' );

const webpack = require( 'laxar-infrastructure' ).webpack( {
   context: __dirname,
   rules: [
      {
         test: /\.js$/,
         exclude: 'node_modules',
         loader: 'babel-loader'
      }
   ],
   externals: {
      'jquery-ui/ui/widgets/accordion': 'jquery-ui/ui/widgets/accordion'
   }
} );

module.exports = [
   webpack.library(),
   webpack.browserSpec( [ `./spec/${pkg.name}.spec.js` ] )
];
