import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="bg-[#0f0f0f] text-[#D4D4D4] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-[#1f1f1f]">
          
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-[#E6C2A1] mb-3">
              Inekas Photography
            </h3>
            <p className="text-sm leading-relaxed">
              Capturing timeless moments with creativity, emotion, and
              professional artistry. From newborns to weddings — we frame
              memories for life.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-[#E6C2A1] mb-3">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Newborn Photography</li>
              <li>Maternity Shoots</li>
              <li>Wedding Photography</li>
              <li>Portrait & Studio Shoots</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#E6C2A1] mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-[#E6C2A1] transition">Home</li>
              <li className="hover:text-[#E6C2A1] transition">Gallery</li>
              <li className="hover:text-[#E6C2A1] transition">Photo Print</li>
              <li className="hover:text-[#E6C2A1] transition">Packages</li>
              <li className="hover:text-[#E6C2A1] transition">Contact</li>
              <a onClick={()=> {navigate("/admin/home");}}><li>Admin login</li></a>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-[#E6C2A1] mb-3">
              Contact
            </h4>
            <p className="text-sm mb-2">Sharjah,UAE</p>
            <p className="text-sm mb-2">📞 +971563619662</p>
            <p className="text-sm">📧 inekasstudio@gmail.com</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-6 gap-4">
          <p className="text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Inekas Photography. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#E6C2A1] hover:text-black transition"
            >
              <FaInstagram size={14} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#E6C2A1] hover:text-black transition"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#E6C2A1] hover:text-black transition"
            >
              <FaWhatsapp size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
