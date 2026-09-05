import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MarkdownView from "./components/MarkdownView";
import FloatingBar from "./components/FloatingBar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import { docStats, extractToc, readingFile } from "./utils";
import { exportAsHtml, exportAsPdf } from "./utils/export";
import { buildShareUrl, readSharedDoc } from "./utils/share";

export default function App() {
  const [dark, setDark] = React.useState(true);
  const [filename, setFilename] = React.useState("documento-sem-titulo.md");
  const [content, setContent] = React.useState("");
  const [error, setError] = React.useState(null);
  const articleRef = React.useRef(null);

  React.useEffect(() => {
    const shared = readSharedDoc();
    if (shared) {
      setFilename("documento-compartilhado.md");
      setContent(shared);
    }
  }, []);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleFileSelected = React.useCallback(async (file) => {
    const isMd = /\.(md|markdown|txt)$/i.test(file.name);
    if (!isMd) {
      setError("Formato não suportado. Selecione um arquivo .md, .markdown ou .txt.");
      return;
    }
    try {
      const text = await readingFile(file);
      setFilename(file.name);
      setContent(text);
      setError(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Não foi possível ler o arquivo.");
    }
  }, []);

  const stats = docStats(content);
  const toc = React.useMemo(() => extractToc(content), [content]);
  const hasDoc = content.trim().length > 0;
  const [dragOver, setDragOver] = React.useState(false);

  const [shareCopied, setShareCopied] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  const showToast = React.useCallback((message) => setToast(message), []);

  const requireDoc = React.useCallback(() => {
    if (!content.trim()) {
      showToast("Nenhum documento carregado — importe um arquivo .md para exportar.");
      return false;
    }
    return true;
  }, [content, showToast]);

  const handleExportHtml = React.useCallback(() => {
    if (!requireDoc()) return;
    const mdBody = articleRef.current && articleRef.current.querySelector(".md-body");
    if (!mdBody) return;
    exportAsHtml(filename, mdBody.innerHTML);
  }, [filename, requireDoc]);

  const handleExportPdf = React.useCallback(() => {
    if (!requireDoc()) return;
    exportAsPdf();
  }, [requireDoc]);

  const handleShare = React.useCallback(() => {
    return buildShareUrl(content);
  }, [content]);

  const handleShareClick = React.useCallback(async () => {
    if (!requireDoc()) return;
    const url = handleShare();
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  }, [handleShare]);

  const handleClear = React.useCallback(() => {
    setContent("");
    setFilename("documento-sem-titulo.md");
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased selection:bg-primary/20 selection:text-primary-fixed font-body-preview">
      <Header
        dark={dark}
        onToggleTheme={() => setDark((d) => !d)}
        onExportPdf={handleExportPdf}
        onExportHtml={handleExportHtml}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex items-start gap-10">
        <Sidebar
          toc={toc}
          stats={stats}
          filename={filename}
          onFileSelected={handleFileSelected}
          onClear={handleClear}
          hasDoc={hasDoc}
          onShare={handleShareClick}
          shareCopied={shareCopied}
        />

        <article
          className={`flex-1 min-w-0 max-w-3xl mx-auto bg-surface pb-24 rounded-2xl transition-colors ${
            dragOver ? "ring-2 ring-primary bg-surface-container-low/40" : ""
          }`}
          ref={articleRef}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const file = e.dataTransfer.files && e.dataTransfer.files[0];
            if (file) handleFileSelected(file);
          }}
        >
          {/* Quick switch notice bar on mobile */}
          {hasDoc && (
          <div className="lg:hidden mb-6 p-3 rounded-xl border border-dashed border-outline-variant/50 bg-surface-container-lowest flex items-center justify-between text-[12px] no-print">
            <span className="text-on-surface-variant truncate">
              Lendo: <strong className="text-on-surface">{filename}</strong>
            </span>
            <label className="cursor-pointer text-primary hover:underline font-medium shrink-0 ml-3">
              Trocar arquivo
              <input
                accept=".md,.markdown"
                className="hidden"
                type="file"
                onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  if (file) handleFileSelected(file);
                  e.target.value = "";
                }}
              />
              </label>
          </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl border border-error/40 bg-error-container/30 text-error text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">error</span>
              {error}
            </div>
          )}

          {hasDoc ? (
            <MarkdownView content={content} />
          ) : (
            <div className="p-10 sm:p-16 rounded-2xl border border-dashed border-outline-variant/50 bg-surface-container-lowest/50 text-center">
              <span className="material-symbols-outlined text-outline text-[48px]">description</span>
              <p className="mt-4 text-on-surface-variant font-medium">Nenhum documento carregado</p>
              <p className="mt-1 text-[13px] text-outline">Arraste um arquivo .md para cá ou selecione abaixo</p>
              <label className="mt-6 inline-flex cursor-pointer items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-medium shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
                <span className="material-symbols-outlined text-[18px]">upload_file</span>
                Importar .MD
                <input
                  accept=".md,.markdown,.txt"
                  className="hidden"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    if (file) handleFileSelected(file);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>
          )}
        </article>
      </main>

      <Footer />

      <Toast message={toast} onClose={() => setToast(null)} />

      <FloatingBar onExportPdf={handleExportPdf} onExportHtml={handleExportHtml} />
    </div>
  );
}
