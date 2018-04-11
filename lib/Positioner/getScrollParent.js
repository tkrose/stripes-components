export default function getScrollParent(node) {
  const isElement = node instanceof HTMLElement;
  const cStyle = isElement && window.getComputedStyle(node);
  const overflowY = cStyle.overflowY;
  const position = cStyle.position;
  const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';
  const isRelative = position !== 'static' && position !== 'sticky';

  if (!node) {
    return null;
  } else if (isScrollable && isRelative && node.scrollHeight >= node.clientHeight) {
    return node;
  }

  return getScrollParent(node.parentNode) || document.body;
}
