import domtoimage from "dom-to-image-more";
import { getComputedStyleObject, wrapIfTextNode } from "./utils";
// const domtoimage = require("dom-to-image-more");

export function makeImage(e) {
  // console.log(e);
  const el = wrapIfTextNode.bind(this)(e.target.assignedNodes()[0]);

  const rect = el?.getBoundingClientRect ? el.getBoundingClientRect() : this.getBoundingClientRect();
  console.log(this.neonId, rect);
  console.log(this);
  // console.dir(el);
  // console.dir(this);
  // console.log(this.neonId);
  // console.table(getComputedStyleObject(el));

  // Make an image out of the slotted node and assign it as the background image
  if (this.shadowRoot.querySelector("slot").assignedNodes().length > 0) {
    const overwrite = {};
    overwrite["margin-block"] = "0";
    overwrite["margin"] = "0";
    console.log(rect.width, rect.height);
    domtoimage
      .toSvg(el, {
        width: rect.width,
        height: rect.height,
        style: Object.assign(getComputedStyleObject(el), overwrite),
      })
      .then((dataURL) => {
        console.log(this);
        this.src = dataURL;
        this.blurAmt = "10";
        this.width = rect.width + "px";
        this.height = rect.height + "px";
        el.style.display = "none";
        console.log(dataURL);
      });
  }
}
