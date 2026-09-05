import React from "react";

export default function FloatingBar({ onExportPdf, onExportHtml }) {
  return (
    <aside
      aria-label="Ações rápidas de exportação"
      className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 p-1.5 rounded-full bg-surface-container-high/95 backdrop-blur-md shadow-2xl border border-outline-variant/40"
    >
      <button
        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-medium shadow transition-all hover:scale-105 active:scale-95"
        onClick={onExportPdf}
        title="Exportar como PDF"
        type="button"
      >
        <span className="material-symbols-outlined text-[18px]">print</span>
        <span className="hidden sm:inline">Imprimir / PDF</span>
      </button>
      <button
        className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-full hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors"
        onClick={onExportHtml}
        title="Exportar como HTML"
        type="button"
      >
        <span className="material-symbols-outlined text-[18px] text-tertiary">code</span>
        <span className="hidden sm:inline">HTML</span>
      </button>
      <div className="h-4 w-px bg-outline-variant/40 mx-1 hidden sm:block" />
      <button
        className="p-2 rounded-full hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Voltar ao topo"
        type="button"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
      </button>
    </aside>
  );
}
