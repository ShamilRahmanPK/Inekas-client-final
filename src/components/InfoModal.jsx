import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X, Info } from "lucide-react";

export default function InfoModal({ isOpen, onClose, message, type = "info" }) {
  const getIcon = () => {
    if (type === "warning" || type === "error") {
      return <AlertCircle className="w-12 h-12 text-amber-500" strokeWidth={2.5} />;
    }
    return <Info className="w-12 h-12 text-blue-500" strokeWidth={2.5} />;
  };

  const getColors = () => {
    if (type === "warning" || type === "error") {
      return {
        iconBg: "from-amber-500/20 to-amber-600/20",
        glow: "bg-amber-500/20",
        border: "border-amber-500/30",
      };
    }
    return {
      iconBg: "from-blue-500/20 to-blue-600/20",
      glow: "bg-blue-500/20",
      border: "border-blue-500/30",
    };
  };

  const colors = getColors();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          onClick={onClose}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
            }}
            onClick={(e) => e.stopPropagation()}
            className={`relative bg-gradient-to-br from-[#1a1a1a] to-[#2a2520] rounded-2xl shadow-2xl border-2 ${colors.border} max-w-md w-full overflow-hidden`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Animated Background Glow */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 ${colors.glow} rounded-full blur-3xl`}
            />

            {/* Content */}
            <div className="relative p-8 text-center">
              {/* Icon with Animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 200,
                }}
                className="mb-6 flex justify-center"
              >
                <div className="relative">
                  {/* Pulsing Ring */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.2, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`absolute inset-0 ${colors.glow} rounded-full blur-xl`}
                  />
                  
                  {/* Icon Circle */}
                  <div className={`relative w-20 h-20 bg-gradient-to-br ${colors.iconBg} rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm border ${colors.border}`}>
                    {getIcon()}
                  </div>
                </div>
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-white text-lg mb-6">
                  {message}
                </p>

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-6 py-3 bg-gradient-to-r from-[#E6C2A1] to-[#d4ac88] hover:from-[#d4ac88] hover:to-[#E6C2A1] text-black rounded-lg font-semibold transition-all shadow-lg"
                >
                  Got it
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}