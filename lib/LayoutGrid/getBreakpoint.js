import bp from './breakpoints';

export default function getBreakpoint(width, bpObject) {
  let bpO = bpObject;
  if (bpO === undefined) {
    bpO = bp;
  }

  let currentQuery;
  for (const q in bpO) {
    if (width > bpO[q]) {
      currentQuery = q;
    } else {
      return currentQuery;
    }
  }
  return currentQuery;
}
