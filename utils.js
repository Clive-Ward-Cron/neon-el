export function getComputedStyleObject(el) {
  // Get the Elements computed style declaration
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
    return null;
  }
}
