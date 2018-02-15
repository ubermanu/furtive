# jQuery - Reveal

A plugin that toggles visibility of HTML elements according to Form input values.

### Getting started

Once you've included **reveal.js** and **jQuery** to your page, you can attach the Reveal watcher to a container.<br>
All the form elements (input, select, textarea etc...) will trigger the watcher handler.<br>

```html
<div data-reveal-watch>
```

### Conditions

Then, in your container you can attach some conditions to other elements.<br>
The conditions are simple jQuery selectors.<br>
If one of the selector matches, the condition is fulfilled and the element is displayed.<br>
**Note:** The selectors must be in the main watcher scope, see above.

```html
<div data-reveal-condition="#input:checked">
```
> This example will show the &lt;div&gt; element if #input is checked


### Conjunction

Sometimes it's necessary to have multiple conditions that MUST match.<br>
It's possible to define the conjunction method between conditions.<br>
The **OR** conjunction is used by default.

```html
<div data-reveal-condition="#input:checked, #input2:checked"
     data-reveal-conjunction="and">
```
> This example will show the &lt;div&gt; element if #input is checked and #input2 is checked too.

### Options

It's possible to disable the auto-binding using:

```js
window.Reveal.autoBind = false
```

It's possible to keep form elements enabled when hidden using:

```js
window.Reveal.disableHidden = false
```