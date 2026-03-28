import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuSparkles, LuX } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

const markdownStyles =
  "text-[15px] text-gray-700 leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_strong]:font-semibold [&_code]:text-[13px] [&_code]:bg-orange-50/80 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:font-mono";

const ExplanationPanel = ({ open, title, body, onClose }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-gray-900/45 backdrop-blur-[3px]"
            onClick={onClose}
          />
          <motion.aside
            initial={
              isDesktop
                ? { x: "100%", opacity: 0.98 }
                : { y: "100%", opacity: 0.98 }
            }
            animate={isDesktop ? { x: 0, opacity: 1 } : { y: 0, opacity: 1 }}
            exit={
              isDesktop
                ? { x: "100%", opacity: 0.98 }
                : { y: "100%", opacity: 0.98 }
            }
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="fixed z-50 flex flex-col bg-white shadow-2xl max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:top-auto max-md:max-h-[min(88dvh,640px)] max-md:w-full max-md:rounded-t-[1.5rem] max-md:border-t max-md:border-gray-200/90 md:top-0 md:right-0 md:h-full md:w-full md:max-w-[420px] md:rounded-l-3xl md:border-l md:border-gray-200/80"
          >
            <div className="shrink-0 relative overflow-hidden rounded-t-[inherit] md:rounded-none md:rounded-tl-3xl border-b border-orange-100/90 bg-gradient-to-br from-amber-50 via-white to-orange-50/50 px-5 pt-5 pb-4 md:px-6 md:pt-6 md:pb-5">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full bg-gray-300/80 md:hidden" />
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 pr-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-600 flex items-center gap-2">
                    <LuSparkles className="w-3.5 h-3.5 shrink-0" />
                    Deeper dive
                  </p>
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900 mt-2 leading-snug">
                    {title || "Explanation"}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 rounded-xl p-2.5 text-gray-500 hover:bg-white/90 hover:text-gray-900 border border-transparent hover:border-orange-200/60 transition-colors"
                  aria-label="Close"
                >
                  <LuX className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain custom-scrollbar px-5 py-5 pb-8 md:px-6 md:py-6 md:pb-8">
              <div className={markdownStyles}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {body || ""}
                </ReactMarkdown>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExplanationPanel;
