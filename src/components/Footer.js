import React from "react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="w-full border-t border-surface-container-highest/60 bg-surface-container-lowest/40 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-28 sm:pb-5 flex flex-row items-center justify-between gap-3">
        <a
          href="https://tiagolucas.tech"
          target="_blank"
          rel="noopener noreferrer"
          title="tiagolucas.tech"
          className="focus:outline-none"
        >
          <Logo />
        </a>
        <p className="text-[11px] font-meta-stat text-outline text-right">
          Visu-Md Document Viewer Engine
        </p>
      </div>
    </footer>
  );
}
