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

function Newborn() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1761891918492-371b950ee818?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxOZXdib3JuJTIwYmFieSUyMHNsZWVwaW5nJTIwcGVhY2VmdWxseSUyMHdyYXBwZWQlMjBpbiUyMGJsYW5rZXQlMjBiYWJ5JTIwbmV3Ym9ybiUyMGluZmFudCUyMHNsZWVwaW5nfGVufDB8MHx8fDE3NjY5MDQ1NTN8MA&ixlib=rb-4.1.0&q=85", alt: "Newborn baby sleeping wrapped in yellow blanket - Md Ishak Raman on Unsplash" },
    { url: "https://images.pexels.com/photos/34889325/pexels-photo-34889325.jpeg", alt: "Cute newborn sleeping peacefully in a cozy, starry bed setup - Foden Nguyen on Pexels" },
    { url: "https://images.pexels.com/photos/18099500/pexels-photo-18099500.jpeg", alt: "A newborn baby peacefully sleeps wrapped in a cozy blanket - Selin Hacıkerimoğlu on Pexels" },
    { url: "https://images.pexels.com/photos/15352276/pexels-photo-15352276.jpeg", alt: "Adorable newborn baby wrapped in a soft pink blanket - Laurie Ludes on Pexels" },
    { url: "https://images.pexels.com/photos/18671555/pexels-photo-18671555.jpeg", alt: "A serene portrait of a newborn baby sleeping - the Amritdev on Pexels" },
    { url: "https://images.pexels.com/photos/4101061/pexels-photo-4101061.jpeg", alt: "Adorable newborn baby sleeping peacefully - Pragyan Bezbaruah on Pexels" },
  ];

  const faqs = [
    {
      question: "When should I call to schedule my newborn session?",
      answer: "Before your baby is born! It is so important to plan ahead. Capturing your newborn within the first two weeks of life, while they are still sleepy and curled up, can make all the difference in your newborn portraits. My schedule fills up about four weeks in advance, so please call to schedule your newborn appointment before your baby is born. Since we never really know when your little one will arrive, we put you on our calendar to hold a spot for you. When your baby is born, we will move your appointment accordingly. If your baby comes early or if your baby is already born, don't panic! We always do our best to squeeze newborns into our schedule. Plus, older babies take beautiful portraits, too!"
    },
    {
      question: "Is one week old too early for my newborn session?",
      answer: "Absolutely not! Newborn babies photograph best between 4-10 days old. At this point, they are still very sleepy and like to curl up as if they were still in the womb. I take between 2 to 4 hours for a newborn session and leave plenty of time for feedings, diaper changes, and breaks for mommy and baby. Come as soon as you are ready, I can't wait to meet your new little one!"
    },
    {
      question: "How should I prepare for my newborn session?",
      answer: "We recommend that you bring baby to the session after an hour to two of keeping baby up and awake. This will ensure that your baby will be in a deep sleep when arriving at the studio or we arrive at your location. Sleepy babies photograph perfectly, so I will ask you to undress and swaddle your baby before the feeding so as to not disturb them by undressing them afterwards. If needed, we take several breaks for feeding your baby during the session to ensure that your baby is happy and has a full tummy. We ask that you not be too concerned with scheduled feedings during the session and that you feed your baby on demand (or when they get a bit fussy) to ensure their comfort and a smooth session. It is important that baby boys are photographed before performing a circumcision, otherwise he won't be comfortable during our session."
    },
    {
      question: "Can I be photographed with my baby?",
      answer: "Absolutely! We wouldn't have it any other way! I love capturing the emotion of those special first days with your new little one and I believe that there is no greater image than a new mommy or daddy cuddling and admiring their newborn. Mom's should wear naturally toned clothing such as brown, golden, gray, off-white, or cream. Soft pastels will work, too. Skin on skin images are also a unique way to capture the purity of these relationships."
    }
  ];

  return (
    <div className="newborn-container overflow-x-hidden w-full bg-[#141414]">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative w-full pt-[80px] pb-16 md:pb-24 bg-gradient-to-b from-[#0a0a0a] via-[#141414] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <ScrollAnimatedContent delay={0.2}>
            <div className="inline-flex items-center gap-2 bg-[#E6C2A1]/10 border border-[#E6C2A1]/30 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <span className="text-[#E6C2A1] text-sm font-medium">Photography Service</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
              Newborn <span className="text-[#E6C2A1]">Photography</span>
            </h1>
          </ScrollAnimatedContent>

          <ScrollAnimatedContent delay={0.4}>
            <p className="text-lg sm:text-xl text-[#D6D1CE] max-w-3xl mb-8 leading-relaxed">
              Newborn pictures are a long-standing tradition that brings family great pleasure. By making these photos easily accessible in digital form and beautiful albums, we hope to capture much of this joyful moments.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#E6C2A1] text-black font-semibold py-3.5 px-10 rounded-lg shadow-lg hover:bg-[#d4ac88] transition-all"
            >
              Book Newborn Session
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
                Our Newborn Portfolio
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Beautiful moments captured with care and creativity
              </p>
            </div>
          </ScrollAnimatedContent>

          {/* Masonry/Pinterest Style Layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((image, index) => (
              <ScrollAnimatedContent key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="relative overflow-hidden rounded-lg shadow-lg bg-white break-inside-avoid mb-6 cursor-pointer"
                  onClick={() => setLightboxIndex(index)}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full object-cover"
                    style={{ height: index % 3 === 0 ? '320px' : index % 3 === 1 ? '280px' : '360px' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-light">Click to view larger</p>
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
              Newborn Session
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
                defaultValue="Newborn"
              >
                <option value="">What Type of Session Are You Interested In? *</option>
                <option value="Newborn">Newborn</option>
                <option value="Cake Smash">Cake Smash</option>
                <option value="Maternity">Maternity</option>
                <option value="Profile Photo">Profile Photo</option>
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

export default Newborn;