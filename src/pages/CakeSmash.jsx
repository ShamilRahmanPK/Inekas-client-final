import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageLightbox from "../components/ImageLightbox";

// Scroll animation wrapper
function ScrollAnimatedContent({ children, delay = 0 }) {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) controls.start("visible");
    else controls.start("hidden");
  }, [isInView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

function CakeSmash() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1601296353626-5d251d18772a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHxDdXRlJTIwYmFieSUyMHdpdGglMjBjYWtlJTIwZm9yJTIwZmlyc3QlMjBiaXJ0aGRheSUyMGNha2UlMjBzbWFzaCUyMGJhYnklMjBjYWtlJTIwYmlydGhkYXklMjBjZWxlYnJhdGlvbnxlbnwwfDB8fHwxNzY2OTA0NTUzfDA&ixlib=rb-4.1.0&q=85", alt: "Girl with cake smash photo session - Rosario Fernandes on Unsplash" },
    { url: "https://images.pexels.com/photos/16322563/pexels-photo-16322563.jpeg", alt: "Cute baby enjoying messy cake smash - Diego Severino Castro Silva on Pexels" },
    { url: "https://images.pexels.com/photos/27811208/pexels-photo-27811208.jpeg", alt: "Baby experiencing cake smash making memories - Özge Sultan Temur on Pexels" },
    { url: "https://images.pexels.com/photos/961192/pexels-photo-961192.jpeg", alt: "Cute baby enjoying cake smash - Henley Design Studio on Pexels" },
    { url: "https://images.pexels.com/photos/28577582/pexels-photo-28577582.jpeg", alt: "Cute baby with colorful cake smash - Vastago Fotografia on Pexels" },
    { url: "https://images.pexels.com/photos/27811206/pexels-photo-27811206.jpeg", alt: "Cute baby in apron with birthday cake - Özge Sultan Temur on Pexels" },
  ];

  const faqs = [
    {
      question: "When should I schedule the Cake Smash session for first birthday photos?",
      answer: "We recommend doing the Cake Smash session when your baby just turned 11 months old so you can have the photos ready for their first birthday celebration. The usual turnaround time is 4 weeks after the session, ensuring you have beautiful photos to share at the birthday party."
    },
    {
      question: "What is included in a Cake Smash session?",
      answer: "A typical Cake Smash session includes themed decorations, props, backdrop setup, and professional lighting. You'll need to bring the cake (we recommend a small 6-inch smash cake), and we provide everything else to create a fun, colorful, and memorable experience. Sessions usually last about 1 hour, allowing time for both clean portraits and messy cake fun!"
    },
    {
      question: "Can I choose the theme and colors for the session?",
      answer: "Absolutely! We love working with you to create a custom setup that matches your vision. Whether you want a specific color scheme, theme (like animals, princesses, superheroes), or have seen inspiration photos you love, we can create a personalized backdrop and setup. Just let us know your preferences when booking."
    },
    {
      question: "Should I bring anything special for the session?",
      answer: "Please bring your baby's smash cake, and we recommend bringing an extra outfit for photos before the cake smashing begins. Also bring baby wipes, a change of clothes for after the session, and their favorite toy if it helps them feel comfortable. We provide all backdrops, props, and decorations. Some parents also like to bring a special outfit or party hat for their little one."
    }
  ];

  return (
    <div className="cake-smash-container overflow-x-hidden w-full bg-[#141414]">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative w-full pt-[80px] pb-16 md:pb-24 bg-gradient-to-b from-[#0a0a0a] via-[#141414] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <ScrollAnimatedContent delay={0.2}>
            <div className="inline-flex items-center gap-2 bg-[#E6C2A1]/10 border border-[#E6C2A1]/30 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <span className="text-[#E6C2A1] text-sm font-medium">Photography Service</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
              Cake Smash <span className="text-[#E6C2A1]">Photography</span>
            </h1>
          </ScrollAnimatedContent>

          <ScrollAnimatedContent delay={0.4}>
            <p className="text-lg sm:text-xl text-[#D6D1CE] max-w-3xl mb-8 leading-relaxed">
              At INEKAS, our best results come from true creative collaboration. Our collective differences make our work that much stronger, as we push each other to think bigger. We celebrate your baby's first birthday milestone with joy and messy fun!
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#E6C2A1] text-black font-semibold py-3.5 px-10 rounded-lg shadow-lg hover:bg-[#d4ac88] transition-all"
            >
              Book Cake Smash Session
            </motion.button>
          </ScrollAnimatedContent>
        </div>
      </div>

      {/* ARTWORK/GALLERY SECTION */}
      <div className="w-full bg-[#f5f5f5] py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <ScrollAnimatedContent>
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-[#2a2a2a] mb-4">
                Our Cake Smash Portfolio
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Fun, colorful, and unforgettable first birthday memories
              </p>
            </div>
          </ScrollAnimatedContent>

          {/* Scattered/Overlap Playful Style */}
          <div className="relative min-h-[800px] max-w-5xl mx-auto">
            {galleryImages.map((image, index) => {
              const positions = [
                { top: '0%', left: '5%', rotate: -5, zIndex: 1 },
                { top: '15%', left: '45%', rotate: 8, zIndex: 2 },
                { top: '35%', left: '15%', rotate: -3, zIndex: 3 },
                { top: '40%', left: '60%', rotate: 5, zIndex: 4 },
                { top: '65%', left: '10%', rotate: -8, zIndex: 5 },
                { top: '70%', left: '50%', rotate: 3, zIndex: 6 },
              ];
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: positions[index].rotate 
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: 0, 
                    zIndex: 10,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="absolute w-72 sm:w-80 cursor-pointer"
                  style={{
                    top: positions[index].top,
                    left: positions[index].left,
                    zIndex: positions[index].zIndex
                  }}
                  onClick={() => setLightboxIndex(index)}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white p-3 transform-gpu">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-56 sm:h-64 object-cover rounded-lg"
                    />
                    <div className="absolute inset-3 bg-gradient-to-t from-pink-400/60 via-yellow-200/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-4">
                      <p className="text-white text-sm font-bold drop-shadow-lg">🎂 Click to view larger!</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="w-full bg-[#141414] py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <ScrollAnimatedContent>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#E6C2A1] mb-12">
              Cake Smash Session
            </h2>
          </ScrollAnimatedContent>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <ScrollAnimatedContent key={index} delay={index * 0.1}>
                <div className="border border-gray-700 rounded-lg overflow-hidden bg-[#1a1a1a]">
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full flex justify-between items-center p-4 sm:p-6 text-left hover:bg-[#222222] transition-colors"
                  >
                    <span className="text-base sm:text-lg font-semibold text-[#E6C2A1] pr-4">
                      {faq.question}
                    </span>
                    <span className="text-[#E6C2A1] flex-shrink-0">
                      {activeFaq === index ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                    </span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: activeFaq === index ? "auto" : 0,
                      opacity: activeFaq === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-6 pt-0 text-sm sm:text-base text-[#D4D4D4] leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                </div>
              </ScrollAnimatedContent>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT FORM SECTION */}
      <div className="w-full bg-[#0f0f0f] py-12 sm:py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8">
          <ScrollAnimatedContent>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#E6C2A1] mb-4">
              We are here to answer all your questions and handle any queries you have
            </h2>
            <p className="text-center text-[#D4D4D4] mb-8">Get In Touch</p>
          </ScrollAnimatedContent>

          <ScrollAnimatedContent delay={0.2}>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Full Name *"
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E6C2A1] transition"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone *"
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E6C2A1] transition"
                  required
                />
              </div>

              <input
                type="email"
                placeholder="Email *"
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E6C2A1] transition"
                required
              />

              <input
                type="text"
                placeholder="Coupon Code"
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E6C2A1] transition"
              />

              <select
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E6C2A1] transition"
                required
                defaultValue="Cake Smash"
              >
                <option value="">What Type of Session Are You Interested In? *</option>
                <option value="Newborn">Newborn</option>
                <option value="Kids Photography">Kids Photography</option>
                <option value="Cake Smash">Cake Smash</option>
                <option value="Maternity">Maternity</option>
                <option value="Family Portrait">Family Portrait</option>
              </select>

              <textarea
                placeholder="Message"
                rows="5"
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#E6C2A1] transition resize-none"
              ></textarea>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#E6C2A1] text-black font-semibold py-3 px-8 rounded-lg hover:bg-[#d6ad8a] transition"
              >
                Submit
              </motion.button>
            </form>
          </ScrollAnimatedContent>
        </div>
      </div>

      <Footer />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <ImageLightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % galleryImages.length)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length)}
        />
      )}
    </div>
  );
}

export default CakeSmash;