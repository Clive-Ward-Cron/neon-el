import { makeImage } from "./handlers.js";
import html from "./template.js";
import css from "bundle-text:./style.css";
import defaultSVG from "./defaultSVG.js";
import { parseElementAttrBool } from "./utils.js";
class NeonEl extends HTMLElement {
  // Set up to watch changes on these attributes
  static get observedAttributes() {
    return ["src", "alt", "margin", "width", "height", "blur-amt", "font-compensation", "no-adjust"];
  }

  // Variable will count the number of NeonEls created and use it as an ID
  static count = 0;

  // A private object that holds some default values
  #default = {
    blurAmt: 20,
    margin: "inherit", // 100
    width: "inherit", // 150
    height: "inherit", // 150
    fontCompensation: 0,
  };

  // Create these private variables to be updated later in the connected hook
  #neonShadow = null;
  #neon = null;
  #slot = null;

  constructor() {
    super();

    // Keeps track of the different instances of Neon-El
    this.neonId = NeonEl.count;
    NeonEl.count = NeonEl.count + 1;

    // Create the Template and Style elements
    const template = document.createElement("template");
    const style = document.createElement("style");

    // Add the imported html for the template structure
    template.innerHTML = html;
    // Add the imported CSS to the created style element
    style.textContent = css;

    // Create the shadowRoot for the component using the created template
    this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));

    // Append the created styles to the shadowRoot
    this.shadowRoot.appendChild(style);
  }

  connectedCallback() {
    if (this.isConnected) {
      // Get the styles of the base component to be updated later
      this.#neon = [...this.shadowRoot.styleSheets[0].cssRules].find((rule) => rule.selectorText === ".neon").style;

      // Get the pseudo element styles so they can be updated later
      this.#neonShadow = [...this.shadowRoot.styleSheets[0].cssRules].find(
        (rule) => rule.selectorText === ".neonShadow::after"
      ).style;

      // Set the slot private variable for easier use
      this.#slot = this.shadowRoot.querySelector("slot");

      // If necessary attributes/properties aren't set, set their defaults
      if (!this.hasAttribute("src") && this.shadowRoot.querySelector("slot").assignedNodes().length <= 0) {
        this.src = defaultSVG;
      }
      if (!this.hasAttribute("blur-amt")) {
        this.blurAmt = this.#default.blurAmt;
      }
      this.#neon.margin = this.margin;
      this.#neon.width = this.width;
      this.#neon.height = this.height;

      // Add an event listener for when the slot changes,
      // To copy the slot contents as an image and set as a blurred background image
      //! The "slotchange" event will fire multiple times when a text node is the slotted node because the text node will be removed, wrapped, and then added again for the image to be generated, this is mitigated in handler.js
      this.#slot.addEventListener("slotchange", makeImage.bind(this));
    }
  }

  // Processes the observed/watched attributes as they are changed
  attributeChangedCallback(name, o, n) {
    switch (name) {
      case "src":
        this.#neon.backgroundImage = `url('${this.src}')`;
        break;
      case "blur-amt":
        this.#updateFilter();
        break;
      case "margin":
        this.#neon.margin = this.margin;
        break;
      case "width":
        this.#neon.width = this.width;
        break;
      case "height":
        this.#neon.height = this.height;
        break;
      case "no-adjust":
        // If the no-adjust property is changed,
        // regenerate the image
        const parsed = parseElementAttrBool(n);
        if (o && parseElementAttrBool(o) !== parsed) {
          this.noAdjust = parsed;
          this.#slot.dispatchEvent(new Event("slotchange"));
        }
        break;
      case "font-compensation":
        // If the font-compensation attribute is updated,
        // dispatch the slotchange event
        if (o && o !== n) {
          this.fontCompensation = n;
          this.#slot.dispatchEvent(new Event("slotchange"));
        }
    }
  }

  // Getters and Setters for each attribute
  get src() {
    return this.getAttribute("src");
  }

  set src(n) {
    this.setAttribute("src", n);
  }

  get alt() {
    if (!this.hasAttribute("alt")) return "";
    return this.getAttribute("alt");
  }

  set alt(n) {
    this.setAttribute("alt", n);
  }

  get blurAmt() {
    return this.getAttribute("blur-amt");
  }

  set blurAmt(n) {
    this.setAttribute("blur-amt", n);
  }

  get margin() {
    if (!this.hasAttribute("margin")) {
      return this.#default.margin;
    }
    return this.getAttribute("margin");
  }
  set margin(n) {
    this.setAttribute("margin", n);
  }

  get width() {
    if (!this.hasAttribute("width")) {
      return this.#default.width;
    }
    return this.getAttribute("width");
  }
  set width(n) {
    this.setAttribute("width", n);
  }

  get height() {
    if (!this.hasAttribute("height")) {
      return this.#default.height;
    }
    return this.getAttribute("height");
  }
  set height(n) {
    this.setAttribute("height", n);
  }

  get fontCompensation() {
    if (!this.hasAttribute("font-compensation")) {
      return this.#default.fontCompensation;
    }
    return parseInt(this.getAttribute("font-compensation"));
  }
  set fontCompensation(n) {
    // The compensation amount MUST be a valid number
    let compensation = parseInt(n);
    if (Number.isNaN(compensation)) compensation = 0;
    this.setAttribute("font-compensation", compensation);
  }

  // Getters and Setters for noAdjust (no-adjust)
  // behaves similarly to regular HTML Boolean attributes
  // where simply having the attribute name evaluates to true
  get noAdjust() {
    // If it isn't there, its false
    // If it is there with no value, its true
    if (!this.hasAttribute("no-adjust")) return false;

    // Otherwise parse the value as a Boolean and return it.
    return parseElementAttrBool(this.getAttribute("no-adjust"));
  }
  set noAdjust(n) {
    // Wanted to keep the utility function parseElementAttrBool
    // cleaner so I am checking and short circuting at the start
    // if the value is an empty string here instead of binding
    // 'this' to the function and doing it there.
    if (n === "") {
      this.setAttribute("no-adjust", "");
      return;
    }
    const bool = parseElementAttrBool(n);
    this.setAttribute("no-adjust", bool);
  }

  // Private Methods for internal component settings

  // Updated the filter that is applied to the neonShadow::after pseudo element
  #updateFilter() {
    let filter = `drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5)) blur(${this.blurAmt}px)`;
    this.#neonShadow.filter = filter;
  }
}
customElements.define("neon-el", NeonEl);
export default NeonEl;
