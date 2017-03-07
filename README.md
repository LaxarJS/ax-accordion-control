# laxar-accordion-control

> Wraps the [jQuery UI accordion](https://jqueryui.com/accordion/) as an AngularJS v1 directive, for LaxarJS widgets.


## Installation

To use this control you should install it into your LaxarJS v2 project:

```console
npm install laxar-accordion-control
```

This control requires jQuery UI and only works for LaxarJS widget that are targeting AngularJS v1.


### Usage

Reference the control from the `widget.json` descriptor of your widget:

```json
"controls": [ "laxar-accordion-control" ]
```

Now you should be able to use `ax-accordion` in your HTML widget template:

```html
<div ax-accordion="{ duration: 200 }">
   <div class="ax-accordion-group">
      <div>First Panel Title</div>
      <div>Contents of first panel</div>
   </div>
   <div class="ax-accordion-group">
      <div>Second Panel Title</div>
      <div>Contents of second panel</div>
   </div>
</div>
```

The directive attribute can be used to specify options for the jQuery UI accordion.
