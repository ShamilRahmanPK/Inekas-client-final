import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { Camera, Heart, Users, Award } from "lucide-react";

// image imports
import aboutImage from "../assets/4x4-prev.jpg";
import founderImage from "../assets/4x6-prev.jpg";

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
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
      {children}
    </motion.div>
  );
}

function AboutUs() {
  return (
    <div className="about-container overflow-x-hidden w-full bg-[#141414]">
      <NavBar />

      {/* HERO SECTION */}
      <div className="relative w-full max-w-screen-2xl mx-auto mt-[55.56px]">
        <div className="bg-[#1a1a2e] py-20 md:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
            <ScrollAnimatedContent delay={0.2}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 md:w-20 h-1 bg-[#E6C2A1] rounded"></div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#E6C2A1]">
                  About Us
                </h1>
              </div>
            </ScrollAnimatedContent>
            <ScrollAnimatedContent delay={0.4}>
              <p className="text-base sm:text-lg text-[#D4D4D4] max-w-2xl">
                Newborn photos capture the fleeting moments of pure joy and innocence that new parents cherish forever. These images become precious heirlooms, passed down through generations, preserving the memory of a new life's beginning.
              </p>
            </ScrollAnimatedContent>
          </div>
        </div>
      </div>

      {/* MAIN ABOUT SECTION */}
      <div className="w-full bg-[#141414] py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image */}
            <ScrollAnimatedContent delay={0.2}>
              <div className="w-full">
                <img
                  src={aboutImage}
                  alt="About Inekas Photography"
                  className="rounded-xl shadow-lg w-full object-cover h-[300px] sm:h-[400px]"
                />
              </div>
            </ScrollAnimatedContent>

            {/* Content */}
            <ScrollAnimatedContent delay={0.4}>
              <div className="w-full">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#E6C2A1] mb-4">
                  About Us
                </h2>
                <p className="text-sm sm:text-base text-[#D4D4D4] mb-4">
                  You are most welcome and thank you for visiting Inekas photography. We at Inekas photography specialize in newborn, maternity, children and family portraits.
                </p>
                <p className="text-sm sm:text-base text-[#D4D4D4]">
                  We have been photographing newborns, children and families for the last twenty years. Photography is our full-time profession and we truly love creating wonderful images of those you love most. Newborn pictures are a long-standing tradition that brings family great pleasure. By making these photos easily accessible in digital form and beautiful albums, we hope to capture much of these joyful moments.
                </p>
              </div>
            </ScrollAnimatedContent>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US SECTION */}
      <div className="w-full bg-[#0f0f0f] py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <ScrollAnimatedContent delay={0.2}>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#E6C2A1] mb-12 text-center">
              Why Choose Us
            </h2>
          </ScrollAnimatedContent>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {/* Experience */}
            <ScrollAnimatedContent delay={0.3}>
              <div className="bg-[#1a1a1a] p-6 sm:p-8 rounded-xl shadow-lg h-full text-center">
                <div className="inline-block p-3 bg-[#E6C2A1] rounded-lg mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#E6C2A1] mb-3">
                  20+ Years
                </h3>
                <p className="text-sm sm:text-base text-[#D4D4D4]">
                  Of professional photography experience
                </p>
              </div>
            </ScrollAnimatedContent>

            {/* Passion */}
            <ScrollAnimatedContent delay={0.4}>
              <div className="bg-[#1a1a1a] p-6 sm:p-8 rounded-xl shadow-lg h-full text-center">
                <div className="inline-block p-3 bg-[#E6C2A1] rounded-lg mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#E6C2A1] mb-3">
                  Passion
                </h3>
                <p className="text-sm sm:text-base text-[#D4D4D4]">
                  We truly love capturing precious moments
                </p>
              </div>
            </ScrollAnimatedContent>

            {/* Expertise */}
            <ScrollAnimatedContent delay={0.5}>
              <div className="bg-[#1a1a1a] p-6 sm:p-8 rounded-xl shadow-lg h-full text-center">
                <div className="inline-block p-3 bg-[#E6C2A1] rounded-lg mb-4">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#E6C2A1] mb-3">
                  Expertise
                </h3>
                <p className="text-sm sm:text-base text-[#D4D4D4]">
                  Specialized in newborn & family portraits
                </p>
              </div>
            </ScrollAnimatedContent>

            {/* Personal Touch */}
            <ScrollAnimatedContent delay={0.6}>
              <div className="bg-[#1a1a1a] p-6 sm:p-8 rounded-xl shadow-lg h-full text-center">
                <div className="inline-block p-3 bg-[#E6C2A1] rounded-lg mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#E6C2A1] mb-3">
                  Personal Touch
                </h3>
                <p className="text-sm sm:text-base text-[#D4D4D4]">
                  Dedicated attention to every family
                </p>
              </div>
            </ScrollAnimatedContent>
          </div>
        </div>
      </div>

      {/* WHAT WE DO SECTION */}
      <div className="w-full bg-[#141414] py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Content */}
            <ScrollAnimatedContent delay={0.2}>
              <div className="w-full md:order-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#E6C2A1] mb-4">
                  What We Do
                </h2>
                <p className="text-sm sm:text-base text-[#D4D4D4] mb-4">
                  The photography challenge is a daily exercise that aims to help us become more creative in photography, each challenge pushes us to create wonderful images of those you love most.
                </p>
                <p className="text-sm sm:text-base text-[#D4D4D4]">
                  We aim to create beautiful, soft and timeless images using natural tones and textures that best complement your baby and children. We believe that a beautiful portrait of your child should portray so much more than just a smile. Please feel free to give us a call so we can have a chat about the beautiful pictures that we are going to create for you.
                </p>
              </div>
            </ScrollAnimatedContent>

            {/* Image */}
            <ScrollAnimatedContent delay={0.4}>
              <div className="w-full md:order-1">
                <img
                  src={founderImage}
                  alt="What we do"
                  className="rounded-xl shadow-lg w-full object-cover h-[300px] sm:h-[400px]"
                />
              </div>
            </ScrollAnimatedContent>
          </div>
        </div>
      </div>

      {/* FOUNDER'S MESSAGE SECTION */}
      <div className="w-full bg-[#0f0f0f] py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <ScrollAnimatedContent delay={0.2}>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#E6C2A1] mb-12 text-center">
              Founder's Message
            </h2>
          </ScrollAnimatedContent>

          <div className="max-w-4xl mx-auto">
            <div className="bg-[#1a1a1a] p-6 sm:p-8 md:p-10 rounded-xl shadow-lg">
              <ScrollAnimatedContent delay={0.3}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Founder Image */}
                  <div className="md:col-span-1">
                    <img
                      src={aboutImage}
                      alt="Founder"
                      className="rounded-xl shadow-lg w-full object-cover h-[250px] sm:h-[300px]"
                    />
                  </div>

                  {/* Founder Message */}
                  <div className="md:col-span-2 flex flex-col justify-center">
                    <p className="text-base sm:text-lg text-[#D4D4D4] italic mb-6 leading-relaxed">
                      "The photography challenge is a daily exercise that aims to help us become more creative in photography, and each challenge pushes us to try new ideas."
                    </p>
                    <div>
                      <p className="text-lg sm:text-xl text-[#E6C2A1] font-semibold mb-1">
                        Samira M
                      </p>
                      <p className="text-sm sm:text-base text-[#D4D4D4]">
                        Founder, Inekas Photography
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollAnimatedContent>
            </div>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="w-full bg-[#141414] py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="bg-[#1a1a1a] p-8 sm:p-10 md:p-12 rounded-xl shadow-lg text-center">
            <ScrollAnimatedContent delay={0.2}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E6C2A1] mb-6">
                The Heartfelt Journey of Becoming a Mother
              </h2>
              <p className="text-sm sm:text-base text-[#D4D4D4] mb-8 max-w-2xl mx-auto">
                Being a mother is one of life's most extraordinary experiences. At INEKAS, we are dedicated to capturing these cherished moments with the artistry and passion of our talented creative team.
              </p>
              <button className="bg-[#E6C2A1] text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-[#d4ac88] transition">
                Book Now
              </button>
            </ScrollAnimatedContent>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AboutUs;