import { makeImage } from "./handlers.js";

const template = document.createElement("template");

const html = `<div class="neonShadow neon"><slot></slot></div>`;

class Neon extends HTMLElement {
  // Set up to watch changes on these attributes
  static get observedAttributes() {
    return ["src", "margin", "width", "height", "blur-amt", "font-compensation"];
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

  #filter = `drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5)) blur(${this.#default.blurAmt}px)`;

  // Create these private variables to be updated later in the connected hook
  #neonShadow = null;
  #neon = null;
  #root = null;

  constructor() {
    super();

    this.neonId = Neon.count;
    Neon.count = Neon.count + 1;

    const css = `
<style>
      .neon {
        margin: ${this.#default.margin};
        width: ${this.#default.width};
        height: ${this.#default.height};
        display: grid;
        justify-content: center;
        align-content: center;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
      }

      .neonShadow {
        position: relative;
      }

      .neonShadow::after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background: inherit;
        background-position: center center;
        filter: ${this.#filter};
        z-index: -1;

        /* animation time! */
        animation: oscillate 1s cubic-bezier(0.17, 0.67, 0.45, 1.32) infinite alternate;
      }

      @keyframes oscillate {
        from {
          transform: scale(1, 1);
        }

        to {
          transform: scale(1.2, 1.2);
        }
      }
</style>
`;
    template.innerHTML = `
      ${css}
      ${html}
      `;
    this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // Get the styles of the base component to be updated later
    this.#neon = [...this.shadowRoot.styleSheets[0].cssRules].find((rule) => rule.selectorText === ".neon").style;

    // Get the pseudo element styles so they can be updated later
    this.#neonShadow = [...this.shadowRoot.styleSheets[0].cssRules].find(
      (rule) => rule.selectorText === ".neonShadow::after"
    ).style;

    // Get the root element
    this.#root = this.shadowRoot.querySelector(".neon");

    // If attributes aren't set by the user, set their defaults
    if (!this.hasAttribute("src") && this.shadowRoot.querySelector("slot").assignedNodes().length <= 0) {
      this.src = "./img/neon-el.png";
    }
    if (!this.hasAttribute("blur-amt")) {
      this.blurAmt = this.#default.blurAmt;
    }
    if (!this.hasAttribute("width")) {
      this.width = this.#hasWidth() ? this.#default.width : "150px";
    }
    if (!this.hasAttribute("height")) {
      this.height = this.#hasHeight() ? this.#default.height : "150px";
    }
    if (!this.hasAttribute("margin")) {
      this.margin = this.#default.margin;
    }
    if (!this.hasAttribute("font-compensation")) {
      this.fontCompensation = this.#default.fontCompensation;
    }

    // Add an event listener for when the slot changes,
    // To copy the slot contents as an image and set as a blurred background image
    //! Need to figure out a way to prevent this from causing multiple
    //! events to be processed when the text node is swapped
    this.shadowRoot.querySelector("slot").addEventListener("slotchange", makeImage.bind(this));
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
      case "font-compensation":
        if (o && o !== n) {
          this.fontCompensation = n;
          this.shadowRoot.querySelector("slot").dispatchEvent(new Event("slotchange"));
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

  get blurAmt() {
    return this.getAttribute("blur-amt");
  }

  set blurAmt(n) {
    this.setAttribute("blur-amt", n);
  }

  get margin() {
    return this.getAttribute("margin");
  }
  set margin(n) {
    this.setAttribute("margin", n);
  }

  get width() {
    return this.getAttribute("width");
  }
  set width(n) {
    this.setAttribute("width", n);
  }

  get height() {
    return this.getAttribute("height");
  }
  set height(n) {
    this.setAttribute("height", n);
  }

  get fontCompensation() {
    return parseInt(this.getAttribute("font-compensation"));
  }
  set fontCompensation(n) {
    // The compensation amount MUST be a valid number
    let compensation = parseInt(n);
    if (Number.isNaN(compensation)) compensation = 0;
    this.setAttribute("font-compensation", compensation);
  }

  // Private Methods for internal component settings

  // Updated the filter that is applied to the neonShadow::after pseudo element
  #updateFilter() {
    this.filter = `drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5)) blur(${this.blurAmt}px)`;
    this.#neonShadow.filter = this.filter;
  }

  // TODO: These functions need to be re-evaluated, users may want to set a width or height of 0
  // Checks that the neon-el has a width greater than zero
  #hasWidth() {
    return getComputedStyle(this.#root).getPropertyValue("width") !== "0px";
  }
  // Checks that the neon-el has a height greater than zero
  #hasHeight() {
    return getComputedStyle(this.#root).getPropertyValue("height") !== "0px";
  }
}
customElements.define("neon-el", Neon);
export default Neon;
