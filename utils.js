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

    console.groupCollapsed(`WrapIfTextNode ${this.neonId}`);
    console.log(this.neonId, parent);
    console.log(this.neonId, newSpan);
    console.groupEnd();

    // Return the reference to the new span containing the text
    return newSpan;
  }
  // Otherwise return the unmodified node
  else {
    return node;
  }
}
