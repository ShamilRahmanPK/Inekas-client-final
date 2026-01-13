import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { FiChevronDown, FiChevronUp, FiChevronLeft, FiChevronRight } from "react-icons/fi";
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

function FamilySession() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const scrollRef = useRef(null);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const scrollWidth = scrollRef.current.scrollWidth;
        const clientWidth = scrollRef.current.clientWidth;
        const currentScroll = scrollRef.current.scrollLeft;
        
        if (currentScroll + clientWidth >= scrollWidth - 10) {
          // Reset to beginning
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll to next
          scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
      }
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1764816651356-66425a51673d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxIYXBweSUyMGZhbWlseSUyMHdpdGglMjBjaGlsZHJlbiUyMHBvcnRyYWl0JTIwZmFtaWx5JTIwY2hpbGRyZW4lMjBwYXJlbnRzfGVufDB8MXx8fDE3NjY5MDQ1NTN8MA&ixlib=rb-4.1.0&q=85", alt: "Happy family with young child smiles - Hoi An Photographer on Unsplash" },
    { url: "https://images.unsplash.com/photo-1764816658714-148e01f3fa4e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxIYXBweSUyMGZhbWlseSUyMHdpdGglMjBjaGlsZHJlbiUyMHBvcnRyYWl0JTIwZmFtaWx5JTIwY2hpbGRyZW4lMjBwYXJlbnRzfGVufDB8MXx8fDE3NjY5MDQ1NTN8MA&ixlib=rb-4.1.0&q=85", alt: "Happy family posing for portrait outdoors - Hoi An Photographer on Unsplash" },
    { url: "https://images.unsplash.com/photo-1763013259279-3195d6330519?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxNXx8SGFwcHklMjBmYW1pbHklMjB3aXRoJTIwY2hpbGRyZW4lMjBwb3J0cmFpdCUyMGZhbWlseSUyMGNoaWxkcmVuJTIwcGFyZW50c3xlbnwwfDF8fHwxNzY2OTA0NTUzfDA&ixlib=rb-4.1.0&q=85", alt: "Happy family with two young children - Brooke Balentine on Unsplash" },
    { url: "https://images.unsplash.com/photo-1763013259097-ed4d8f95504f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxN3x8SGFwcHklMjBmYW1pbHklMjB3aXRoJTIwY2hpbGRyZW4lMjBwb3J0cmFpdCUyMGZhbWlseSUyMGNoaWxkcmVuJTIwcGFyZW50c3xlbnwwfDF8fHwxNzY2OTA0NTUzfDA&ixlib=rb-4.1.0&q=85", alt: "Happy family of four with young children - Brooke Balentine on Unsplash" },
    { url: "https://images.unsplash.com/photo-1760633549227-901e0c3cf9d3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyMHx8SGFwcHklMjBmYW1pbHklMjB3aXRoJTIwY2hpbGRyZW4lMjBwb3J0cmFpdCUyMGZhbWlseSUyMGNoaWxkcmVuJTIwcGFyZW50c3xlbnwwfDF8fHwxNzY2OTA0NTUzfDA&ixlib=rb-4.1.0&q=85", alt: "Family with two young children outdoors at sunset - Mushvig Niftaliyev on Unsplash" },
    { url: "https://images.pexels.com/photos/19510862/pexels-photo-19510862.jpeg", alt: "Happy family portrait by the lake - Danik Prihodko on Pexels" },
  ];

  const faqs = [
    {
      question: "When should I call to schedule my Family Portrait session?",
      answer: "Any time you are most welcome! Family portraits are perfect for any occasion - whether it's a special milestone, holiday season, or just because you want to capture your family's love and connection. We recommend booking at least 2-3 weeks in advance to ensure your preferred date and time."
    },
    {
      question: "What should we wear for the family portrait?",
      answer: "We recommend coordinating outfits rather than matching exactly. Choose a color palette of 2-3 complementary colors and mix patterns with solids. Natural tones like browns, creams, and soft pastels photograph beautifully. Most importantly, everyone should feel comfortable and confident in what they're wearing."
    },
    {
      question: "How long does a family session take?",
      answer: "A typical family portrait session lasts 1-2 hours. This allows time for everyone to relax, try different groupings and poses, and take breaks as needed, especially with young children. We work at a comfortable pace to ensure natural, authentic moments are captured."
    },
    {
      question: "Can we include extended family members and pets?",
      answer: "Absolutely! We love including extended family members - grandparents, aunts, uncles, cousins - and even your furry family members. The more the merrier! Just let us know in advance so we can plan the session accordingly and ensure we have enough time to capture all the special combinations."
    }
  ];

  return (
    <div className="family-session-container overflow-x-hidden w-full bg-[#141414]">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative w-full pt-[80px] pb-16 md:pb-24 bg-gradient-to-b from-[#0a0a0a] via-[#141414] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <ScrollAnimatedContent delay={0.2}>
            <div className="inline-flex items-center gap-2 bg-[#E6C2A1]/10 border border-[#E6C2A1]/30 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <span className="text-[#E6C2A1] text-sm font-medium">Photography Service</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
              Family <span className="text-[#E6C2A1]">Photography</span>
            </h1>
          </ScrollAnimatedContent>

          <ScrollAnimatedContent delay={0.4}>
            <p className="text-lg sm:text-xl text-[#D6D1CE] max-w-3xl mb-8 leading-relaxed">
              At INEKAS, our best results come from true creative collaboration. Our collective differences make our work that much stronger, as we push each other to think bigger. We capture the love, laughter, and connection that makes your family unique.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#E6C2A1] text-black font-semibold py-3.5 px-10 rounded-lg shadow-lg hover:bg-[#d4ac88] transition-all"
            >
              Book Family Session
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
                Our Family Portfolio
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Capturing the love and connection that makes your family special
              </p>
            </div>
          </ScrollAnimatedContent>

          {/* Horizontal Scrolling Carousel */}
          <div className="relative">
            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex-shrink-0 w-80 sm:w-96 snap-center cursor-pointer"
                  onClick={() => setLightboxIndex(index)}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden rounded-2xl shadow-2xl bg-white h-96"
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div>
                        <p className="text-white text-lg font-semibold mb-1">Click to view larger</p>
                        <p className="text-gray-200 text-sm">Beautiful family memories</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                }
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#E6C2A1] hover:bg-[#d6ad8a] text-black p-3 rounded-full shadow-lg transition z-10"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                }
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[#E6C2A1] hover:bg-[#d6ad8a] text-black p-3 rounded-full shadow-lg transition z-10"
            >
              <FiChevronRight size={24} />
            </button>
          </div>

          <style jsx>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="w-full bg-[#141414] py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <ScrollAnimatedContent>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#E6C2A1] mb-12">
              Family Portrait Session
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
                defaultValue="Family Portrait"
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

export default FamilySession;