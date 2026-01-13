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

function KidsPhotography() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const galleryImages = [
    { url: "https://images.pexels.com/photos/929436/pexels-photo-929436.jpeg", alt: "Charming baby boy in bright attire seated with camera - Alexey Makhinko on Pexels" },
    { url: "https://images.pexels.com/photos/6349546/pexels-photo-6349546.jpeg", alt: "Charming toddler in stylish outfit sitting on modern chair - olia danilevich on Pexels" },
    { url: "https://images.pexels.com/photos/1619811/pexels-photo-1619811.jpeg", alt: "Young boy in trendy clothing poses on wooden chair - Vika Glitter on Pexels" },
    { url: "https://images.pexels.com/photos/3155328/pexels-photo-3155328.jpeg", alt: "Classic photo of father and daughter with teddy bear - Suzy Hazelwood on Pexels" },
    { url: "https://images.pexels.com/photos/6800568/pexels-photo-6800568.jpeg", alt: "Charming young boy in devil costume - Ksenia Chernaya on Pexels" },
    { url: "https://images.pexels.com/photos/774091/pexels-photo-774091.jpeg", alt: "Charming studio portrait of young girl - Janko Ferlic on Pexels" },
  ];

  const faqs = [
    {
      question: "What age range is suitable for kids photography?",
      answer: "Our kids photography sessions are perfect for children of all ages, from toddlers to pre-teens. We specialize in capturing the unique personality and energy of each child, whether they're shy and reserved or full of boundless energy. Each session is tailored to suit your child's age, interests, and comfort level."
    },
    {
      question: "How long does a kids photography session take?",
      answer: "A typical kids photography session lasts between 1 to 2 hours. This allows plenty of time for your child to warm up to the camera, try different poses and outfits, and take breaks as needed. We work at your child's pace to ensure they're comfortable and having fun throughout the session."
    },
    {
      question: "What should my child wear for the photoshoot?",
      answer: "We recommend choosing outfits that reflect your child's personality and make them feel comfortable. Solid colors and simple patterns work best for timeless portraits. Bring a few outfit options so we can create variety in the photos. Avoid clothing with large logos or busy patterns that might distract from your child's beautiful face."
    },
    {
      question: "How do you keep children engaged during the session?",
      answer: "We use a variety of techniques to keep children engaged and natural in front of the camera. This includes interactive games, props, toys, and fun activities that bring out genuine smiles and expressions. Our photographers are experienced in working with children and know how to create a relaxed, playful atmosphere that results in authentic, joyful images."
    }
  ];

  return (
    <div className="kids-photography-container overflow-x-hidden w-full bg-[#141414]">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative w-full pt-[80px] pb-16 md:pb-24 bg-gradient-to-b from-[#0a0a0a] via-[#141414] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <ScrollAnimatedContent delay={0.2}>
            <div className="inline-flex items-center gap-2 bg-[#E6C2A1]/10 border border-[#E6C2A1]/30 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <span className="text-[#E6C2A1] text-sm font-medium">Photography Service</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
              Kids <span className="text-[#E6C2A1]">Photography</span>
            </h1>
          </ScrollAnimatedContent>

          <ScrollAnimatedContent delay={0.4}>
            <p className="text-lg sm:text-xl text-[#D6D1CE] max-w-3xl mb-8 leading-relaxed">
              At INEKAS, our best results come from true creative collaboration. Our collective differences make our work that much stronger, as we push each other to think bigger. We capture the wonder, joy, and unique personality of every child.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#E6C2A1] text-black font-semibold py-3.5 px-10 rounded-lg shadow-lg hover:bg-[#d4ac88] transition-all"
            >
              Book Kids Session
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
                Our Kids Portfolio
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Capturing childhood wonder and personality in every frame
              </p>
            </div>
          </ScrollAnimatedContent>

          {/* Staggered Grid with Varying Heights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <ScrollAnimatedContent key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                  transition={{ duration: 0.3 }}
                  className={`relative overflow-hidden rounded-lg shadow-lg bg-white cursor-pointer ${
                    index === 0 || index === 3 ? 'col-span-2 row-span-2' : 
                    index === 1 || index === 4 ? 'col-span-1 row-span-1' : 
                    'col-span-1 row-span-2'
                  }`}
                  onClick={() => setLightboxIndex(index)}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    style={{ minHeight: index === 0 || index === 3 ? '400px' : '200px' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#E6C2A1]/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-semibold">Click to view larger</p>
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
              Kids Photography Session
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
                defaultValue="Kids Photography"
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

export default KidsPhotography;