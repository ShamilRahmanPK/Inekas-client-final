import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Banknote,
  MapPin,
  CheckCircle,
  ShoppingBag,
  ArrowLeft,
  Truck,
  Package,
  AlertCircle,
  Plus,
  Minus,
  Upload,
} from "lucide-react";
import Navbar from "../components/Navbar";
import StripePayment from "../components/StripePayment";
import OrderSuccessModal from "../components/OrderSuccessModal";
import { addStandardPrintApi } from "../services/allAPI";
import { validateCheckoutForm, sanitizeInput } from "../utils/validation";
import SERVER_BASE_URL from "../services/serverUrl";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get uploaded images & order info from navigation state
  const [uploadedImages, setUploadedImages] = useState(location.state?.uploadedImages || []);
  const initialTotals = location.state?.totals || {
    subtotal: 0,
    deliveryCharge: 29,
    discount: 0,
    total: 29,
  };
  const promoCode = location.state?.promoCode || "";

  // Form state
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United Arab Emirates",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoCodeInput, setPromoCodeInput] = useState(promoCode || "");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [promoApplied, setPromoApplied] = useState(!!promoCode);
  const [promoError, setPromoError] = useState("");
  const [currentTotals, setCurrentTotals] = useState(initialTotals);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successSubMessage, setSuccessSubMessage] = useState("");
  const [serverReady, setServerReady] = useState(false);
  const [serverWaking, setServerWaking] = useState(false);


  // server starting
  useEffect(() => {
  let isMounted = true;

  const wakeServer = async () => {
    try {
      setServerWaking(true);

      await fetch(`${SERVER_BASE_URL}/health`, {
        cache: "no-store",
      });

      if (isMounted) setServerReady(true);
    } catch (err) {
      if (isMounted) setServerReady(true);
    } finally {
      if (isMounted) setServerWaking(false);
    }
  };

  wakeServer();

  return () => {
    isMounted = false;
  };
}, []);





  // Redirect if no uploaded images
  useEffect(() => {
    if (!uploadedImages || uploadedImages.length === 0) {
      navigate("/image/upload");
    }
  }, [uploadedImages, navigate]);

  // Handle input change with sanitization
  const handleInputChange = (field, value) => {
    const sanitizedValue = sanitizeInput(value);
    setDeliveryAddress((prev) => ({
      ...prev,
      [field]: sanitizedValue,
    }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const [imagesWithPreview, setImagesWithPreview] = useState([]);
  useEffect(() => {
    const mapped = uploadedImages.map((img) => ({
      ...img,
      preview: img.croppedFile
        ? URL.createObjectURL(img.croppedFile)
        : URL.createObjectURL(img.file),
    }));
    setImagesWithPreview(mapped);

    // Cleanup object URLs when component unmounts
    return () => {
      mapped.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [uploadedImages]);

  // Form validation using utility
  const validateForm = () => {
    const errors = validateCheckoutForm(deliveryAddress);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Apply promo code
  const handleApplyPromo = async () => {
    if (!promoCodeInput.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }
    setIsApplyingPromo(true);
    setPromoError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const validPromoCodes = {
        SAVE10: 0.1,
        SAVE15: 0.15,
        SAVE20: 0.2,
        FIRSTORDER: 0.25,
      };

      const discountRate = validPromoCodes[promoCodeInput.toUpperCase()];
      if (discountRate) {
        const discount = currentTotals.subtotal * discountRate;
        const newTotal =
          currentTotals.subtotal + currentTotals.deliveryCharge - discount;
        setCurrentTotals({ ...currentTotals, discount, total: newTotal });
        setPromoApplied(true);
        setTimeout(() => setPromoApplied(false), 3000);
      } else {
        setPromoError("Invalid promo code");
      }
    } catch {
      setPromoError("Failed to apply promo code");
    } finally {
      setIsApplyingPromo(false);
    }
  };


  const handlePlaceOrder = async () => {
  // -----------------------------------
  // 1. Prevent premature submission
  // -----------------------------------
  if (serverWaking || !serverReady) {
    setSuccessMessage("Please wait");
    setSuccessSubMessage(
      "Our server is waking up. This usually takes a few seconds."
    );
    setShowSuccessModal(true);
    return;
  }

  if (isSubmitting) return;
  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    const formData = new FormData();

    // -----------------------------------
    // 2. Images + item details
    // -----------------------------------
    uploadedImages.forEach((img, index) => {
      formData.append("images", img.croppedFile || img.file);
      formData.append(`items[${index}][size]`, img.size);
      formData.append(`items[${index}][paper]`, img.paper);
      formData.append(`items[${index}][quantity]`, img.quantity);
      formData.append(`items[${index}][cropped]`, img.cropped);

      if (img.cropData) {
        formData.append(
          `items[${index}][cropData]`,
          JSON.stringify(img.cropData)
        );
      }
    });

    // -----------------------------------
    // 3. Delivery address
    // -----------------------------------
    Object.entries(deliveryAddress).forEach(([key, value]) => {
      formData.append(`deliveryAddress[${key}]`, value);
    });

    // -----------------------------------
    // 4. Pricing
    // -----------------------------------
    formData.append("pricing[subtotal]", currentTotals.subtotal);
    formData.append("pricing[discount]", currentTotals.discount);
    formData.append("pricing[deliveryCharge]", currentTotals.deliveryCharge);
    formData.append("pricing[total]", currentTotals.total);

    // -----------------------------------
    // 5. Payment
    // -----------------------------------
    formData.append("paymentMethod", paymentMethod);
    formData.append("promoCode", promoCodeInput);

    // -----------------------------------
    // 6. API call
    // -----------------------------------
    const res = await addStandardPrintApi(formData);

    if (!res || res.status !== 200 && res.status !== 201) {
      throw new Error(res?.data?.message || "Order failed");
    }

    // -----------------------------------
    // 7. Success handling
    // -----------------------------------
    setSuccessMessage("Order Placed Successfully!");
    setSuccessSubMessage(
      paymentMethod === "cash_on_delivery"
        ? "Your order has been confirmed. Pay cash on delivery!"
        : "Thank you for your payment. We'll process your order shortly!"
    );
    setShowSuccessModal(true);

  } catch (error) {
    console.error("Checkout error:", error);

    // -----------------------------------
    // 8. Error handling
    // -----------------------------------
    if (error?.response?.status === 408) {
      setSuccessMessage("Server is starting");
      setSuccessSubMessage(
        "Our server is waking up. Please try again in a few seconds."
      );
    } else if (error?.response?.status === 429) {
      setSuccessMessage("Too Many Requests");
      setSuccessSubMessage(
        "You've submitted too many orders. Please try again later."
      );
    } else if (error?.response?.status === 400) {
      setSuccessMessage("Invalid Information");
      setSuccessSubMessage(
        error?.response?.data?.message ||
          "Please check your information and try again."
      );
    } else {
      setSuccessMessage("Order Failed");
      setSuccessSubMessage(
        error?.message || "Something went wrong. Please try again."
      );
    }

    setShowSuccessModal(true);

  } finally {
    setIsSubmitting(false);
  }
};


  // const handlePlaceOrder = async () => {
  //   if (!validateForm()) return;

  //   setIsSubmitting(true);

  //   try {
  //     const formData = new FormData();

  //     // Images
  //     // -----------------------
  //     uploadedImages.forEach((img, index) => {
  //       formData.append("images", img.croppedFile || img.file);
  //       formData.append(`items[${index}][size]`, img.size);
  //       formData.append(`items[${index}][paper]`, img.paper);
  //       formData.append(`items[${index}][quantity]`, img.quantity);
  //       formData.append(`items[${index}][cropped]`, img.cropped);

  //       if (img.cropData) {
  //         formData.append(
  //           `items[${index}][cropData]`,
  //           JSON.stringify(img.cropData)
  //         );
  //       }
  //     });

  //     // Address
  //     // -----------------------
  //     Object.entries(deliveryAddress).forEach(([key, value]) => {
  //       formData.append(`deliveryAddress[${key}]`, value);
  //     });

  //     // Pricing
  //     // -----------------------
  //     formData.append("pricing[subtotal]", currentTotals.subtotal);
  //     formData.append("pricing[discount]", currentTotals.discount);
  //     formData.append("pricing[deliveryCharge]", currentTotals.deliveryCharge);
  //     formData.append("pricing[total]", currentTotals.total);

  //     // Payment
  //     // -----------------------
  //     formData.append("paymentMethod", paymentMethod);
  //     formData.append("promoCode", promoCodeInput);

  //     console.log("=== CHECKOUT FORM DATA ===");
  //     for (let pair of formData.entries()) {
  //       console.log(pair[0], pair[1]);
  //     }

  //     console.log("Uploaded Images:", uploadedImages);
  //     console.log("Delivery Address:", deliveryAddress);
  //     console.log("Pricing:", currentTotals);
  //     console.log("Payment Method:", paymentMethod);
  //     console.log("Promo Code:", promoCodeInput);

  //     // api call
  //     const res = await addStandardPrintApi(formData);

  //     if (res.status !== 200 && res.status !== 201) {
  //       throw new Error("Order failed");
  //     }

  //     console.log("Order saved:", res.data);

  //     // Show success modal instead of alert
  //     setSuccessMessage("Order Placed Successfully!");
  //     setSuccessSubMessage(
  //       paymentMethod === "cash_on_delivery"
  //         ? "Your order has been confirmed. Pay cash on delivery!"
  //         : "Thank you for your payment. We'll process your order shortly!"
  //     );
  //     setShowSuccessModal(true);
  //   } catch (error) {
  //     console.error("Checkout error:", error);

  //     // Handle rate limiting errors
  //     if (error.response?.status === 429) {
  //       setSuccessMessage("Too Many Requests");
  //       setSuccessSubMessage(
  //         "You've submitted too many orders. Please try again later."
  //       );
  //     } else if (error.response?.status === 400) {
  //       // Validation errors from backend
  //       setSuccessMessage("Invalid Information");
  //       setSuccessSubMessage(
  //         error.response?.data?.message ||
  //           "Please check your information and try again."
  //       );
  //     } else {
  //       setSuccessMessage("Order Failed");
  //       setSuccessSubMessage("Something went wrong. Please try again.");
  //     }
  //     setShowSuccessModal(true);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const getPricePerImage = (size, paper) => {
    let price = 1.25;
    if (size === "10x15") price = 1.25;
    else if (size === "13x18") price = 2.50;
    else if (size === "16x21") price = 3.25;
    else if (size === "20x25") price = 5;
    else if (size === "20x30") price = 7;

    if (paper === "Glossy") price += 2;
    return price;
  };

  // Recalculate totals when quantities change
  const recalculateTotals = (images) => {
    const subtotal = images.reduce((total, img) => {
      return total + getPricePerImage(img.size, img.paper) * img.quantity;
    }, 0);
    const deliveryCharge = 29;
    const discount = promoApplied ? subtotal * 0.1 : 0;
    const newTotals = {
      subtotal,
      deliveryCharge,
      discount,
      total: subtotal + deliveryCharge - discount,
    };
    setCurrentTotals(newTotals);
    return newTotals;
  };

  // Update quantity for a specific image
  const updateQuantity = (index, delta) => {
    setUploadedImages((prevImages) => {
      const newImages = [...prevImages];
      const newQuantity = Math.max(1, newImages[index].quantity + delta);
      newImages[index] = { ...newImages[index], quantity: newQuantity };
      recalculateTotals(newImages);
      return newImages;
    });
  };

  // Navigate back to upload page with existing data
  const handleAddMorePhotos = () => {
    navigate("/image/upload", {
      state: {
        existingImages: uploadedImages,
        promoCode: promoCodeInput,
        size: uploadedImages[0]?.size || "10x15",
        paperType: uploadedImages[0]?.paper || "Luster",
      },
    });
  };

  // Handle success modal close
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Navigate to home after closing modal
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  // Handle card payment success
  const handlePaymentSuccess = async (paymentData) => {
    const formData = new FormData();

    uploadedImages.forEach((img, index) => {
      formData.append("images", img.croppedFile || img.file);
      formData.append(`items[${index}][size]`, img.size);
      formData.append(`items[${index}][paper]`, img.paper);
      formData.append(`items[${index}][quantity]`, img.quantity);
    });

    Object.entries(deliveryAddress).forEach(([key, value]) => {
      formData.append(`deliveryAddress[${key}]`, value);
    });

    formData.append("paymentMethod", "card_payment");
    formData.append("paymentId", paymentData.paymentId);
    formData.append("promoCode", promoCodeInput);

    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      body: formData,
    });

    setSuccessMessage("Payment Successful!");
    setSuccessSubMessage(
      "Your order has been confirmed. Thank you for shopping with us!"
    );
    setShowSuccessModal(true);
  };

  const handlePaymentError = (error) => {
    setSuccessMessage("Payment Failed");
    setSuccessSubMessage(
      "Please try again or choose a different payment method."
    );
    setShowSuccessModal(true);
    setShowPaymentForm(false);
  };

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navbar />

      <div className="pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >

          <h1 className="text-4xl font-bold text-[#E6C2A1] mb-2">Checkout</h1>
          <p className="text-gray-400">
            Review your order and complete your purchase
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl shadow-lg p-6 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#E6C2A1] to-[#d4ac88] rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#E6C2A1]">
                    Order Summary
                  </h2>
                  <p className="text-sm text-gray-400">
                    {uploadedImages.length} item
                    {uploadedImages.length !== 1 ? "s" : ""} in your order
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {imagesWithPreview.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img
                        src={image.preview}
                        alt={`Order item ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold mb-1">
                        Photo Print
                      </h3>
                      <div className="space-y-1 text-sm text-gray-400">
                        <p>
                          Size:{" "}
                          <span className="text-white">{image.size} cm</span>
                        </p>
                        <p>
                          Paper:{" "}
                          <span className="text-white">{image.paper}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span>Quantity:</span>
                          <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(index, -1)}
                              disabled={image.quantity <= 1}
                              className="w-6 h-6 bg-white/20 hover:bg-[#E6C2A1] hover:text-black rounded flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/20 disabled:hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-white font-semibold min-w-[2rem] text-center">
                              {image.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(index, 1)}
                              className="w-6 h-6 bg-white/20 hover:bg-[#E6C2A1] hover:text-black rounded flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-1">Subtotal</p>
                      <p className="text-lg font-bold text-[#E6C2A1]">
                        AED{" "}
                        {(
                          getPricePerImage(image.size, image.paper) *
                          image.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Add More Photos Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: imagesWithPreview.length * 0.1 }}
                  onClick={handleAddMorePhotos}
                  className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-lg border-2 border-dashed border-[#E6C2A1]/30 hover:border-[#E6C2A1] transition-all flex items-center justify-center gap-2 text-[#E6C2A1] font-semibold"
                >
                  <Upload className="w-5 h-5" />
                  Add More Photos
                </motion.button>
              </div>
            </motion.div>

            {/* Delivery Address Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl shadow-lg p-6 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#E6C2A1] to-[#d4ac88] rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#E6C2A1]">
                    Delivery Address
                  </h2>
                  <p className="text-sm text-gray-400">
                    Enter your delivery details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      formErrors.fullName ? "border-red-500" : "border-white/10"
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
                  />
                  {formErrors.fullName && (
                    <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={deliveryAddress.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    placeholder="+971 50 123 4567"
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      formErrors.phoneNumber
                        ? "border-red-500"
                        : "border-white/10"
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
                  />
                  {!formErrors.phoneNumber && (
                    <p className="text-gray-500 text-xs mt-1">
                      Include country code (e.g., +971 for UAE)
                    </p>
                  )}
                  {formErrors.phoneNumber && (
                    <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={deliveryAddress.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      formErrors.email ? "border-red-500" : "border-white/10"
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
                  />
                  {formErrors.email && (
                    <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Address Line 1 */}
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.addressLine1}
                    onChange={(e) =>
                      handleInputChange("addressLine1", e.target.value)
                    }
                    placeholder="Street address, P.O. box"
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      formErrors.addressLine1
                        ? "border-red-500"
                        : "border-white/10"
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
                  />
                  {formErrors.addressLine1 && (
                    <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.addressLine1}
                    </p>
                  )}
                </div>

                {/* Address Line 2 */}
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.addressLine2}
                    onChange={(e) =>
                      handleInputChange("addressLine2", e.target.value)
                    }
                    placeholder="Apartment, suite, unit, building, floor, etc."
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
                    City *
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Dubai"
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      formErrors.city ? "border-red-500" : "border-white/10"
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
                  />
                  {formErrors.city && (
                    <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.city}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="Dubai"
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      formErrors.state ? "border-red-500" : "border-white/10"
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
                  />
                  {formErrors.state && (
                    <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.state}
                    </p>
                  )}
                </div>

                {/* ZIP Code */}
                <div>
                  <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
                    ZIP/Postal Code *
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress.zipCode}
                    onChange={(e) =>
                      handleInputChange("zipCode", e.target.value)
                    }
                    placeholder="00000"
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      formErrors.zipCode ? "border-red-500" : "border-white/10"
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
                  />
                  {formErrors.zipCode && (
                    <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.zipCode}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label className="text-sm font-semibold text-[#E6C2A1] mb-2 block">
                    Country *
                  </label>
                  <select
                    value={deliveryAddress.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                      formErrors.country ? "border-red-500" : "border-white/10"
                    } text-white focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all`}
                  >
                    <option
                      value="United Arab Emirates"
                      className="bg-[#141414]"
                    >
                      United Arab Emirates
                    </option>
                    <option value="Saudi Arabia" className="bg-[#141414]">
                      Saudi Arabia
                    </option>
                    <option value="Qatar" className="bg-[#141414]">
                      Qatar
                    </option>
                    <option value="Kuwait" className="bg-[#141414]">
                      Kuwait
                    </option>
                    <option value="Bahrain" className="bg-[#141414]">
                      Bahrain
                    </option>
                    <option value="Oman" className="bg-[#141414]">
                      Oman
                    </option>
                  </select>
                  {formErrors.country && (
                    <p className="error-message text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.country}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Promo Code Section */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={promoCodeInput}
                  onChange={(e) => {
                    setPromoCodeInput(e.target.value.toUpperCase());
                    setPromoError("");
                  }}
                  placeholder="Enter promo code"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] transition-all uppercase"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApplyPromo}
                  disabled={isApplyingPromo}
                  className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition-all ${
                    isApplyingPromo
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#E6C2A1] to-[#d4ac88] hover:from-[#d4ac88] hover:to-[#E6C2A1] text-black shadow-lg"
                  }`}
                >
                  {isApplyingPromo ? (
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  ) : (
                    "Apply"
                  )}
                </motion.button>
              </div>

              {promoError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm flex items-center gap-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  {promoError}
                </motion.p>
              )}

              {promoApplied && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 text-sm font-semibold">
                    Promo code applied successfully!
                  </span>
                </motion.div>
              )}

              <div className="bg-gradient-to-r from-[#E6C2A1]/10 to-transparent border-l-4 border-[#E6C2A1] rounded-lg p-4">
                <p className="text-sm text-gray-300 mb-2">
                  <span className="font-semibold text-[#E6C2A1]">
                    Try these codes:
                  </span>
                </p>
                <div className="space-y-1 text-xs text-gray-400">
                  <p>• SAVE10 - Get 10% off</p>
                  <p>• SAVE15 - Get 15% off</p>
                  <p>• FIRSTORDER - Get 25% off your first order</p>
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#1f1d1b] backdrop-blur-xl rounded-xl shadow-lg p-6 border border-[#3a322b]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#E6C2A1] to-[#d4ac88] rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#E6C2A1]">
                    Payment Method
                  </h2>
                  <p className="text-sm text-gray-400">
                    Choose your payment option
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Cash on Delivery */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod("cash_on_delivery")}
                  className={`
        relative p-6 rounded-xl border-2 transition-all text-left
        outline-none focus:outline-none focus:ring-0
        ${
          paymentMethod === "cash_on_delivery"
            ? "bg-gradient-to-br from-[#E6C2A1]/20 to-transparent border-[#E6C2A1] shadow-lg shadow-[#E6C2A1]/20"
            : "bg-[#1f1d1b] border-[#3a322b] hover:border-[#5a4d3f]"
        }
      `}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        paymentMethod === "cash_on_delivery"
                          ? "bg-gradient-to-br from-[#E6C2A1] to-[#d4ac88]"
                          : "bg-[#3a322b]"
                      }`}
                    >
                      <Banknote
                        className={`w-6 h-6 ${
                          paymentMethod === "cash_on_delivery"
                            ? "text-black"
                            : "text-[#E6C2A1]"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">
                        Cash on Delivery
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Pay when you receive your order
                      </p>
                    </div>
                    {paymentMethod === "cash_on_delivery" && (
                      <CheckCircle className="w-6 h-6 text-[#E6C2A1]" />
                    )}
                  </div>
                </motion.button>

                {/* Card Payment */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod("card_payment")}
                  className={`
        relative p-6 rounded-xl border-2 transition-all text-left
        outline-none focus:outline-none focus:ring-0
        ${
          paymentMethod === "card_payment"
            ? "bg-gradient-to-br from-[#E6C2A1]/20 to-transparent border-[#E6C2A1] shadow-lg shadow-[#E6C2A1]/20"
            : "bg-[#1f1d1b] border-[#3a322b] hover:border-[#5a4d3f]"
        }
      `}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        paymentMethod === "card_payment"
                          ? "bg-gradient-to-br from-[#E6C2A1] to-[#d4ac88]"
                          : "bg-[#3a322b]"
                      }`}
                    >
                      <CreditCard
                        className={`w-6 h-6 ${
                          paymentMethod === "card_payment"
                            ? "text-black"
                            : "text-[#E6C2A1]"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">
                        Card Payment
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Pay securely with your card
                      </p>
                    </div>
                    {paymentMethod === "card_payment" && (
                      <CheckCircle className="w-6 h-6 text-[#E6C2A1]" />
                    )}
                  </div>
                </motion.button>
              </div>
            </motion.div>

            {/* Stripe Payment Form (shown when card payment is selected) */}
            <AnimatePresence>
              {showPaymentForm && paymentMethod === "card_payment" && (
                <motion.div
                  id="payment-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.4 }}
                >
                  <StripePayment
                    amount={currentTotals.total}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Sidebar - Order Total */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl shadow-lg p-6 border border-white/10 sticky top-24"
            >
              <h3 className="text-xl font-bold text-[#E6C2A1] mb-6">
                Order Total
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    AED {currentTotals.subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-300">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Delivery Charges
                  </span>
                  <span className="font-semibold">
                    AED {currentTotals.deliveryCharge.toFixed(2)}
                  </span>
                </div>

                {currentTotals.discount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-between text-emerald-400"
                  >
                    <span className="flex items-center gap-1">
                      Discount
                      {promoCodeInput && (
                        <span className="text-xs bg-emerald-500/20 px-2 py-0.5 rounded">
                          {promoCodeInput}
                        </span>
                      )}
                    </span>
                    <span className="font-semibold">
                      - AED {currentTotals.discount.toFixed(2)}
                    </span>
                  </motion.div>
                )}

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-semibold text-white">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-[#E6C2A1]">
                      AED {currentTotals.total.toFixed(2)}
                    </span>
                  </div>
                  {currentTotals.discount > 0 && (
                    <p className="text-xs text-emerald-400 text-right mt-1">
                      You saved AED {currentTotals.discount.toFixed(2)}!
                    </p>
                  )}
                </div>
              </div>

              {/* payment with cold start issue solved */}
              <motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  onClick={handlePlaceOrder}
  disabled={isSubmitting || showPaymentForm || serverWaking}
  className={`
    w-full py-4 rounded-xl font-bold text-lg transition-all
    flex items-center justify-center gap-3
    ${
      isSubmitting || showPaymentForm || serverWaking
        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
        : "bg-gradient-to-r from-[#E6C2A1] to-[#d4ac88] hover:from-[#d4ac88] hover:to-[#E6C2A1] text-black shadow-xl shadow-[#E6C2A1]/30"
    }
  `}
>
  {serverWaking ? (
    <>
      <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
      Waking server...
    </>
  ) : isSubmitting ? (
    <>
      <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
      Processing...
    </>
  ) : showPaymentForm ? (
    <>
      <CheckCircle className="w-5 h-5" />
      Complete Payment Below
    </>
  ) : (
    <>
      <ShoppingBag className="w-5 h-5" />
      {paymentMethod === "card_payment"
        ? "Proceed to Payment"
        : "Place Order"}
    </>
  )}
</motion.button>


              {/* <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlaceOrder}
                disabled={isSubmitting || showPaymentForm}
                className={`
                  w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3
                  ${
                    isSubmitting || showPaymentForm
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#E6C2A1] to-[#d4ac88] hover:from-[#d4ac88] hover:to-[#E6C2A1] text-black shadow-xl shadow-[#E6C2A1]/30"
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : showPaymentForm ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Complete Payment Below
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    {paymentMethod === "card_payment"
                      ? "Proceed to Payment"
                      : "Place Order"}
                  </>
                )}
              </motion.button> */}

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Free shipping on orders over AED 50</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Delivery within 3-5 business days</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {serverWaking && (
  <p className="text-xs text-gray-400 mt-2 text-center">
    First request may take a few seconds while our server starts.
  </p>
)}


      {/* Success Modal */}
      <OrderSuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        message={successMessage}
        subMessage={successSubMessage}
      />
    </div>
  );
}
