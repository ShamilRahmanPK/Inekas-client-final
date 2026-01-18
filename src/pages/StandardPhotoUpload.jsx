import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdFileUpload,
  MdClose,
  MdAdd,
  MdInfoOutline,
  MdCheck,
  MdRotate90DegreesCw,
  MdUndo,
} from "react-icons/md";
import { Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import Navbar from "../components/Navbar";
import InfoModal from "../components/InfoModal";

export default function StandardPhotoUpload() {
  const navigate = useNavigate();
  const location = useLocation();

  const sizes = ["10x15", "13x18", "16x21", "20x25", "20x30"];
  
  const initialSize = location.state?.size || "10x15";
  const initialPaper = location.state?.paperType || "Luster";
  const initialPromo = location.state?.promoCode || "";
  const existingImages = location.state?.existingImages || [];

  const [uploadedImages, setUploadedImages] = useState([]);
  const [defaultSize, setDefaultSize] = useState(initialSize);
  const [defaultPaper, setDefaultPaper] = useState(initialPaper);
  const [promoCode, setPromoCode] = useState(initialPromo);
  const [isDragging, setIsDragging] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [cropFrameFlipped, setCropFrameFlipped] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [infoType, setInfoType] = useState("info");
  const [imageOrientation, setImageOrientation] = useState(null);
  const cropperRef = useRef(null);

  // Load existing images when coming back from checkout
  useEffect(() => {
    if (existingImages.length > 0) {
      const restoredImages = existingImages.map((img) => ({
        id: img.id || Date.now() + Math.random(),
        file: img.file,
        croppedFile: img.croppedFile || null,
        originalPreview: img.file ? URL.createObjectURL(img.file) : img.originalPreview,
        croppedPreview: img.croppedFile ? URL.createObjectURL(img.croppedFile) : img.croppedPreview,
        size: img.size,
        paper: img.paper,
        quantity: img.quantity,
        customQuantity: false,
        cropped: img.cropped || false,
        cropData: img.cropData || null,
      }));
      setUploadedImages(restoredImages);
    }
  }, []);
  const papers = ["Luster", "Glossy"];
  const quantities = [1, 5, 10, 20, 30, 40, 50, "Custom"];

  // Detect image orientation
  const detectImageOrientation = (imageSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const isPortrait = img.height > img.width;
        const isLandscape = img.width > img.height;
        resolve({ isPortrait, isLandscape, width: img.width, height: img.height });
      };
      img.src = imageSrc;
    });
  };

  // Get aspect ratio based on size and orientation
  const getAspectRatio = (size, orientation) => {
    const [width, height] = size.split("x").map(Number);
    
    if (!orientation) {
      return cropFrameFlipped ? height / width : width / height;
    }
    
    // Always match the crop frame to the image's natural orientation
    let ratio;
    if (orientation.isLandscape) {
      // For landscape images, ensure aspect ratio is > 1 (width > height)
      ratio = Math.max(width / height, height / width);
    } else if (orientation.isPortrait) {
      // For portrait images, ensure aspect ratio is < 1 (height > width)
      ratio = Math.min(width / height, height / width);
    } else {
      ratio = width / height;
    }
    
    // Flip the aspect ratio when crop frame is rotated 90° or 270°
    return cropFrameFlipped ? 1 / ratio : ratio;
  };

  const getPricePerImage = (size, paper) => {
    let price = 1.25;
    if (size === "10x15") price = 1.25;
    if (size === "13x18") price = 2.50;
    if (size === "16x21") price = 3.25;
    if (size === "20x25") price = 5;
    if (size === "20x30") price = 7;
    if (paper === "Glossy") price += 2;
    return price;
  };

  const calculateTotal = () => {
    const subtotal = uploadedImages.reduce((total, img) => {
      return total + getPricePerImage(img.size, img.paper) * img.quantity;
    }, 0);
    const deliveryCharge = 29;
    const discount = promoApplied ? subtotal * 0.1 : 0;
    return {
      subtotal,
      deliveryCharge,
      discount,
      total: subtotal + deliveryCharge - discount,
    };
  };

  const totals = calculateTotal();

  // Handle file select
  const handleFileSelect = useCallback(
    (files) => {
      const newImages = Array.from(files).map((file) => ({
        id: Date.now() + Math.random(),
        file, // original file
        croppedFile: null, // store cropped file
        originalPreview: URL.createObjectURL(file),
        croppedPreview: null,
        size: defaultSize,
        paper: defaultPaper,
        quantity: 1,
        customQuantity: false,
        cropped: false,
        cropData: null,
      }));
      setUploadedImages((prev) => [...prev, ...newImages]);
    },
    [defaultSize, defaultPaper]
  );

  // Drag & drop
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      handleFileSelect(files);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeImage = (id) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const updateImageConfig = (id, field, value) => {
    setUploadedImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, [field]: value } : img))
    );
  };

  const revertEdit = (id) => {
    setUploadedImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? {
              ...img,
              croppedPreview: null,
              croppedFile: null,
              cropped: false,
              cropData: null,
            }
          : img
      )
    );
  };

  const openEditor = async (image) => {
    setEditingImage(image);
    const savedRotation = image.cropData?.rotation || 0;
    setRotation(savedRotation);
    setCropFrameFlipped(savedRotation === 90 || savedRotation === 270);
    
    // Detect image orientation
    const orientation = await detectImageOrientation(image.originalPreview);
    setImageOrientation(orientation);
  };

  const closeEditor = () => {
    setEditingImage(null);
    setRotation(0);
    setCropFrameFlipped(false);
    setImageOrientation(null);
  };

  const handleRotate = () => {
    setRotation((r) => {
      const newRotation = (r + 90) % 360;
      // Flip the crop frame aspect ratio when rotation is 90° or 270°
      setCropFrameFlipped(newRotation === 90 || newRotation === 270);
      return newRotation;
    });
  };



  const getCroppedImg = async () => {
    if (!cropperRef.current) return null;

    // Get canvas with maximum quality settings
    const canvas = cropperRef.current.getCanvas({
      maxWidth: 4096,
      maxHeight: 4096,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high',
    });
    
    if (!canvas) return null;

    return new Promise((resolve) => {
      // Use PNG for lossless quality, perfect for printing
      canvas.toBlob(
        (blob) => {
          // Keep original filename but change extension to png
          const originalName = editingImage.file.name;
          const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
          const file = new File([blob], `${nameWithoutExt}.png`, {
            type: "image/png",
          });
          resolve(file);
        },
        "image/png"  // PNG for maximum quality
      );
    });
  };

  const applyCrop = async () => {
    if (editingImage) {
      try {
        const croppedFile = await getCroppedImg();
        
        if (!croppedFile) {
          console.error("Failed to get cropped image");
          return;
        }

        const croppedPreview = URL.createObjectURL(croppedFile);

        setUploadedImages((prev) =>
          prev.map((img) =>
            img.id === editingImage.id
              ? {
                  ...img,
                  croppedFile,
                  croppedPreview,
                  cropped: true,
                  cropData: { rotation },
                }
              : img
          )
        );

        closeEditor();
      } catch (e) {
        console.error("Error cropping image:", e);
      }
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
      setTimeout(() => setPromoApplied(false), 3000);
    }
  };

  const handleNext = () => {
    if (uploadedImages.length === 0) {
      setInfoMessage("Please upload at least one photo before proceeding.");
      setInfoType("warning");
      setShowInfoModal(true);
      return;
    }

    // Create an array of data to pass
    const imagesData = uploadedImages.map((img) => ({
      file: img.croppedFile || img.file,
      size: img.size,
      paper: img.paper,
      quantity: img.quantity,
      cropped: img.cropped,
    }));

    // Log to check
    console.log("Images data for checkout:", imagesData);
    console.log("Promo code:", promoCode);
    console.log("Totals:", totals);

    // Navigate to checkout page with state
    navigate("/checkout", {
      state: {
        uploadedImages: imagesData,
        promoCode,
        totals,
      },
    });
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
          <h1 className="text-4xl font-bold text-[#E6C2A1] mb-2">
            Upload Photos
          </h1>
          <p className="text-gray-400">
            Upload your photos and customize your print settings
          </p>
        </motion.div>

        {/* Instructions Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#E6C2A1]/10 to-transparent border-l-4 border-[#E6C2A1] rounded-lg p-6 mb-8 backdrop-blur-sm"
        >
          <h3 className="font-bold text-[#E6C2A1] mb-3 flex items-center gap-2">
            <MdInfoOutline className="w-5 h-5" />
            Instructions:
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-[#E6C2A1] mt-1">•</span>
              <span>Upload your photos using the "UPLOAD PHOTOS" button.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#E6C2A1] mt-1">•</span>
              <span>
                Select the size, quantity, and paper type for each photo.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#E6C2A1] mt-1">•</span>
              <span>
                Click on an image to crop and rotate it (optional).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#E6C2A1] mt-1">•</span>
              <span>You can apply a promo code if available.</span>
            </li>
          </ul>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {uploadedImages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`
                    relative border-4 border-dashed rounded-2xl p-12 text-center transition-all
                    ${
                      isDragging
                        ? "border-[#E6C2A1] bg-[#E6C2A1]/5"
                        : "border-[#E6C2A1]/30 bg-white/5 hover:border-[#E6C2A1]/50 backdrop-blur-xl"
                    }
                  `}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="w-20 h-20 bg-[#E6C2A1]/10 rounded-full flex items-center justify-center mb-4">
                      <MdFileUpload className="w-10 h-10 text-[#E6C2A1]" />
                    </div>
                    <span className="text-xl font-semibold text-[#E6C2A1] mb-2">
                      UPLOAD PHOTOS
                    </span>
                    <span className="text-sm text-gray-400">
                      Drag and drop or click to browse
                    </span>
                    <span className="text-xs text-gray-500 mt-2">
                      Supports: JPG, PNG, HEIC (Max 10MB each)
                    </span>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Uploaded Images Grid */}
            {uploadedImages.length > 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {uploadedImages.map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white/5 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-white/10 hover:border-[#E6C2A1]/30 transition-all"
                    >
                      {/* Image Preview */}
                      <div
                        className="relative aspect-[4/3] bg-black/30 cursor-pointer group"
                        onClick={() => openEditor(image)}
                      >
                        <img
                          src={image.croppedPreview || image.originalPreview}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white font-semibold">
                            Click to Edit
                          </span>
                        </div>
                        <MdClose
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(image.id);
                          }}
                          className="
    absolute top-2 right-2
    w-5 h-5
    text-white
    rounded-lg
    flex items-center justify-center
    shadow-lg
    hover:text-red-700
    transition-colors
    z-10
    cursor-pointer
  "
                        />

                        {!image.cropped && (
                          <div className="absolute bottom-2 left-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                            Click to Crop
                          </div>
                        )}
                        {image.cropped && (
                          <div className="absolute bottom-2 left-2 flex items-center gap-5">
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                              <MdCheck className="w-3 h-3" />
                              Cropped
                            </div>
                            <MdUndo
                              onClick={(e) => {
                                e.stopPropagation();
                                revertEdit(image.id);
                              }}
                              className="flex items-center justify-center text-white hover:text-yellow-500"
                              title="Revert to original"
                            />
                          </div>
                        )}
                      </div>

                      {/* Image Configuration */}
                      <div className="p-4 space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-[#E6C2A1] mb-1 block">
                            Size
                          </label>
                          <select
                            value={image.size}
                            onChange={(e) =>
                              updateImageConfig(
                                image.id,
                                "size",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] bg-white/5 text-white"
                          >
                            {sizes.map((size) => (
                              <option
                                key={size}
                                value={size}
                                className="bg-[#141414]"
                              >
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-[#E6C2A1] mb-1 block">
                            Paper Type
                          </label>
                          <select
                            value={image.paper}
                            onChange={(e) =>
                              updateImageConfig(
                                image.id,
                                "paper",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] bg-white/5 text-white"
                          >
                            {papers.map((paper) => (
                              <option
                                key={paper}
                                value={paper}
                                className="bg-[#141414]"
                              >
                                {paper}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-[#E6C2A1] mb-1 block">
                            Quantity
                          </label>
                          <select
                            value={
                              typeof image.quantity === "number"
                                ? image.quantity
                                : "Custom"
                            }
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === "Custom") {
                                updateImageConfig(image.id, "quantity", 1);
                                updateImageConfig(
                                  image.id,
                                  "customQuantity",
                                  true
                                );
                              } else {
                                updateImageConfig(
                                  image.id,
                                  "quantity",
                                  parseInt(val)
                                );
                                updateImageConfig(
                                  image.id,
                                  "customQuantity",
                                  false
                                );
                              }
                            }}
                            className="w-full px-3 py-2 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] bg-white/5 text-white"
                          >
                            {quantities.map((qty) => (
                              <option
                                key={qty}
                                value={qty}
                                className="bg-[#141414]"
                              >
                                {qty}
                              </option>
                            ))}
                          </select>
                          {image.customQuantity && (
                            <input
                              type="number"
                              min="1"
                              value={image.quantity === 0 ? "" : image.quantity} 
                              placeholder="Enter quantity"
                              onChange={(e) => {
                                const val = e.target.value;
                                if (val === "") {
                                  updateImageConfig(image.id, "quantity", 0);
                                } else {
                                  updateImageConfig(
                                    image.id,
                                    "quantity",
                                    parseInt(val)
                                  );
                                }
                              }}
                              className="w-full mt-2 px-3 py-2 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] bg-white/5 text-white placeholder-gray-500"
                            />
                          )}
                        </div>

                        <div className="pt-2 border-t border-white/10">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400">
                              Subtotal:
                            </span>
                            <span className="font-bold text-[#E6C2A1]">
                              AED{" "}
                              {(
                                getPricePerImage(image.size, image.paper) *
                                (typeof image.quantity === "number"
                                  ? image.quantity
                                  : 1)
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Add More Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/5 backdrop-blur-xl rounded-xl border-2 border-dashed border-[#E6C2A1]/30 hover:border-[#E6C2A1] transition-colors cursor-pointer"
                  >
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileSelect(e.target.files)}
                      className="hidden"
                      id="add-more-upload"
                    />
                    <label
                      htmlFor="add-more-upload"
                      className="cursor-pointer flex flex-col items-center justify-center h-full min-h-[300px] p-6"
                    >
                      <div className="w-16 h-16 bg-[#E6C2A1]/10 rounded-full flex items-center justify-center mb-3">
                        <MdAdd className="w-8 h-8 text-[#E6C2A1]" />
                      </div>
                      <span className="text-sm font-semibold text-[#E6C2A1]">
                        Add More Photos
                      </span>
                      <span className="text-xs text-gray-400 mt-1">
                        Click to upload
                      </span>
                    </label>
                  </motion.div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl shadow-lg p-6 border border-white/10"
            >
              <h3 className="font-bold text-[#E6C2A1] mb-4">Default Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setDefaultSize(size)}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-medium transition-all
                      ${
                        defaultSize === size
                          ? "bg-gradient-to-r from-[#E6C2A1] to-[#d4ac88] text-black shadow-lg"
                          : "bg-gradient-to-br from-[#2a2520] to-[#1f1b18] text-[#E6C2A1] border border-[#E6C2A1]/20 hover:from-[#332b25] hover:to-[#2a2520]"
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl shadow-lg p-6 border border-white/10"
            >
              <h3 className="font-bold text-[#E6C2A1] mb-4">
                Default Paper Type
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {papers.map((paper) => (
                  <button
                    key={paper}
                    onClick={() => setDefaultPaper(paper)}
                    className={`
                      px-4 py-3 rounded-lg text-sm font-medium transition-all
                      ${
                        defaultPaper === paper
                          ? "bg-gradient-to-r from-[#E6C2A1] to-[#d4ac88] text-black shadow-lg"
                          : "bg-gradient-to-br from-[#2a2520] to-[#1f1b18] text-[#E6C2A1] border border-[#E6C2A1]/20 hover:from-[#332b25] hover:to-[#2a2520]"
                      }
                    `}
                  >
                    {paper}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl shadow-lg p-6 border border-white/10"
            >
              <h3 className="font-bold text-[#E6C2A1] mb-4">Promo Code</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full px-4 py-2 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E6C2A1] bg-white/5 text-white placeholder-gray-500"
                />
                <button
                  onClick={handleApplyPromo}
                  className="w-full bg-gradient-to-r from-[#E6C2A1] to-[#d4ac88] hover:from-[#d4ac88] hover:to-[#E6C2A1] text-black py-2 rounded-lg font-semibold text-sm transition-all shadow-lg"
                >
                  APPLY
                </button>
                {promoApplied && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-400 text-xs flex items-center gap-1"
                  >
                    <MdCheck className="w-4 h-4" />
                    Promo code applied! 10% discount
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image Editor Modal */}
      <AnimatePresence>
        {editingImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-2xl max-w-4xl w-full flex flex-col overflow-hidden"
            >
              <div className="flex justify-between">
                <div></div>
                {/* Close button */}
                <MdClose
                  onClick={closeEditor}
                  className="flexjustify-end w-6 h-6 my-2 mx-2 hover:text-red-700 transition-colors cursor-pointer"
                />
              </div>

              {/* Cropper Area */}
              <div className="relative bg-black" style={{ height: "70vh" }}>
                <Cropper
                  ref={cropperRef}
                  src={editingImage.originalPreview}
                  className="advanced-cropper"
                  stencilProps={{
                    aspectRatio: getAspectRatio(editingImage.size, imageOrientation),
                    grid: true,
                    movable: true,
                    resizable: true,
                    handlers: {
                      eastNorth: true,
                      north: false,
                      westNorth: true,
                      west: false,
                      westSouth: true,
                      south: false,
                      eastSouth: true,
                      east: false,
                    },
                    lines: {
                      north: false,
                      west: false,
                      south: false,
                      east: false,
                    },
                  }}
                  imageRestriction="stencil"
                  transformImage={{
                    rotate: rotation,
                  }}
                />
                <style>{`
                  .advanced-cropper {
                    width: 100%;
                    height: 100%;
                    background: #000;
                  }
                  
                  .advanced-cropper .react-advanced-cropper-stencil {
                    border: 2px solid #ffffff;
                  }
                  
                  .advanced-cropper .react-advanced-cropper-handler {
                    width: 16px;
                    height: 16px;
                    background: #ffffff;
                    border: 2px solid #000000;
                    border-radius: 50%;
                    box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
                    transition: all 0.2s;
                  }
                  
                  .advanced-cropper .react-advanced-cropper-handler:hover {
                    width: 20px;
                    height: 20px;
                    background: #E6C2A1;
                    box-shadow: 0 0 12px rgba(230, 194, 161, 0.8);
                  }
                  
                  .advanced-cropper .react-advanced-cropper-line {
                    border-color: #ffffff;
                  }
                  
                  .advanced-cropper .react-advanced-cropper-background {
                    background: rgba(0, 0, 0, 0.6);
                  }
                  
                  .advanced-cropper .react-advanced-cropper-foreground {
                    background: transparent;
                  }
                  
                  .advanced-cropper .react-advanced-cropper-grid-line {
                    border-color: rgba(255, 255, 255, 0.3);
                  }
                `}</style>
              </div>

              {/* Bottom Controls */}
              <div className="bg-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 border-t border-gray-200">
                {/* Rotate Button */}
                <button
                  onClick={handleRotate}
                  className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2.5 bg-black hover:bg-gray-800 text-white rounded-lg font-medium text-sm sm:text-base transition-colors flex items-center justify-center gap-2"
                >
                  <MdRotate90DegreesCw className="w-5 h-5" />
                  Rotate 90°
                </button>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                  <button
                    onClick={closeEditor}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-white hover:bg-red-100 text-red-700 border border-gray-300 rounded-lg font-medium text-sm sm:text-base transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={applyCrop}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-white border border-gray-300 hover:bg-green-100 text-green-700 rounded-lg font-medium text-sm sm:text-base transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Total Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-[#E6C2A1]/20 shadow-2xl z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-0">
            {/* Total Amount Section */}
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                <span className="text-lg sm:text-2xl font-bold text-[#E6C2A1]">
                  Total Amount: AED {totals.total.toFixed(2)}
                </span>
                {totals.discount > 0 && (
                  <span className="text-xs sm:text-sm text-emerald-400 font-semibold">
                    (Saved AED {totals.discount.toFixed(2)})
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-400">
                + AED {totals.deliveryCharge} delivery charges apply
              </div>
            </div>

            {/* NEXT Button */}
            <button
              onClick={handleNext}
              disabled={uploadedImages.length === 0}
              className={`
          mt-2 sm:mt-0 px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-lg transition-all
          ${
            uploadedImages.length === 0
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-[#E6C2A1] to-[#d4ac88] hover:from-[#d4ac88] hover:to-[#E6C2A1] text-black shadow-xl shadow-[#E6C2A1]/30"
          }
        `}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      <InfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        message={infoMessage}
        type={infoType}
      />
    </div>
  );
}
