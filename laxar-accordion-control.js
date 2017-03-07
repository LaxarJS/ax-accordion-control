/**
 * Copyright 2015-2017 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
import * as ng from 'angular';
import * as $ from 'jquery';
import * as debounce from 'lodash.debounce';
import 'jquery-ui/ui/accordion';

const DEBOUNCE_TIME_MS = 100;
const directiveName = 'axAccordion';
const directive = [ '$compile', '$parse', '$window', ( $compile, $parse, $window ) => {
   return {
      restrict: 'A',
      link( scope, element, attrs ) {
         // stay hidden until the jQuery accordion control has been instantiated
         element.addClass( 'ax-invisible' );

         let uiIndex = -1;
         let enableAnimationTimeout;
         const parsedOnBeforeActivate = attrs.axAccordionOnBeforeActivate ?
            $parse( attrs.axAccordionOnBeforeActivate ) :
            function() { return true; };

         const getSelectedPanel = $parse( attrs.axAccordionSelectedPanel );
         const setSelectedPanel = getSelectedPanel.assign || function() {};
         const refresh = debounce( () => { $( element ).accordion( refresh ); }, DEBOUNCE_TIME_MS );
         const options = {
            duration: 400,
            active: getSelectedPanel( scope ) || 0,
            ...scope.$eval( attrs[ directiveName ] )
         };

         const { animate = options.duration } = options;
         // prevent animation for initial selection
         options.animate = false;
         options.beforeActivate = beforeActivate;

         // one-off $watch to make sure contents (e.g. other widgets) are attached to the DOM and linked
         const doneInitializing = scope.$watch( () => {
            initialize();
            doneInitializing();
         } );

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         function initialize() {
            $( element ).accordion( options );
            element.removeClass( 'ax-invisible' );

            $window.clearTimeout( enableAnimationTimeout );
            // re-enable animations after initial selection has taken place
            enableAnimationTimeout = $window.setTimeout( () => {
               $( element ).accordion( 'option', 'animate', animate );
            } );

            scope.$watch( attrs.axAccordionSelectedPanel, newIndex => {
               if( newIndex === uiIndex ) { return; }
               $( element ).accordion( 'option', 'active', newIndex );
            } );
            scope.$on( 'axAccordion.refresh', refresh );
            scope.$on( 'axAccordion.options', ( event, options ) => {
               ng.forEach( options, ( value, key ) => {
                  $( element ).accordion( 'option', key, value );
               } );
            } );
            scope.$on( '$destroy', () => {
               $window.clearTimeout( enableAnimationTimeout );
            } );
         }

         /////////////////////////////////////////////////////////////////////////////////////////////////////

         function beforeActivate( event, ui ) {
            const index = element.find( $( element ).accordion( 'option', 'header' ) ).index( ui.newHeader );
            if( uiIndex === index ) { return; }

            const result = parsedOnBeforeActivate( scope, { index, scope } );
            if( result === false ) {
               event.preventDefault();
               return;
            }

            uiIndex = index;
            setSelectedPanel( scope, index );
            // Guarded apply: `beforeActivate` may be triggered indirectly by $digest, or by a primitive
            // DOM event-handler (set by jQuery UI) that is not hooked into AngularJS.
            if( !scope.$$phase ) { scope.$apply(); }
         }

      }
   };
} ];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const name = ng.module( `${directiveName}Control`, [] )
   .directive( directiveName, directive )
   .name;
