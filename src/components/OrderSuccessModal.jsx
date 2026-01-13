import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, ShoppingBag, Sparkles } from "lucide-react";

export default function OrderSuccessModal({ isOpen, onClose, message, subMessage }) {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (isOpen) {
      // Generate confetti particles
      const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -20,
        rotation: Math.random() * 360,
        color: [
          "#E6C2A1",
          "#d4ac88",
          "#FFD700",
          "#FFA500",
          "#FF6B6B",
          "#4ECDC4",
        ][Math.floor(Math.random() * 6)],
        delay: Math.random() * 0.3,
        duration: 2 + Math.random() * 2,
      }));
      setConfetti(particles);

      // Auto close after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        >
          {/* Confetti Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {confetti.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{
                  x: `${particle.x}vw`,
                  y: "-20px",
                  rotate: 0,
                  opacity: 1,
                }}
                animate={{
                  y: "120vh",
                  rotate: particle.rotation + 720,
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: "easeInOut",
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{ backgroundColor: particle.color }}
              />
            ))}
          </div>

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
            className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2a2520] rounded-2xl shadow-2xl border-2 border-[#E6C2A1]/30 max-w-md w-full overflow-hidden"
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
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#E6C2A1]/20 rounded-full blur-3xl"
            />

            {/* Content */}
            <div className="relative p-8 text-center">
              {/* Success Icon with Animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 200,
                  delay: 0.2,
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
                    className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl"
                  />
                  
                  {/* Success Circle */}
                  <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl">
                    <CheckCircle className="w-14 h-14 text-white" strokeWidth={3} />
                  </div>

                  {/* Sparkle Effects */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        x: [0, Math.cos(i * 90 * Math.PI / 180) * 40],
                        y: [0, Math.sin(i * 90 * Math.PI / 180) * 40],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 0.5 + i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <Sparkles className="w-5 h-5 text-[#E6C2A1]" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold text-white mb-3">
                  {message || "Order Placed Successfully!"}
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  {subMessage || "Thank you for your order. We'll process it shortly!"}
                </p>

                {/* Decorative Shopping Bag Icon */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#E6C2A1]/10 rounded-full border border-[#E6C2A1]/30"
                >
                  <ShoppingBag className="w-5 h-5 text-[#E6C2A1]" />
                  <span className="text-sm text-[#E6C2A1] font-semibold">
                    Processing your order
                  </span>
                </motion.div>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 5, ease: "linear" }}
                className="mt-8 h-1 bg-gradient-to-r from-emerald-500 via-[#E6C2A1] to-emerald-500 rounded-full origin-left"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}