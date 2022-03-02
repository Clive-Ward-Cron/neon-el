const template = document.createElement("template");
const css = `
<style>
  .inner {
        margin: 100px;
        width: 150px;
        height: 150px;
        /* background-image: url("./img/1f363.svg"); */
        background-repeat: no-repeat;
        background-size: contain;
      }

      .colorfulShadow {
        position: relative;
      }

      .colorfulShadow::after {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        background: inherit;
        background-position: center center;
        filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5)) blur(20px);
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
<div class="colorfulShadow inner"></div>
`;

class Neon extends HTMLElement {
  static get observedAttributes() {
    return ["src"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    console.log("connected");
    if (this.isConnected) {
      if (!this.hasAttribute("src")) {
        this.src = "./img/1f363.svg";
      }
    }
  }

  attributeChangedCallback(name, o, n) {
    switch (name) {
      case "src":
        this.shadowRoot.querySelector(".inner").style.backgroundImage = `url(${this.src})`;
    }
  }

  get src() {
    return this.getAttribute("src");
  }

  set src(n) {
    this.setAttribute("src", n);
  }
}
customElements.define("neon-el", Neon);
