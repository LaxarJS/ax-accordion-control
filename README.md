# AxAccordionControl

A wrapper around the [jQuery UI accordion control](https://jqueryui.com/accordion/) for usage as AngularJS directive in LaxarJS applications.

## Installation

To retrieve a copy of this control you can either clone it directly using git or alternatively install it via Bower.
For general information on installing, styling and optimizing controls, have a look at the [LaxarJS documentation](https://github.com/LaxarJS/laxar/blob/master/docs/manuals/installing_controls.md).

### Setup Using Bower

Install the control:

```sh
bower install laxarjs.ax-accordion-control
```

Add RequireJS paths for the jQuery UI dependency to your `require_config.js`, if you have not already done so:

```js
   paths: [
      // ...
      jquery: 'jquery/dist/jquery',
      jquery_ui: 'jquery_ui/ui'
   ]
```

Reference the control from the `widget.json` of your widget:
 
```json
   "controls": [ "laxarjs.ax-accordion-control" ]
```
