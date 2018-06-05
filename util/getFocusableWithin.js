import matches from 'dom-helpers/query/matches';

// returns first focusable element within currentElement, self included...

export default function getFocusableWithin(currentElement) {
  const focusableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
  // If self matches, return self...
  if (matches(currentElement, focusableElements)) {
    return currentElement;
  }
  let focusable = Array.prototype.filter.call(currentElement.querySelectorAll(focusableElements),
    (element) => {
      // check for visibility while always include the current activeElement
      return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement;
    });
    return focusable[0];
}
