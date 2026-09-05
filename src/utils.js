export function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function extractToc(markdown) {
  const items = [];
  let inCode = false;
  for (const line of markdown.split("\n")) {
    if (/^```/.test(line.trim())) inCode = !inCode;
    if (inCode) continue;
    const m = line.match(/^(#{1,3})\s+(.*)$/);
    if (m) {
      const text = m[2].replace(/[*_`~]/g, "").trim();
      items.push({ level: m[1].length, text, id: slugify(text) });
    }
  }
  return items;
}

export function formatLabel(filename) {
  if (/\.(md|markdown)$/i.test(filename)) return "GFM Nativo";
  if (/\.txt$/i.test(filename)) return "Texto simples";
  if (/\.mdoc$/i.test(filename)) return "MDoc";
  return filename.includes(".") ? filename.split(".").pop().toUpperCase() : "Desconhecido";
}

export function docStats(markdown) {
  const lines = markdown ? markdown.split("\n").length : 0;
  const words = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.round(words / 200));
  return { lines, words, minutes };
}

export function readingFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
