/**
 * @description Takes a node and returns an object created from its CSSStyleDeclaration that comes from getComputedStyle(). If the node doesn't have a CSSStyleDeclaration it returns an empty object
 * @param {Node} el The node that will have the CSSStyleDeclaration returned as an object
 * @returns An object containing all styles in the CSSStyleDeclaration
 */
export function getComputedStyleObject(el) {
  // Get the Elements computed style declaration
  try {
    const declaration = getComputedStyle(el);

    // Check if the result is an actual style declaration,
    if (declaration instanceof CSSStyleDeclaration) {
      // Get the declarations keys and values and reduce them
      // into an object of just the used rules
      const obj = Object.entries(declaration).reduce((style, [key, value]) => {
        // Don't assign any blank values or keys or keys that are just numeric.
        if (!value || !key || !isNaN(parseInt(key))) return style;
        style[key] = value;
        return style;
      }, {});

      // Return the style object
      return obj;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
    return {};
  }
}

/**
 * @description Takes a Node and checks if its a text node or an element. If it's a Text Node then it will be wrapped in a span element before being returned.
 * @param {Node} node The node to be checked
 * @returns The span wrapped Text Node or the original Element Node
 */
export function wrapIfTextNode(node) {
  // Check if the passed node is a Text Node
  // If it is, wrap it in a span
  if (node.nodeType === Node.TEXT_NODE) {
    // Get the parent node of the text node
    const parent = node.parentElement;
    // Create the new span that will hold the text node
    const newSpan = document.createElement("span");

    // Place the text node into the span node
    // and then place that span into the parent
    newSpan.appendChild(node);
    parent.appendChild(newSpan);

    // Return the reference to the new span containing the text
    return newSpan;
  }
  // Otherwise return the unmodified node
  else {
    return node;
  }
}

/**
 * @description Takes in any value and returns it as a pure Boolean for use on a Boolean Element attribute where a value of "" should be true.
 * @param {any} v The value to be converted to a Boolean
 * @returns Boolean
 */
export function parseElementAttrBool(v) {
  if (v === "false") {
    return false;
  } else if (v === "") {
    return true;
  } else {
    return Boolean(v);
  }
}
