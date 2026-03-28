import React from "react";
import { LuX } from "react-icons/lu";

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  subtitle,
  hideHeader,
  authMode,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4 md:p-6"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 z-0 bg-black/50 backdrop-blur-[2px] sm:backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={`relative z-10 flex w-full flex-col bg-white shadow-2xl sm:rounded-2xl rounded-t-[1.75rem] border border-gray-200/90 overflow-hidden min-h-0 min-w-0 mx-0 sm:mx-auto ${
          authMode
            ? "max-w-md max-h-[min(90dvh,720px)] sm:max-h-[min(85dvh,680px)]"
            : "max-w-lg max-h-[min(92dvh,820px)] sm:max-h-[min(88dvh,800px)]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {hideHeader ? (
          <>
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-20 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
              aria-label="Close"
            >
              <LuX className="w-5 h-5" />
            </button>
            <div
              className={`min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain custom-scrollbar px-4 py-5 sm:px-6 sm:py-6 pt-14 sm:pt-7 ${
                authMode ? "pb-6 sm:pb-8" : "sm:px-7 sm:py-8 sm:pt-8"
              }`}
            >
              {children}
            </div>
          </>
        ) : (
          <>
            <div className="shrink-0 border-b border-orange-100/80 bg-gradient-to-br from-amber-50 via-white to-orange-50/40 px-5 py-4 sm:px-6 sm:py-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 pr-8">
                  {title && (
                    <h2
                      id="modal-title"
                      className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight"
                    >
                      {title}
                    </h2>
                  )}
                  {subtitle && (
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {subtitle}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 rounded-full p-2 text-gray-500 hover:bg-white/80 hover:text-gray-900 border border-transparent hover:border-orange-200/60 transition-colors -mr-1"
                  aria-label="Close"
                >
                  <LuX className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-5 py-5 sm:px-6 sm:py-6 custom-scrollbar">
              {children}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
