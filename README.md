# jQuery - Furtive

A plugin that toggles visibility of HTML elements according to Form input values.

### Getting started

Once you've included **furtive.js** and **jQuery** to your page, you can attach the Furtive watcher to a container.<br>
All the form elements (input, select, textarea etc...) will trigger the watcher handler.<br>

```html
<div data-furtive-watch>
```

### Conditions

Then, in your container you can attach some conditions to other elements.<br>
The conditions are simple jQuery selectors.<br>
If one of the selector matches, the condition is fulfilled and the element is displayed.<br>
**Note:** The selectors must be in the main watcher scope, see above.

```html
<div data-furtive-condition="#input:checked">
```
> This example will show the &lt;div&gt; element if #input is checked


### Conjunction

Sometimes it's necessary to have multiple conditions that MUST match.<br>
It's possible to define the conjunction method between conditions.<br>
The **OR** conjunction is used by default.

```html
<div data-furtive-condition="#input:checked, #input2:checked"
     data-furtive-conjunction="and">
```
> This example will show the &lt;div&gt; element if #input is checked and #input2 is checked too.

### Options

Disable the auto-binding at start:

```js
window.Furtive.autoBind = false
```

Keep form elements enabled when hidden:

```js
window.Furtive.disableHidden = false
```
