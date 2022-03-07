// import domtoimage from "dom-to-image-more";
const domtoimage = require("dom-to-image-more");

const template = document.createElement("template");

const html = `<div class="neonShadow neon"><slot name="to-copy"></slot></div>`;

class Neon extends HTMLElement {
  static get observedAttributes() {
    return ["src", "margin", "width", "height", "blur-amt"];
  }

  #default = {
    blurAmt: 20,
    margin: "inherit", // 100
    width: "inherit", // 150
    height: "inherit", // 150
  };

  #filter = `drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5)) blur(${this.#default.blurAmt}px)`;

  #neonShadow = null;
  #neon = null;
  #root = null;

  constructor() {
    super();

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
    console.log("connected");

    this.#neonShadow = [...this.shadowRoot.styleSheets[0].cssRules].find(
      (rule) => rule.selectorText === ".neonShadow::after"
    ).style;

    this.#neon = [...this.shadowRoot.styleSheets[0].cssRules].find((rule) => rule.selectorText === ".neon").style;

    this.#root = this.shadowRoot.querySelector(".neon");

    if (this.isConnected) {
      if (!this.hasAttribute("src")) {
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
    }

    // Add an event listener for when the slot changes,
    // Trying to copy the slot contents as an image and set as a blurred background image
    this.shadowRoot.querySelector("slot").addEventListener("slotchange", (e) => {
      console.log(e.target.assignedElements()[0]);
      console.log(e.target.assignedElements()[0].getBoundingClientRect());
      const rect = e.target.assignedElements()[0].getBoundingClientRect();
      const el = e.target.assignedNodes()[0];

      console.log(Math.ceil(rect.width) + 1, Math.ceil(rect.height) + 1);
      console.log(e.target.assignedElements()[0].style.color);
      console.log(this.shadowRoot.querySelector("slot").assignedNodes());
      console.log(this.offsetHeight, this.offsetWidth);
      //! TESTING OUT MODIFYING SLOTS
      if (this.shadowRoot.querySelector("slot").assignedNodes().length > 0) {
        domtoimage
          .toPng(el, {
            width: el.offsetWidth,
            height: el.offsetHeight,
          })
          .then((dataURL) => {
            this.src = dataURL;
            this.blurAmt = "10";
            console.log(dataURL);
            // const image = document.createElement("img");
            // image.src = dataURL;
            // this.shadowRoot.querySelector(".neon").appendChild(image);
          });
      }
    });
  }

  attributeChangedCallback(name, o, n) {
    console.log("Attribute Change");
    switch (name) {
      case "src":
        this.#neon.backgroundImage = `url(${this.src})`;
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
    }
  }

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

  #updateFilter() {
    console.log("updating filter");
    this.filter = `drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5)) blur(${this.blurAmt}px)`;
    this.#neonShadow.filter = this.filter;
  }

  #hasWidth() {
    return getComputedStyle(this.#root).getPropertyValue("width") !== "0px";
  }
  #hasHeight() {
    console.log(getComputedStyle(this.#root).getPropertyValue("height") !== "0px");
    return getComputedStyle(this.#root).getPropertyValue("height") !== "0px";
  }
}
customElements.define("neon-el", Neon);
export default Neon;
