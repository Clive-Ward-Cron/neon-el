// Had to make sure that the module could be imported and extended
import NeonEl from "./dist/neon-el.js";

class NeonElExtended extends NeonEl {
  constructor() {
    super();

    console.log("Test Works");
  }
}
customElements.define("neon-el-extended", NeonElExtended);
