# NEON-EL

This is my first attempt at creating my own custom web component.

This component <neon-el> takes an image url as a 'src' attribute and uses that to add the image as the background image and uses CSS to give it a neat blurred halo effect in the background that color matches the image used.

Elements can now be slotted into the <neon-el> and an SVG image of the contents will be generated from it. There are some quirks on image sizing and fonts affecting the final image. More comprehensive testing for various different element and nesting combinations is needed.

# Development & Building

Use `npm run watch` to work on neon-el files

Use `npm run build` to build the neon-el.js file

## TODO

- ~~Add functionality to allow slotting text or other inline element and have the same/similar effect applied to it.~~ **DONE**

- ~~Look into the possibility of optimizing SVG at or after generation. Possibly using [SVGO](https://github.com/svg/svgo)~~ **No benefit**

- ~~Update the neon-el.png image to be an SVG (Possibly Integrate It As a default for the component)~~ **DONE**

- Evalutate whether the width and height should be explicitly set when domtoimage creates and sets the generated SVG as the src property or if a user defined width and height should overrule those properties.

- See what steps I can take to optimze the component as best I can. This thing is more novelty than practical so optimization can probably only go so far when you're generating SVG's of DOM nodes.

- See about centering slotted elements when CSS styles for neon-el have been user defined to be larger than the content of the slot.

- Add ability for user to change or define the animations properties

### Thoughts and Considerations

Is the following:

```js
[...this.shadowRoot.styleSheets[0].cssRules].find(
  (rule) => rule.selectorText === ".inner"
).style.backgroundImage = `url(${this.src})`;
```

better than using:

```js
this.shadowRoot.querySelector(".inner").style.backgroundImage = `url(${this.src})`;
```

or does it have any other beneficial applications in a web component?

The benefit is being able to use javascript to dynamically update the pseudo elements such as neonShadow::after!

Removing the following unnecessary code:

```js
// INITIAL INSTANTIATION IN THE CLASS
#root = null;

// PERFORMED IN THE CONNECTED CALLBACK
// Get the root element
this.#root = this.shadowRoot.querySelector(".neon");

// PRIVATE FUNCTIONS
// Checks that the neon-el has a width greater than zero
  #hasWidth() {
    return getComputedStyle(this.#root).getPropertyValue("width") !== "0px";
  }
  // Checks that the neon-el has a height greater than zero
  #hasHeight() {
    return getComputedStyle(this.#root).getPropertyValue("height") !== "0px";
  }
```

Removing it because the user should be allowed to have a default of 0 width and/or height. Width and height can be set via CSS on the neon-el or directly attached with the width and height attribute, or dynamically added using the width and height properties.

**I want to preserve the previous code because it could be potentially useful to grab and read/manipulate the actual root element's values in the future**
