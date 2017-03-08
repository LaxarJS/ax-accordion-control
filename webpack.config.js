/**
 * Copyright 2015-2017 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
/* eslint-env node */
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

const name = require( './package.json' ).name;

module.exports = process.env.NODE_ENV === 'browser-spec' ?
   webpack.browserSpec( `./spec/${name}.spec.js` ) :
   webpack.library();
