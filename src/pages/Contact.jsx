import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react";

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

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    couponCode: "",
    sessionType: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("Sending...");
    
    // Add your form submission logic here
    // For now, just simulate a submission
    setTimeout(() => {
      setFormStatus("Message sent successfully!");
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        couponCode: "",
        sessionType: "",
        message: "",
      });
      setTimeout(() => setFormStatus(""), 3000);
    }, 1000);
  };

  return (
    <div className="contact-container overflow-x-hidden w-full bg-[#141414]">
      <NavBar />

      {/* HERO SECTION */}
      <div className="relative w-full mt-[55.56px]">
        <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#141414] to-[#0f0f0f] py-24 md:py-32 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#E6C2A1] opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E6C2A1] opacity-5 rounded-full blur-3xl"></div>
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
            <ScrollAnimatedContent delay={0.2}>
              <div className="text-center">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
                  Contact <span className="text-[#E6C2A1]">Us</span>
                </h1>
                <p className="text-lg sm:text-xl text-[#D4D4D4] max-w-2xl mx-auto">
                  We are here to answer your questions and handle any queries you have
                </p>
              </div>
            </ScrollAnimatedContent>
          </div>
        </div>
      </div>

      {/* CONTACT INFORMATION SECTION */}
      <div className="w-full bg-[#141414] py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <ScrollAnimatedContent delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Inekas <span className="text-[#E6C2A1]">Photography</span>
              </h2>
              <div className="w-24 h-1 bg-[#E6C2A1] mx-auto rounded"></div>
            </div>
          </ScrollAnimatedContent>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Address */}
            <ScrollAnimatedContent delay={0.3}>
              <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-6 sm:p-8 rounded-2xl border border-[#2a2a2a] hover:border-[#E6C2A1] transition-all duration-300 hover:shadow-2xl hover:shadow-[#E6C2A1]/10 h-full flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6C2A1] opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity"></div>
                <div className="relative flex flex-col h-full">
                  <div className="inline-block p-3 sm:p-4 bg-gradient-to-br from-[#E6C2A1] to-[#d4ac88] rounded-xl mb-4 shadow-lg self-start">
                    <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                    Address & Location
                  </h3>
                  <p className="text-sm sm:text-base text-[#B8B8B8] leading-relaxed flex-grow">
                    Sharjah - Al Sharq St<br />
                    Al Heerah Suburb<br />
                    Al Rifa - Al Sharq Town<br />
                    Sharjah, UAE
                  </p>
                </div>
              </div>
            </ScrollAnimatedContent>

            {/* Phone Numbers */}
            <ScrollAnimatedContent delay={0.4}>
              <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-6 sm:p-8 rounded-2xl border border-[#2a2a2a] hover:border-[#E6C2A1] transition-all duration-300 hover:shadow-2xl hover:shadow-[#E6C2A1]/10 h-full flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6C2A1] opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity"></div>
                <div className="relative flex flex-col h-full">
                  <div className="inline-block p-3 sm:p-4 bg-gradient-to-br from-[#E6C2A1] to-[#d4ac88] rounded-xl mb-4 shadow-lg self-start">
                    <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                    Phone Numbers
                  </h3>
                  <div className="space-y-2 flex-grow">
                    <a href="tel:+971563619662" className="block text-sm sm:text-base text-[#B8B8B8] hover:text-[#E6C2A1] transition-colors duration-200 font-medium">
                      +971 56 361 9662
                    </a>
                    <a href="tel:+97165238236" className="block text-sm sm:text-base text-[#B8B8B8] hover:text-[#E6C2A1] transition-colors duration-200 font-medium">
                      +971 6 523 8236
                    </a>
                  </div>
                  <p className="text-sm text-[#888] mt-3">
                    Available for calls
                  </p>
                </div>
              </div>
            </ScrollAnimatedContent>

            {/* Business Hours */}
            <ScrollAnimatedContent delay={0.5}>
              <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-6 sm:p-8 rounded-2xl border border-[#2a2a2a] hover:border-[#E6C2A1] transition-all duration-300 hover:shadow-2xl hover:shadow-[#E6C2A1]/10 h-full flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6C2A1] opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity"></div>
                <div className="relative flex flex-col h-full">
                  <div className="inline-block p-3 sm:p-4 bg-gradient-to-br from-[#E6C2A1] to-[#d4ac88] rounded-xl mb-4 shadow-lg self-start">
                    <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                    Business Hours
                  </h3>
                  <p className="text-sm sm:text-base text-[#B8B8B8] leading-relaxed flex-grow">
                    <span className="text-[#E6C2A1] font-semibold">Saturday - Thursday</span><br />
                    9:30 AM - 1:00 PM<br />
                    5:00 PM - 9:00 PM
                  </p>
                  <p className="text-sm text-[#888] mt-3">
                    Friday: Closed
                  </p>
                </div>
              </div>
            </ScrollAnimatedContent>

            {/* Email */}
            <ScrollAnimatedContent delay={0.6}>
              <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-6 sm:p-8 rounded-2xl border border-[#2a2a2a] hover:border-[#E6C2A1] transition-all duration-300 hover:shadow-2xl hover:shadow-[#E6C2A1]/10 h-full flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6C2A1] opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity"></div>
                <div className="relative flex flex-col h-full">
                  <div className="inline-block p-3 sm:p-4 bg-gradient-to-br from-[#E6C2A1] to-[#d4ac88] rounded-xl mb-4 shadow-lg self-start">
                    <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                    Email Address
                  </h3>
                  <a href="mailto:info@inekasphotography.com" className="text-sm sm:text-base text-[#B8B8B8] hover:text-[#E6C2A1] transition-colors duration-200 break-all font-medium flex-grow">
                    info@inekasphotography.com
                  </a>
                  <p className="text-sm text-[#888] mt-3">
                    Response within 24-48 hours
                  </p>
                </div>
              </div>
            </ScrollAnimatedContent>

            {/* Instagram */}
            <ScrollAnimatedContent delay={0.7}>
              <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-6 sm:p-8 rounded-2xl border border-[#2a2a2a] hover:border-[#E6C2A1] transition-all duration-300 hover:shadow-2xl hover:shadow-[#E6C2A1]/10 h-full flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6C2A1] opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity"></div>
                <div className="relative flex flex-col h-full">
                  <div className="inline-block p-3 sm:p-4 bg-gradient-to-br from-[#E6C2A1] to-[#d4ac88] rounded-xl mb-4 shadow-lg self-start">
                    <Instagram className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                    Instagram
                  </h3>
                  <div className="flex-grow">
                    <a 
                      href="https://www.instagram.com/inekasphotography/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-[#B8B8B8] hover:text-[#E6C2A1] transition-colors duration-200 font-medium inline-flex items-center gap-2"
                    >
                      @inekasphotography
                      <span className="text-xs">→</span>
                    </a>
                  </div>
                  <p className="text-sm text-[#888] mt-3">
                    Follow for daily updates
                  </p>
                </div>
              </div>
            </ScrollAnimatedContent>

            {/* YouTube & Facebook */}
            <ScrollAnimatedContent delay={0.8}>
              <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-6 sm:p-8 rounded-2xl border border-[#2a2a2a] hover:border-[#E6C2A1] transition-all duration-300 hover:shadow-2xl hover:shadow-[#E6C2A1]/10 h-full flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E6C2A1] opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity"></div>
                <div className="relative flex flex-col h-full">
                  <div className="inline-block p-3 sm:p-4 bg-gradient-to-br from-[#E6C2A1] to-[#d4ac88] rounded-xl mb-4 shadow-lg self-start">
                    <Youtube className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                    Social Media
                  </h3>
                  <div className="space-y-2 flex-grow">
                    <a 
                      href="https://www.youtube.com/watch?v=u_DllDvZy40" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm sm:text-base text-[#B8B8B8] hover:text-[#E6C2A1] transition-colors duration-200 font-medium"
                    >
                      <Youtube className="w-5 h-5" />
                      YouTube
                    </a>
                    <a 
                      href="https://www.facebook.com/watch/inekasphotographer/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm sm:text-base text-[#B8B8B8] hover:text-[#E6C2A1] transition-colors duration-200 font-medium"
                    >
                      <Facebook className="w-5 h-5" />
                      Facebook
                    </a>
                  </div>
                  <p className="text-sm text-[#888] mt-3">
                    Connect with us
                  </p>
                </div>
              </div>
            </ScrollAnimatedContent>
          </div>
        </div>
      </div>

      {/* CONTACT FORM & MAP SECTION */}
      <div className="w-full bg-[#0f0f0f] py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">
            {/* Contact Form */}
            <ScrollAnimatedContent delay={0.2}>
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#E6C2A1]/5 to-transparent rounded-3xl blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#141414] p-8 sm:p-10 rounded-3xl border border-[#2a2a2a] shadow-2xl">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                    Get In <span className="text-[#E6C2A1]">Touch</span>
                  </h2>
                  <p className="text-[#B8B8B8] mb-8">
                    We are here to answer all your questions and handle any queries you have.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-white mb-2">
                        Full Name <span className="text-[#E6C2A1]">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3.5 bg-[#0f0f0f] border border-[#333] rounded-xl text-white placeholder-[#666] focus:outline-none focus:border-[#E6C2A1] focus:ring-2 focus:ring-[#E6C2A1]/20 transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                        Phone <span className="text-[#E6C2A1]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3.5 bg-[#0f0f0f] border border-[#333] rounded-xl text-white placeholder-[#666] focus:outline-none focus:border-[#E6C2A1] focus:ring-2 focus:ring-[#E6C2A1]/20 transition-all"
                        placeholder="+971 XX XXX XXXX"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                        Email <span className="text-[#E6C2A1]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3.5 bg-[#0f0f0f] border border-[#333] rounded-xl text-white placeholder-[#666] focus:outline-none focus:border-[#E6C2A1] focus:ring-2 focus:ring-[#E6C2A1]/20 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Coupon Code */}
                    <div>
                      <label htmlFor="couponCode" className="block text-sm font-semibold text-white mb-2">
                        Coupon Code
                      </label>
                      <input
                        type="text"
                        id="couponCode"
                        name="couponCode"
                        value={formData.couponCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 bg-[#0f0f0f] border border-[#333] rounded-xl text-white placeholder-[#666] focus:outline-none focus:border-[#E6C2A1] focus:ring-2 focus:ring-[#E6C2A1]/20 transition-all"
                        placeholder="Optional"
                      />
                    </div>

                    {/* Session Type */}
                    <div>
                      <label htmlFor="sessionType" className="block text-sm font-semibold text-white mb-2">
                        Session Type <span className="text-[#E6C2A1]">*</span>
                      </label>
                      <select
                        id="sessionType"
                        name="sessionType"
                        value={formData.sessionType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3.5 bg-[#0f0f0f] border border-[#333] rounded-xl text-white focus:outline-none focus:border-[#E6C2A1] focus:ring-2 focus:ring-[#E6C2A1]/20 transition-all appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23E6C2A1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center'
                        }}
                      >
                        <option value="">Select session type</option>
                        <option value="Newborn">Newborn</option>
                        <option value="Cake Smash">Cake Smash</option>
                        <option value="Maternity">Maternity</option>
                        <option value="Profile Photo">Profile Photo</option>
                        <option value="Family Portrait">Family Portrait</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3.5 bg-[#0f0f0f] border border-[#333] rounded-xl text-white placeholder-[#666] focus:outline-none focus:border-[#E6C2A1] focus:ring-2 focus:ring-[#E6C2A1]/20 transition-all resize-none"
                        placeholder="Tell us about your photography needs..."
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#E6C2A1] to-[#d4ac88] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#E6C2A1]/20 transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Send Message
                    </button>

                    {/* Form Status */}
                    {formStatus && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center p-4 bg-[#E6C2A1]/10 border border-[#E6C2A1] rounded-xl"
                      >
                        <p className="text-[#E6C2A1] font-medium">
                          {formStatus}
                        </p>
                      </motion.div>
                    )}
                  </form>
                </div>
              </div>
            </ScrollAnimatedContent>

            {/* Map */}
            <ScrollAnimatedContent delay={0.4}>
              <div className="relative h-full">
                <div className="lg:sticky lg:top-24">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                    Location & <span className="text-[#E6C2A1]">Direction</span>
                  </h2>
                  <p className="text-sm sm:text-base text-[#B8B8B8] mb-6 sm:mb-8">
                    Visit our studio in Sharjah for a personalized photography experience
                  </p>
                  <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#2a2a2a]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#E6C2A1]/10 to-transparent pointer-events-none z-10"></div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28835.54586164707!2d55.421511!3d25.389970000000005!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f599b1ecb1fb1%3A0xb4fab97bb6baa67d!2sInekas%20Photography!5e0!3m2!1sen!2sus!4v1767603832402!5m2!1sen!2sus" width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Inekas Photography Location"
                      className="relative z-0"></iframe>  
                  </div>
                </div>
              </div>
            </ScrollAnimatedContent>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;