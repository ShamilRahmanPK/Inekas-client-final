import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
} from "framer-motion";
import {
  FiChevronDown,
  FiChevronUp,
  FiPhoneCall,
  FiMail,
  FiCamera,
  FiHeart,
  FiStar,
  FiCheck,
} from "react-icons/fi";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

// Import existing images
import home_image from "../assets/home-image.jpg";
import weddingImg from "../assets/4x4-prev.jpg";
import birthdayImg from "../assets/4x4-prev.jpg";
import outdoorImg from "../assets/4x4-prev.jpg";
import productImg from "../assets/4x4-prev.jpg";
import defaultImg from "../assets/4x4-prev.jpg";
import { Link, useNavigate } from "react-router";

const galleryImages = [
  weddingImg,
  birthdayImg,
  outdoorImg,
  productImg,
  defaultImg,
];

// Scroll animation wrapper
function ScrollAnimatedContent({ children, delay = 0 }) {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay } },
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

function Home() {
  const navigate = useNavigate();
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      title: "Newborn Photography",
      shortTitle: "Newborn",
      description:
        "Capture the precious first moments with gentle, safe, and creative newborn photography sessions.",
      image:
        "https://images.pexels.com/photos/9252838/pexels-photo-9252838.jpeg",
      price: "From $299",
      features: ["Safe & Gentle", "Studio Props", "Digital Gallery"],
      path: "/newborn",
    },
    {
      title: "Maternity Sessions",
      shortTitle: "Maternity",
      description:
        "Celebrate the beauty of motherhood with elegant maternity portraits in stunning natural settings.",
      image:
        "https://images.pexels.com/photos/2994029/pexels-photo-2994029.jpeg",
      price: "From $249",
      features: ["Outdoor/Studio", "Wardrobe Options", "Partner Shots"],
      path: "/maternity",
    },
    {
      title: "Cake Smash",
      shortTitle: "Cake Smash",
      description:
        "Make their first birthday unforgettable with fun, colorful cake smash photography sessions.",
      image:
        "https://images.pexels.com/photos/14197884/pexels-photo-14197884.jpeg",
      price: "From $199",
      features: ["Custom Setup", "Fun Themes", "Cleanup Included"],
      path: "/cake-smash",
    },
    {
      title: "Family Portraits",
      shortTitle: "Family",
      description:
        "Preserve your family's bond with beautifully composed portraits perfect for any occasion.",
      image:
        "https://images.pexels.com/photos/5416619/pexels-photo-5416619.jpeg",
      price: "From $279",
      features: ["All Ages Welcome", "Location Choice", "Print Packages"],
      path: "/family-session",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "New Mother",
      text: "The newborn session was absolutely magical! So gentle with our baby and captured the most beautiful moments we'll treasure forever.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    {
      name: "Emily Rodriguez",
      role: "Expecting Mother",
      text: "My maternity photos are stunning! The photographer made me feel so comfortable and beautiful. Highly recommend!",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=emily",
    },
    {
      name: "Michael Chen",
      role: "Proud Father",
      text: "Our family portraits perfectly captured our personalities. Professional, creative, and worth every penny!",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?u=michael",
    },
  ];

  const stats = [
    { number: "500+", label: "Happy Families" },
    { number: "5+", label: "Years Experience" },
    { number: "5.0", label: "Client Rating", icon: <FiStar /> },
  ];

  return (
    <div className="home-container overflow-x-hidden w-full bg-[#141414]">
      <NavBar />

      {/* ENHANCED HERO SECTION */}
      <div className="relative w-full min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={home_image}
            alt="Photography Studio"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="max-w-3xl">
            <ScrollAnimatedContent delay={0.1}>
              <div className="inline-flex items-center gap-2 bg-[#E6C2A1]/10 border border-[#E6C2A1]/30 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
                <FiCamera className="text-[#E6C2A1]" />
                <span className="text-[#E6C2A1] text-sm font-medium">
                  Professional Photography Studio
                </span>
              </div>
            </ScrollAnimatedContent>

            <ScrollAnimatedContent delay={0.2}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Capturing Life's</span>
                <br />
                <span className="text-[#E6C2A1]">Precious Moments</span>
              </h1>
            </ScrollAnimatedContent>

            <ScrollAnimatedContent delay={0.3}>
              <p className="text-lg sm:text-xl text-[#D4D4D4] mb-8 leading-relaxed max-w-2xl">
                From newborns and family portraits to maternity and milestone
                celebrations, we create timeless memories with precision,
                creativity, and heart.
              </p>
            </ScrollAnimatedContent>

            <ScrollAnimatedContent delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <motion.a
                  href="tel:+971XXXXXXXXX"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#E6C2A1] text-black font-semibold py-3.5 rounded-lg shadow-lg hover:bg-[#d4ac88] transition-all"
                >
                  <FiPhoneCall className="text-lg" />
                  Call Us
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {navigate("/standard-photo-print")
                  }}
                  className="flex-1 flex items-center justify-center border-2 border-[#E6C2A1] text-[#E6C2A1] font-semibold py-3.5 rounded-lg hover:bg-[#E6C2A1] hover:text-black transition-all"
                >
                  Standard Photo Print
                </motion.button>
                <div className="flex-1 flex"></div>
              </div>
            </ScrollAnimatedContent>

            {/* Stats */}
            <ScrollAnimatedContent delay={0.5}>
              <div className="flex flex-wrap gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex items-center gap-2 text-3xl font-bold text-[#E6C2A1] mb-1">
                      {stat.number}
                      {stat.icon && (
                        <span className="text-xl">{stat.icon}</span>
                      )}
                    </div>
                    <div className="text-sm text-[#D4D4D4]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollAnimatedContent>
          </div>
        </div>
      </div>

      {/* SERVICES SECTION - MODERN CARDS */}
      <div id="packages" className="w-full bg-[#0f0f0f] py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimatedContent>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[#E6C2A1]/10 border border-[#E6C2A1]/30 px-4 py-2 rounded-full mb-4">
                <FiCamera className="text-[#E6C2A1]" />
                <span className="text-[#E6C2A1] text-sm font-medium">
                  Our Services
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-[#E6C2A1] mb-6">
                Specialized Photography Sessions
              </h2>
              <p className="text-lg text-[#D4D4D4] max-w-3xl mx-auto">
                Comprehensive photography packages tailored to celebrate every
                precious moment with creativity and care.
              </p>
            </div>
          </ScrollAnimatedContent>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ScrollAnimatedContent key={index} delay={0.1 * index}>
                <motion.div
                  onHoverStart={() => setHoveredService(index)}
                  onHoverEnd={() => setHoveredService(null)}
                  className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden h-full border border-gray-800 hover:border-[#E6C2A1]/50 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredService === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-[#E6C2A1] text-black px-4 py-2 rounded-full font-semibold text-sm">
                      {service.price}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#E6C2A1] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[#D4D4D4] mb-4 text-sm leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-[#D4D4D4]"
                        >
                          <FiCheck
                            className="text-[#E6C2A1] flex-shrink-0"
                            size={16}
                          />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={()=> navigate(service.path)}
                      className="text-[#E6C2A1] font-semibold text-sm flex items-center gap-2 group"
                    >
                      Learn More
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              </ScrollAnimatedContent>
            ))}
          </div>
        </div>
      </div>

      {/* GALLERY SECTION - IMPROVED */}
      <div className="w-full bg-[#141414] py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimatedContent>
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-[#E6C2A1] mb-3">
                  Our Portfolio
                </h2>
                <p className="text-lg text-[#D4D4D4]">
                  A glimpse of moments captured with passion and precision
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#E6C2A1] text-black font-semibold py-3 px-8 rounded-lg hover:bg-[#d4ac88] transition-all"
              >
                View Full Gallery
              </motion.button>
            </div>
          </ScrollAnimatedContent>

          {/* Scrolling Gallery */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-800">
            {/* Gradients */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-r from-[#141414] to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-l from-[#141414] to-transparent z-10" />

            <motion.div
              className="flex gap-4 sm:gap-6 py-6 sm:py-8 px-4 sm:px-6"
              animate={{ x: [0, -1200] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 25,
              }}
            >
              {[...galleryImages, ...galleryImages].map((img, index) => (
                <div
                  key={index}
                  className="
          flex-shrink-0 rounded-xl overflow-hidden shadow-lg
          w-[200px] h-[200px]
          sm:w-[260px] sm:h-[260px]
          lg:w-[320px] lg:h-[320px]
        "
                >
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS SECTION */}
      <div className="w-full bg-[#0f0f0f] py-14 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollAnimatedContent>
            <div className="text-center mb-10 sm:mb-16">
              <div className="inline-flex items-center gap-2 bg-[#E6C2A1]/10 border border-[#E6C2A1]/30 px-3 py-1.5 rounded-full mb-4">
                <FiHeart className="text-[#E6C2A1]" />
                <span className="text-[#E6C2A1] text-xs sm:text-sm font-medium">
                  Testimonials
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#E6C2A1] mb-4 sm:mb-6">
                What Our Clients Say
              </h2>

              <p className="text-sm sm:text-lg text-[#D4D4D4] max-w-xl sm:max-w-2xl mx-auto">
                Don't just take our word for it – hear from families we've had
                the pleasure of working with
              </p>
            </div>
          </ScrollAnimatedContent>

          {/* Responsive grid: stacked on mobile, 3-per-row on md+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <ScrollAnimatedContent key={index} delay={0.1 * index}>
                <div className="bg-[#1a1a1a] p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl border border-gray-800 hover:border-[#E6C2A1]/50 transition-all h-full flex flex-col justify-between">
                  {/* Rating */}
                  <div className="flex gap-1 mb-2 sm:mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar
                        key={i}
                        className="text-[#E6C2A1] fill-current"
                        size={14} // smaller on mobile
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm md:text-base text-[#D4D4D4] mb-3 sm:mb-4 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-2 sm:gap-3 pt-2 sm:pt-3 border-t border-gray-800">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                    />
                    <div>
                      <div className="text-xs sm:text-sm md:text-base font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-[10px] sm:text-xs md:text-sm text-[#D4D4D4]">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollAnimatedContent>
            ))}
          </div>
        </div>
      </div>

      {/* CREATIVE THEMES SECTION - SIMPLIFIED */}
      <div className="w-full bg-[#141414] py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollAnimatedContent>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-[#E6C2A1] mb-6">
                Creative Newborn Photography Themes
              </h2>
              <p className="text-lg text-[#D4D4D4] max-w-3xl mx-auto">
                Explore our diverse selection of creative themes and distinctive
                add-ons designed to make your photos truly memorable
              </p>
            </div>
          </ScrollAnimatedContent>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Diamond", "Star", "Sunflower", "Sky"].map((theme, index) => (
              <ScrollAnimatedContent key={index} delay={0.1 * index}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#E6C2A1]/50 transition-all"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={
                        [weddingImg, birthdayImg, outdoorImg, productImg][index]
                      }
                      alt={theme}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {theme}
                    </h3>
                    <p className="text-sm text-[#D4D4D4]">
                      Beautiful themed setup with professional props
                    </p>
                  </div>
                </motion.div>
              </ScrollAnimatedContent>
            ))}
          </div>

          <ScrollAnimatedContent delay={0.5}>
            <div className="text-center mt-12">
              <motion.button
                onClick={() => navigate("/newborn")}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#E6C2A1] text-black font-semibold py-3.5 px-10 rounded-lg shadow-lg hover:bg-[#d4ac88] transition-all"
              >
                Book Your Session
              </motion.button>
            </div>
          </ScrollAnimatedContent>
        </div>
      </div>

      {/* MOTHERHOOD JOURNEY SECTION - ENHANCED */}
      <div className="w-full bg-[#0f0f0f] py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <ScrollAnimatedContent delay={0.2}>
              <div className="w-full md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={home_image}
                    alt="Motherhood Journey"
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </div>
            </ScrollAnimatedContent>

            <div className="w-full md:w-1/2">
              <ScrollAnimatedContent delay={0.4}>
                <div className="inline-flex items-center gap-2 bg-[#E6C2A1]/10 border border-[#E6C2A1]/30 px-4 py-2 rounded-full mb-6">
                  <FiHeart className="text-[#E6C2A1]" />
                  <span className="text-[#E6C2A1] text-sm font-medium">
                    Special Moments
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-[#E6C2A1] mb-6">
                  The Journey of Becoming a Mother
                </h2>
                <p className="text-lg text-[#D4D4D4] mb-8 leading-relaxed">
                  Being a mother is one of life's most extraordinary
                  experiences. At Inekas, we're dedicated to capturing these
                  cherished moments with artistry and passion, creating timeless
                  memories you'll treasure forever.
                </p>

                <motion.button
                  onClick={() => navigate("/maternity")}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#E6C2A1] text-black font-semibold py-3.5 px-10 rounded-lg shadow-lg hover:bg-[#d4ac88] transition-all"
                >
                  Book Maternity Session
                </motion.button>
              </ScrollAnimatedContent>
            </div>
          </div>
        </div>
      </div>

      {/* FINAL CTA SECTION */}
      <div className="w-full bg-[#141414] py-20 md:py-32 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, #E6C2A1 1px, transparent 0)",
              backgroundSize: "48px 48px",
            }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <ScrollAnimatedContent>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Ready to Create{" "}
              <span className="text-[#E6C2A1]">Beautiful Memories</span>?
            </h2>
            <p className="text-lg sm:text-xl text-[#D4D4D4] mb-10 max-w-2xl mx-auto">
              Let's capture your special moments with creativity and care. Book
              your session today and preserve memories that will last a
              lifetime.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-[#E6C2A1] text-black font-semibold py-4 px-10 rounded-lg shadow-lg hover:bg-[#d4ac88] transition-all"
              >
                <FiPhoneCall />
                Contact Us Today
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-transparent border-2 border-[#E6C2A1] text-[#E6C2A1] font-semibold py-4 px-10 rounded-lg hover:bg-[#E6C2A1] hover:text-black transition-all"
              >
                <FiMail />
                Get More Info
              </motion.button>
            </div>
          </ScrollAnimatedContent>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
