
/**
 * Copyright 2015-2017 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
import * as ng from 'angular';
import 'angular-mocks';
import name from '../laxar-accordion-control';

describe( 'The laxar-accordion-control', () => {

   beforeEach( ng.mock.module( name ) );

   let scope;
   beforeEach( ng.mocks.inject( ( $compile, $rootScope ) => {
      scope = $rootScope.$new();
      const htmlTemplate = `
         <div ax-accordion>
            <div class="ax-accordion-group"></div>
            <div class="ax-accordion-group"></div>
         </div>
      `;
      $compile( htmlTemplate )( scope );
   } ) );

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   it( 'survives a smoke test', () => {
      expect( true ).toBe( true );
   } );

} );
