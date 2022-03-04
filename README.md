# NEON-EL

This is my first attempt at creating my own custom web component.

This component <neon-el> takes an image url as a 'src' attribute and uses that to add the image as the background image and uses CSS to give it a neat blurred halo effect in the background that color matches the image used.

## TODO

- Add functionality to allow slotting text or other inline element and have the same/similar effect applied to it.

- Update the neon-el.png image to be nicer.

### Thoughts and Considerations

Is the following:
`` [...this.shadowRoot.styleSheets[0].cssRules].find( (rule) => rule.selectorText === ".inner" ).style.backgroundImage =`url(${this.src})`;  ``
better than using:
`` this.shadowRoot.querySelector(".inner").style.backgroundImage = `url(${this.src})`; ``

or does it have any other beneficial applications in a web component?

The benefit is being able to use javascript to dynamically update the pseudo elements such as neonShadow::after!
