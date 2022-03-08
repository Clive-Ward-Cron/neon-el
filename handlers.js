import domtoimage from "dom-to-image-more";
import { getComputedStyleObject, wrapIfTextNode } from "./utils";
// const domtoimage = require("dom-to-image-more");

export function makeImage(e) {
  console.log(e);
  const el = wrapIfTextNode(e.target.assignedNodes()[0]);

  const rect = el?.getBoundingClientRect ? el.getBoundingClientRect() : this.getBoundingClientRect();
  console.dir(el);
  console.dir(this);
  // console.table(getComputedStyleObject(el));

  //! TESTING OUT MODIFYING SLOTS
  if (this.shadowRoot.querySelector("slot").assignedNodes().length > 0) {
    const overwrite = {};
    overwrite["margin-block"] = "0";
    overwrite["margin"] = "0";
    domtoimage
      .toSvg(el, {
        style: Object.assign(getComputedStyleObject(el), overwrite),
      })
      .then((dataURL) => {
        console.log(this);
        this.src = dataURL;
        this.blurAmt = "10";
        this.width = rect.width + "px";
        this.height = rect.height + "px";
        // el.style.display = "none";
        // console.log(dataURL);
      });
  }
}
