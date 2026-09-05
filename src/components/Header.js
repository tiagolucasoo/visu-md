import React from "react";

function Logo() {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/logo.png`}
      alt="Visu-Md"
      className="h-11 w-auto"
      draggable="false"
    />
  );
}

export default function Header({ dark, onToggleTheme, onExportPdf, onExportHtml }) {
  return (
    <header className="always-dark sticky top-0 z-50 w-full h-16 bg-surface border-b border-surface-container-highest/60 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center min-w-0">
          <div
            className="shrink-0 flex items-center hover:scale-105 transition-transform"
            title="Visu-Md"
          >
            <Logo />
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md font-medium shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] hidden md:inline-flex"
            onClick={onExportPdf}
            title="Exportar como PDF"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            <span>Exportar PDF</span>
          </button>
          <button
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high border border-outline-variant/40 font-label-md text-label-md font-medium transition-all"
            onClick={onExportHtml}
            title="Exportar como HTML"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-tertiary">code</span>
            <span>Exportar HTML</span>
          </button>
          <button
            className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            onClick={onToggleTheme}
            title="Alternar Modo Claro/Escuro"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">{dark ? "light_mode" : "dark_mode"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
