import React from "react";

const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      {/* Modal Box */}
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full p-2 hover:bg-gray-100"
        >
          ✕
        </button>

        {/* Body (ONLY vertical scroll here) */}
        <div className="max-h-[85vh] overflow-y-auto overflow-x-auto px-6 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
