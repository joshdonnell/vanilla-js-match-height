<h1 align="center">Vanilla JS Match Height</h1>

<p align="center">A jQuery free equivilent of jQuery match height, a simple, lightweight way to make elements the same height. At 2kb ( 1.1kb Gziped ) this tiny package packs a big punch of functionality with helpers to make your life easier.</p>

---

## Contents

- [Docs](https://joshdonnell.github.io/vanilla-js-match-height/)
- [Install](#install)
- [How To Use](#how-to-use)
- [Examples](#examples)
- [Author](#author)
- [Support](#support)

## Install

1. Install the package.

```bash
npm install vanilla-js-match-height
```

2. Import the package into your application script.

```js
import MatchHeight from 'vanilla-js-match-height';
```

Or include the script in your HTML.

```html
<script async src="vanilla-js-match-height/dist/index.js"></script>
```


## How To Use 
( Basic usage )

```js
import MatchHeight from 'vanilla-js-match-height';

// New MatchHeight - The only required parameter 
// is the element class at the start. The second parameter
// is an optional object for the settings. The 3 settings
// that can be passed into this object are, parent, byRow
// and timeOut.
new MatchHeight(Element, Options);

// Full Example of the format
new MatchHeight('.my-class', 
    {
        parent: '.my-parent', // A parent class or ID to group items ( Default value : null )
        byRow: true, // Use the elemnt offset to group them by row ( Default value : true )
        timeOut: 300 // Sets A Timout On Load mainly for sliders ( Default value : 50 )
    }
);
```

Out of the box Vanilla JS Match Height will update on resize and will recalculate the rows on resize too.

## Examples

- [Basic Example](https://codepen.io/joshdonnell/pen/zYWVOVo)
<!-- - [Parent Example](https://codepen.io/tannerhodges/pen/699e29b01d4851ccde4052486cfec63c)
- [ByRow Disabled Example](https://codepen.io/tannerhodges/pen/d38706e6bbc7ac61e2942ab4a3d292d6)
- [Update Example](https://codepen.io/tannerhodges/pen/f0718f8b1649acb1c1d191564e0477e0)
- [Reset Example](https://codepen.io/tannerhodges/pen/f0718f8b1649acb1c1d191564e0477e0)
- [Debug Example](https://codepen.io/tannerhodges/pen/f0718f8b1649acb1c1d191564e0477e0) -->

See the [Docs](https://joshdonnell.github.io/vanilla-js-match-height/) for the full list of options.

## Author

**Josh Donnell**

- [Profile](https://github.com/joshdonnell "Josh Donnell")
- [Email](mailto:hello@joshdonnell.co.uk?subject=Hi "Hi!")
- [Twitter](https://twitter.com/JoshDonnell97 "Twitter")

## Support

Contributions, issues, and feature requests are welcome!

Give a ⭐️ if you like this project!