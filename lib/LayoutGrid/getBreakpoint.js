import { bp } from './breakpoints';

export default function getBreakpoint(width, bpObject, defaultQuery) {
  let bpO = bpObject;
  if (bpO === undefined) {
    bpO = bp;
  }

  let currentQuery = defaultQuery;
  for (const q in bpO) {
    if (width > bpO[q]) {
      currentQuery = q;
    } else {
      return currentQuery;
    }
  }
  return currentQuery;
}
