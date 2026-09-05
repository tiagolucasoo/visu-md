import React from "react";

export default function Toast({ message, onClose }) {
  React.useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] no-print animate-[toast-in_0.25s_ease-out]">
      <div className="always-dark flex items-center gap-2.5 pl-4 pr-3 py-2.5 rounded-xl bg-surface-container-high/95 backdrop-blur-md border border-outline-variant/50 shadow-2xl">
        <span className="material-symbols-outlined text-primary text-[20px]">info</span>
        <p className="text-[13px] text-on-surface font-medium max-w-[70vw] sm:max-w-sm">{message}</p>
        <button
          className="p-1 rounded-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors"
          onClick={onClose}
          title="Fechar"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
}
