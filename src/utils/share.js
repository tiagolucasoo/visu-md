const PREFIX = "#doc=";

export function buildShareUrl(markdown) {
  return `${window.location.origin}${window.location.pathname}${PREFIX}${encodeURIComponent(markdown)}`;
}

export function readSharedDoc() {
  const { hash } = window.location;
  if (!hash.startsWith(PREFIX)) return null;
  try {
    const md = decodeURIComponent(hash.slice(PREFIX.length));
    return md || null;
  } catch {
    return null;
  }
}
