import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronDown, LuPin, LuSparkles } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const mdStyles =
  "text-[15px] text-gray-700 leading-relaxed [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_strong]:font-semibold [&_code]:text-[13px] [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md";

const QuestionCard = ({
  item,
  index,
  onTogglePin,
  onExplain,
  isExplaining,
  onNoteChange,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.04 }}
      className={`rounded-2xl border bg-white overflow-hidden transition-shadow ${
        item.isPinned
          ? "border-amber-300/90 shadow-md shadow-amber-100/40 ring-1 ring-amber-100/80"
          : "border-gray-200/90 shadow-sm hover:shadow-md hover:border-gray-300/80"
      }`}
    >
      <div className="p-4 md:p-6">
        <div className="flex items-start gap-3 md:gap-4">
          <button
            type="button"
            onClick={() => onTogglePin(item)}
            className={`mt-0.5 p-2.5 rounded-xl shrink-0 transition-all ${
              item.isPinned
                ? "bg-amber-100 text-amber-800 shadow-sm"
                : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            }`}
            title={item.isPinned ? "Unpin" : "Pin to top"}
          >
            <LuPin className="w-4 h-4" />
          </button>
          <div className="flex-1 min-w-0">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="flex w-full text-left gap-3 items-start justify-between group"
            >
              <h3 className="text-[15px] md:text-base font-semibold text-gray-900 leading-snug pr-2">
                {item.question}
              </h3>
              <LuChevronDown
                className={`w-5 h-5 shrink-0 text-gray-400 transition-transform duration-200 mt-0.5 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <div
                    className={`mt-5 pt-5 border-t border-dashed border-gray-200/90 ${mdStyles}`}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {item.answer || "_No answer yet._"}
                    </ReactMarkdown>
                  </div>
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() => onExplain(item)}
                      disabled={isExplaining}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF9324] to-[#e99a4b] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 hover:brightness-105 disabled:opacity-55 disabled:cursor-not-allowed transition-all"
                    >
                      <LuSparkles className="w-4 h-4" />
                      {isExplaining ? "Preparing…" : "Deeper dive"}
                    </button>
                  </div>
                  <label className="block mt-5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      Your note
                    </span>
                    <textarea
                      value={item.note ?? ""}
                      onChange={(e) => onNoteChange(item._id, e.target.value)}
                      placeholder="Jot down reminders, talking points, or follow-ups…"
                      rows={3}
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-[#fafafa] px-3.5 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100/80 resize-y min-h-[88px]"
                    />
                  </label>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default QuestionCard;
