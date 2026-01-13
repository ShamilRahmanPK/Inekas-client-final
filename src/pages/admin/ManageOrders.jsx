import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiXCircle, FiArrowLeft, FiDownload } from "react-icons/fi";
import { getAllOrdersApi, updateOrderStatusApi } from "../../services/allAPI";
import { useNavigate } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import CircularProgress from "@mui/material/CircularProgress";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loadingStatusId, setLoadingStatusId] = useState(null); 

  const navigate = useNavigate();

  /* ---------------- FETCH ORDERS ---------------- */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await getAllOrdersApi();
        if (result.status === 200) {
          setOrders(result.data);
          console.log(result.data);
        }
      } catch (error) {
        console.error("API error:", error);
      }
    };
    fetchOrders();
  }, []);

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredOrders = orders.filter((order) => {
    const statusMatch = filter === "all" || order.status === filter;

    const searchMatch =
      order.deliveryAddress.fullName
        .toLowerCase()
        .includes(search.toLowerCase()) || order._id.includes(search);

    return statusMatch && searchMatch;
  });

  /* ---------------- STATUS UPDATE ---------------- */
  const handleStatusUpdate = async (orderId, newStatus) => {
    if (loadingStatusId) return; 
    try {
      setLoadingStatusId(orderId);

      const res = await updateOrderStatusApi(orderId, { status: newStatus });

      if (res.status === 200) {
        // Update order list
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );

        // Update modal
        setSelectedOrder((prev) =>
          prev ? { ...prev, status: newStatus } : prev
        );

        // Close modal automatically
        setTimeout(() => setSelectedOrder(null), 500);
      }
    } catch (error) {
      console.error("Status update failed", error);
    } finally {
      setLoadingStatusId(null); 
    }
  };

  /* ---------------- DOWNLOAD ORDER ---------------- */
  const downloadOrder = async (order) => {
    const zip = new JSZip();
    const folder = zip.folder(`order-${order._id}`);

    const orderText = `
ORDER ID: ${order._id}
STATUS: ${order.status.toUpperCase()}

CUSTOMER DETAILS
----------------
Name: ${order.deliveryAddress.fullName}
Phone: ${order.deliveryAddress.phoneNumber}
Email: ${order.deliveryAddress.email}

ADDRESS
-------
${order.deliveryAddress.addressLine1}
${order.deliveryAddress.addressLine2}
${order.deliveryAddress.city}, ${order.deliveryAddress.state}
${order.deliveryAddress.country} - ${order.deliveryAddress.zipCode}

PAYMENT
-------
Method: ${order.paymentMethod.replaceAll("_", " ")}

PRICING
-------
Subtotal: ${order.pricing.subtotal}
Discount: ${order.pricing.discount}
Delivery Charge: ${order.pricing.deliveryCharge}
TOTAL: ${order.pricing.total}

ORDER ITEMS
-----------
${order.images
  .map(
    (img, i) =>
      `${i + 1}. Size: ${img.size}, Paper: ${img.paper}, Quantity: ${
        img.quantity
      }`
  )
  .join("\n")}
`;

    folder.file("order-details.txt", orderText);

    for (let img of order.images) {
      const response = await fetch(img.url);
      const blob = await response.blob();
      folder.file(
        `image-${img.size}-${img.paper}-Qty-${img.quantity}.jpg`,
        blob
      );
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `order-${order._id}.zip`);
  };

  return (
    <div className="w-full min-h-screen bg-[#141414] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* BACK */}
        <button
          onClick={() => navigate("/admin/home")}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6"
        >
          <FiArrowLeft /> Back to Dashboard
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#E6C2A1] mb-4 sm:mb-6">
          Manage Orders
        </h1>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col sm:flex-col md:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
          <input
            type="text"
            placeholder="Search by name or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] px-3 sm:px-4 py-2 rounded-lg text-sm"
          />

          <div className="flex gap-2 flex-wrap justify-start sm:justify-start">
            {["all", "pending", "processing", "completed", "cancelled"].map(
              (s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-2.5 sm:px-3 py-1.5 sm:py-1 text-xs rounded-lg capitalize whitespace-nowrap ${
                    filter === s
                      ? "bg-[#E6C2A1] text-black"
                      : "bg-[#1a1a1a] border border-[#2a2a2a]"
                  }`}
                >
                  {s}
                </button>
              )
            )}
          </div>
        </div>

        {/* ORDER CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredOrders.map((order) => (
            <motion.div
              key={order._id}
              onClick={() => setSelectedOrder(order)}
              whileHover={{ scale: 1.02 }}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3 sm:p-4 cursor-pointer hover:border-[#E6C2A1]/30 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-sm sm:text-base text-[#E6C2A1] truncate">
                  {order.deliveryAddress.fullName}
                </h2>

                <span
                  className={`text-xs px-2 py-1 rounded-lg capitalize ${
                    order.status === "pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : order.status === "completed"
                      ? "bg-green-500/20 text-green-400"
                      : order.status === "processing"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-xs text-gray-400 mt-1">
                Order ID: {order._id.slice(-6)}
              </p>
              <p className="text-xs text-gray-400 capitalize truncate">
                Payment: {order.paymentMethod.replaceAll("_", " ")}
              </p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 font-semibold">
                Total: ${order.pricing.total}
              </p>
            </motion.div>
          ))}
        </div>

        {/* MODAL */}
        <AnimatePresence>
          {selectedOrder && (
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-[#181818] rounded-xl sm:rounded-2xl max-w-3xl w-full p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto shadow-2xl border border-[#2a2a2a]"
              >
                {/* HEADER */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-[#E6C2A1] truncate pr-2">
                    {selectedOrder.deliveryAddress.fullName}'s Order
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-white text-2xl flex-shrink-0"
                  >
                    &times;
                  </button>
                </div>

                {/* ADDRESS */}
                <div className="mb-4 sm:mb-5 bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base text-[#E6C2A1]">
                    Delivery Address
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300">
                    {selectedOrder.deliveryAddress.addressLine1}
                  </p>
                  {selectedOrder.deliveryAddress.addressLine2 && (
                    <p className="text-xs sm:text-sm text-gray-300">
                      {selectedOrder.deliveryAddress.addressLine2}
                    </p>
                  )}
                  <p className="text-xs sm:text-sm text-gray-300">
                    {selectedOrder.deliveryAddress.city},{" "}
                    {selectedOrder.deliveryAddress.state}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300">
                    {selectedOrder.deliveryAddress.country}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300 mt-2">
                    Phone: {selectedOrder.deliveryAddress.phoneNumber}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-300 break-all">
                    Email: {selectedOrder.deliveryAddress.email}
                  </p>
                </div>

                {/* IMAGES */}
                <div className="mb-4 sm:mb-5 bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <h3 className="font-semibold mb-3 text-sm sm:text-base text-[#E6C2A1]">
                    Order Images
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {selectedOrder.images.map((img) => (
                      <div
                        key={img._id}
                        className="relative rounded-lg overflow-hidden border border-[#2a2a2a]"
                      >
                        <img
                          src={img.url}
                          alt="order"
                          className="w-full h-32 sm:h-36 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-black/70 text-xs sm:text-sm p-1.5 sm:p-2">
                          {img.size} | {img.paper} | Qty: {img.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PRICING */}
                <div className="mb-4 sm:mb-5 bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base text-[#E6C2A1]">
                    Pricing & Payment
                  </h3>
                  <div className="text-xs sm:text-sm space-y-1 text-gray-300">
                    <p>Subtotal: ${selectedOrder.pricing.subtotal}</p>
                    <p>Discount: ${selectedOrder.pricing.discount}</p>
                    <p>Delivery: ${selectedOrder.pricing.deliveryCharge}</p>
                    <p className="font-semibold text-white text-sm sm:text-base">
                      Total: ${selectedOrder.pricing.total}
                    </p>
                    <p className="text-xs text-gray-400 capitalize mt-2">
                      Payment Method:{" "}
                      {selectedOrder.paymentMethod.replaceAll("_", " ")}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
                  {selectedOrder.status === "pending" ? (
                    <button
                      onClick={() =>
                        handleStatusUpdate(selectedOrder._id, "processing")
                      }
                      disabled={loadingStatusId === selectedOrder._id}
                      className="flex-1 min-w-[120px] bg-yellow-500 hover:bg-yellow-600 text-black py-2.5 sm:py-2 rounded-lg sm:rounded-xl font-medium transition flex justify-center items-center gap-2 text-sm sm:text-base"
                    >
                      {loadingStatusId === selectedOrder._id ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        "Take Order"
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleStatusUpdate(selectedOrder._id, "completed")
                      }
                      disabled={loadingStatusId === selectedOrder._id}
                      className="flex-1 min-w-[120px] bg-green-500 hover:bg-green-600 text-black py-2.5 sm:py-2 rounded-lg sm:rounded-xl font-medium transition flex justify-center items-center gap-2 text-sm sm:text-base"
                    >
                      {loadingStatusId === selectedOrder._id ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        "Completed"
                      )}
                    </button>
                  )}

                  {/* CANCEL BUTTON */}
                  <button
                    onClick={() =>
                      handleStatusUpdate(selectedOrder._id, "cancelled")
                    }
                    className="flex-1 min-w-[120px] bg-red-500 hover:bg-red-600 text-white py-2.5 sm:py-2 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition text-sm sm:text-base"
                  >
                    <FiXCircle /> Cancel
                  </button>

                  {/* DOWNLOAD BUTTON */}
                  <button
                    onClick={() => downloadOrder(selectedOrder)}
                    className="flex-1 min-w-[120px] bg-[#E6C2A1] hover:bg-[#ddb08a] text-black py-2.5 sm:py-2 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 font-medium transition text-sm sm:text-base"
                  >
                    <FiDownload /> Download Order
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ManageOrders;
