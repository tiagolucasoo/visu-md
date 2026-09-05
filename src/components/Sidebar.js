import React from "react";
import { formatLabel } from "../utils";

export default function Sidebar({ toc, stats, filename, onFileSelected, onClear, hasDoc, onShare, shareCopied }) {
  const [dragOver, setDragOver] = React.useState(false);
  const dropInputRef = React.useRef(null);

  const pickFile = () => dropInputRef.current && dropInputRef.current.click();

  const handleChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) onFileSelected(file);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) onFileSelected(file);
  };

  return (
    <aside className="hidden lg:block w-64 shrink-0 sticky top-24 space-y-6">
      {hasDoc && (
      <div className="space-y-1.5">
      <div
        className={`flex items-center gap-3 px-3 py-3 rounded-xl border border-dashed transition-all cursor-pointer group ${
          dragOver
            ? "border-primary bg-surface-container"
            : "border-outline-variant/60 hover:border-primary/80 bg-surface-container-lowest/50 hover:bg-surface-container-low/60"
        }`}
        id="drop-zone"
        onClick={pickFile}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input accept=".md,.markdown" className="hidden" type="file" onChange={handleChange} ref={dropInputRef} />
        <div className="w-9 h-9 shrink-0 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-[20px]">sync</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-medium text-on-surface group-hover:text-primary transition-colors truncate">
            Trocar arquivo .MD
          </p>
          <p className="text-[11px] text-outline mt-0.5">Arraste ou clique para selecionar</p>
        </div>
      </div>
      <button
        className="w-full inline-flex items-center gap-3 px-3 py-2.5 rounded-xl border border-outline-variant/40 text-[12px] font-medium text-on-surface-variant hover:text-error hover:border-error/60 hover:bg-error/10 transition-colors"
        onClick={onClear}
        title="Limpar documento"
        type="button"
      >
        <span className="w-9 h-9 shrink-0 rounded-lg bg-surface-container flex items-center justify-center">
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </span>
        Limpar
      </button>
      </div>
      )}

      <nav aria-label="Índice do documento" className="p-4 rounded-2xl bg-surface-container-low/40 border border-outline-variant/20">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-container-highest/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-outline font-meta-stat">Sumário</span>
          <span className="material-symbols-outlined text-outline text-[16px]">menu_book</span>
        </div>
        {toc.length === 0 ? (
          <p className="text-[12px] text-outline">Nenhum título encontrado no documento.</p>
        ) : (
          <ul className="space-y-1 text-label-sm text-[13px]">
            {toc.map((item, i) => (
              <li key={`${item.id}-${i}`} className={item.level === 3 ? "pl-3" : ""}>
                <a
                  className={`block py-1.5 px-2 rounded-md truncate transition-colors ${
                    item.level === 1
                      ? "py-1 px-2 text-[12px] text-outline hover:text-on-surface"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  }`}
                  href={`#${item.id}`}
                >
                  {item.level === 3 ? `↳ ${item.text}` : item.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <div className="p-4 rounded-2xl bg-surface-container-low/30 border border-outline-variant/20">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-container-highest/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-outline font-meta-stat">Detalhes</span>
          <span className="material-symbols-outlined text-outline text-[16px]">bar_chart</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="px-1 py-2 rounded-lg bg-surface-container-lowest/60">
            <p className="text-[15px] font-bold text-on-surface font-meta-stat leading-tight">{stats.words.toLocaleString("pt-BR")}</p>
            <p className="text-[10px] uppercase tracking-wide text-outline mt-0.5">Palavras</p>
          </div>
          <div className="px-1 py-2 rounded-lg bg-surface-container-lowest/60">
            <p className="text-[15px] font-bold text-on-surface font-meta-stat leading-tight">{stats.lines.toLocaleString("pt-BR")}</p>
            <p className="text-[10px] uppercase tracking-wide text-outline mt-0.5">Linhas</p>
          </div>
          <div className="px-1 py-2 rounded-lg bg-surface-container-lowest/60">
            <p className="text-[15px] font-bold text-on-surface font-meta-stat leading-tight">~{stats.minutes}<span className="text-[10px] font-medium"> min</span></p>
            <p className="text-[10px] uppercase tracking-wide text-outline mt-0.5">Leitura</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-surface-container-highest/60 text-[11px] font-meta-stat space-y-1.5">
        {hasDoc && (
        <div className="flex items-center justify-between gap-2">
          <span className="text-outline shrink-0">Arquivo</span>
          <span className="text-on-surface font-semibold truncate font-code-inline" title={filename}>{filename}</span>
        </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <span className="text-outline">Formato</span>
          <span className="text-primary font-semibold">{formatLabel(filename)}</span>
        </div>
        {hasDoc && (
        <div className="flex items-center justify-between mt-1.5 text-[11px] font-meta-stat">
          <span className="text-outline">Compartilhar</span>
          <button
            className="inline-flex items-center gap-1 text-primary hover:underline font-semibold transition-colors"
            onClick={onShare}
            title="Copiar link de compartilhamento"
            type="button"
          >
            <span className={`material-symbols-outlined text-[14px] ${shareCopied ? "text-tertiary" : ""}`}>
              {shareCopied ? "check" : "link"}
            </span>
            {shareCopied ? "Link copiado!" : "Copiar link"}
          </button>
        </div>
        )}
        </div>
      </div>
    </aside>
  );
}
