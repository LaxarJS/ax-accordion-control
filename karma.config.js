/* eslint-env node */
module.exports = function( config ) {
   config.set( karmaConfig() );
};

const laxarInfrastructure = require( 'laxar-infrastructure' );
const path = require( 'path' );

const resolve = function(p) { return path.join( path.dirname( __filename ), p ); };
const polyfillsPath = resolve( 'node_modules/laxar/dist/polyfills.js' );
const specsPattern = resolve( 'spec/laxar-accordion-control.spec.js' );
const assetsPatterns = [
   `${polyfillsPath}.map`
];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function karmaConfig() {

   const webpack = require( './webpack.config' );

   const base = laxarInfrastructure.karma( {
      context: __dirname,
      externals: webpack.externals,
      rules: webpack.module.rules
   } );

   return Object.assign( {}, base, {
      files: files( specsPattern, [ polyfillsPath ], assetsPatterns ),
      preprocessors: {
         [ specsPattern ]: [ 'webpack', 'sourcemap' ]
      }
   } );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function files( specPath, dependencyPatterns, assetsPatterns ) {
   return dependencyPatterns
      .concat( [ specPath ] )
      .concat( assetsPatterns.map( pattern => ({ pattern, included: false }) ) );
}
