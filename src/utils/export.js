async function collectStyles() {
  let css = "";
  for (const tag of document.querySelectorAll("style")) {
    css += tag.textContent + "\n";
  }
  for (const link of document.querySelectorAll('link[rel="stylesheet"]')) {
    try {
      const res = await fetch(link.href);
      if (res.ok) css += (await res.text()) + "\n";
    } catch {
      /* stylesheet externa indisponível — segue sem ela */
    }
  }
  return css;
}

export async function exportAsHtml(filename, contentHtml) {
  const dark = document.documentElement.classList.contains("dark");
  const css = await collectStyles();
  const title = filename.replace(/\.(md|markdown|txt)$/i, "");

  const html = `<!DOCTYPE html>
<html lang="pt-BR" class="${dark ? "dark" : ""}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
<style>${css}</style>
</head>
<body class="bg-surface text-on-surface antialiased font-body-preview">
<main class="max-w-3xl mx-auto px-4 sm:px-6 py-10">
  <article>
    <div class="md-body">${contentHtml}</div>
  </article>
</main>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title}.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function exportAsPdf() {
  window.print();
}
