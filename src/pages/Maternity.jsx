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

function Maternity() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const galleryImages = [
    { url: "https://images.pexels.com/photos/12676577/pexels-photo-12676577.jpeg", alt: "Beautiful maternity photoshoot of pregnant woman - Mario Mota on Pexels" },
    { url: "https://images.pexels.com/photos/4012430/pexels-photo-4012430.jpeg", alt: "Beautiful elegant maternity shoot in park setting - Marito Ayala on Pexels" },
    { url: "https://images.pexels.com/photos/9534290/pexels-photo-9534290.jpeg", alt: "Graceful maternity photoshoot in studio - Анастасия Триббиани on Pexels" },
    { url: "https://images.pexels.com/photos/30746926/pexels-photo-30746926.jpeg", alt: "Serene maternity photo shoot in forest setting - VICO ORTIZO on Pexels" },
    { url: "https://images.pexels.com/photos/7085761/pexels-photo-7085761.jpeg", alt: "Captivating studio maternity shoot on floral swing - JEFERSON GOMES on Pexels" },
    { url: "https://images.pexels.com/photos/13520720/pexels-photo-13520720.jpeg", alt: "Serene outdoor maternity photoshoot - Adrian Calle on Pexels" },
  ];

  const faqs = [
    {
      question: "When should I call to schedule my Maternity Photo session?",
      answer: "Try and schedule your maternity photo session in your seventh or eighth month of pregnancy. Your belly will have a nice round shape during this time frame, perfect for taking photographs. If you're counting by weeks, schedule your session when you're around 30 weeks pregnant."
    },
    {
      question: "What should I wear for my maternity session?",
      answer: "We recommend form-fitting clothing that showcases your beautiful baby bump. Flowing gowns, fitted dresses, and draped fabrics photograph beautifully. Naturally toned clothing such as brown, golden, gray, off-white, or cream work wonderfully. Soft pastels are also lovely choices. We have a selection of maternity gowns available at the studio if you'd like to use them."
    },
    {
      question: "Can my partner and/or other children be included?",
      answer: "Absolutely! We love capturing the excitement and anticipation of the whole family welcoming the new baby. Including your partner and children creates beautiful, meaningful images that you'll treasure forever. We recommend coordinating outfits in complementary colors for a cohesive look."
    },
    {
      question: "Should I do outdoor or studio maternity photos?",
      answer: "Both options create stunning maternity portraits! Outdoor sessions offer natural lighting and beautiful scenery, while studio sessions provide controlled lighting and privacy. We can also combine both for variety. Consider the weather, your comfort level, and the style you prefer when making your decision. We're happy to discuss the best option for your vision."
    }
  ];

  return (
    <div className="maternity-container overflow-x-hidden w-full bg-[#141414]">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative w-full pt-[80px] pb-16 md:pb-24 bg-gradient-to-b from-[#0a0a0a] via-[#141414] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <ScrollAnimatedContent delay={0.2}>
            <div className="inline-flex items-center gap-2 bg-[#E6C2A1]/10 border border-[#E6C2A1]/30 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <span className="text-[#E6C2A1] text-sm font-medium">Photography Service</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
              Maternity <span className="text-[#E6C2A1]">Photography</span>
            </h1>
          </ScrollAnimatedContent>

          <ScrollAnimatedContent delay={0.4}>
            <p className="text-lg sm:text-xl text-[#D6D1CE] max-w-3xl mb-8 leading-relaxed">
              At INEKAS, our best results come from true creative collaboration. Our collective differences make our work that much stronger, as we push each other to think bigger. We celebrate the beauty and journey of motherhood.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#E6C2A1] text-black font-semibold py-3.5 px-10 rounded-lg shadow-lg hover:bg-[#d4ac88] transition-all"
            >
              Book Maternity Session
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
                Our Maternity Portfolio
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Celebrating the beautiful journey of motherhood
              </p>
            </div>
          </ScrollAnimatedContent>

          {/* Zigzag/Alternating Layout */}
          <div className="space-y-12">
            {galleryImages.map((image, index) => (
              <ScrollAnimatedContent key={index} delay={index * 0.15}>
                <motion.div
                  whileHover={{ x: index % 2 === 0 ? 10 : -10 }}
                  transition={{ duration: 0.4 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-center`}
                >
                  <div className="w-full md:w-2/3 relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer" onClick={() => setLightboxIndex(index)}>
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-80 sm:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#E6C2A1]/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className={`w-full md:w-1/3 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="w-12 h-1 bg-[#E6C2A1] mb-4"></div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">Maternity Beauty</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Celebrating the beautiful journey of motherhood. Click image to view larger.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </ScrollAnimatedContent>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="w-full bg-[#141414] py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <ScrollAnimatedContent>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#E6C2A1] mb-12">
              Maternity Session
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
                defaultValue="Maternity"
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

export default Maternity;