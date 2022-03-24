import domtoimage from "dom-to-image-more";
import { getComputedStyleObject, wrapIfTextNode } from "./utils";

/**
 * @description The handler for the slotchanged event on the web component. If the component has a slotted content it uses dom-to-image-more to create an SVG image of that content and uses that as the image to be animated.
 * @param {Event} e The slot changed event
 */
export function makeImage(e) {
  // Make an image out of the slotted node and assign it as the background image
  if (this.shadowRoot.querySelector("slot").assignedNodes().length > 0) {
    // pass the slots first child to wrapIfTextNode
    // If its a text node it will be returned wrapped in a span,
    // Otherwise it returns the unmodified element node.
    const el = wrapIfTextNode.bind(this)(e.target.assignedNodes()[0]);

    // The Element needs to be visible to create an image of it
    if (el.style.opacity === "0") {
      el.style.opacity = 1;
    }

    // Get the width and height from the bounding client rect and get an integer instead of float
    const rect = el?.getBoundingClientRect ? el.getBoundingClientRect() : this.getBoundingClientRect();
    const rectWidth = Math.ceil(rect.width);
    const rectHeight = Math.ceil(rect.height);
    const elStyles = getComputedStyleObject(el);

    // Need to declare a set of default styles to overwrite the
    // ones that are generated by domtoimage that cause issues.
    // ! Need to use Bracket Accessor to overwrite the properties properly
    const overwrite = {};
    overwrite["margin-block"] = "0"; // margins were applied in the SVG
    overwrite["white-space"] = "nowrap"; // Fixes unwanted text nodes wrapping

    // User will have to figure their own font compensation amount
    const compensation = this.fontCompensation;

    // Pass the element to be imaged as an SVG to dom-to-image
    // Gives it a width and height of the boundingClientRect along
    // with any margin associated with the el (Adds the font compensation if given)
    // Uses the style object that was genereated from the elements CSSStyleDeclaration and merges any values that are present in the
    // overwrite object
    domtoimage
      .toSvg(el, {
        width:
          rectWidth +
          parseInt(elStyles.marginRight.replace("px")) +
          parseInt(elStyles.marginLeft.replace("px")) +
          compensation,
        height: rectHeight,
        style: Object.assign(elStyles, overwrite),
      })
      .then((dataURL) => {
        // TODO: See if I can opt-out of font-face rules in dom-to-image-more
        // Remove the inline base64 font-face style from the returned SVG data
        // and set it as the background image
        this.src = dataURL.replace(/<style>@font-face.*<\/style>/, "").replace(/%0A/g, "");
        // Adjust the width and height of the component
        // or the returned image won't display
        this.width =
          rectWidth + parseInt(elStyles.marginRight.replace("px")) + parseInt(elStyles.marginLeft.replace("px")) + "px";
        this.height =
          rectHeight +
          parseInt(elStyles.marginTop.replace("px")) +
          parseInt(elStyles.marginBottom.replace("px")) +
          "px";

        // Don't display the original slotted element
        // or there will be an ugly overlay
        el.style.opacity = 0;
      });
  }
}
