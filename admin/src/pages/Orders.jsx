// import React, { useState, useEffect } from "react";
// import { backendUrl, currency } from "../App.jsx";
// import { useOutletContext } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { assets } from "../assets/paths.js";
// import Loader from "../components/Loader.jsx";

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(true); // Loading state
//   const { token } = useOutletContext();

//   const fetchOrders = async () => {
//     if (!token) return null;
//     setLoading(true);
//     try {
//       const response = await axios.get(backendUrl + "/orders/list", {
//         headers: { token },
//       });
//       setOrders(response.data.data);
//     } catch (error) {
//       console.log(error.message);
//       toast.error(error.response?.data?.message || "Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProductList = async () => {
//     try {
//       const response = await axios.get(backendUrl + "/products/list");
//       if (response.data.success) {
//         setList(response.data.data);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error.message);
//       toast.error(error.message);
//     }
//   };

//   const updateStatusHandler = async (e, orderId) => {
//     try {
//       const response = await axios.post(
//         backendUrl + "/orders/status",
//         { orderId, status: e.target.value },
//         {
//           headers: { token },
//         }
//       );
//       if (response.data.success) {
//         toast.success(response.data.message);
//         await fetchOrders();
//       }
//     } catch (error) {
//       console.log(error.message);
//       toast.error(error.response.data.message);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//     fetchProductList();
//   }, [token]);

//   return (
//     <div>
//       <h3>Order Page</h3>
//       {loading ? (
//         <Loader/>
//       ) : (
//         <div>
//           {orders.length > 0 ? (
//             orders.map((order, index) => (
//               <div
//                 className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
//                 key={index}
//               >
//                 <img className="w-12" src={assets.itemIcon} alt="" />
//                 <div>
//                   {order.items.map((item, idx) => {
//                     const product = list.find((p) => p._id === item.productId);
//                     const price = product ? product.price : "N/A";
//                     return (
//                       <p key={idx} className="py-0.5">
//                         {product?.name} x {item.quantity} <span>{item.size}</span> - {currency}{price}
//                       </p>
//                     );
//                   })}
//                   <p className="font-medium py-1">{order.address.firstName + " " + order.address.lastName}</p>
//                   <div>
//                     <p>{order.address.street + ","}</p>
//                     <p>
//                       {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}
//                     </p>
//                     <p>{order.address.phone}</p>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
//                   <p className="mt-3">Method: {order.paymentMethod}</p>
//                   <p>Payment: {order.payment.status ? "Done" : "Pending"}</p>
//                   <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//                 </div>
//                 <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>
//                 <select onChange={(e) => updateStatusHandler(e, order._id)} value={order.status} className="bg-white p-2 cursor-pointer font-semibold">
//                   <option value="Order Placed">Order Placed</option>
//                   <option value="Shipped">Shipped</option>
//                   <option value="Delivered">Delivered</option>
//                   <option value="Cancelled">Cancelled</option>
//                 </select>
//               </div>
//             ))
//           ) : (
//             <p>No orders found</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Orders;















// import React, { useState, useEffect } from "react";
// import { backendUrl, currency } from "../App.jsx";
// import { useOutletContext } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { assets } from "../assets/paths.js";
// import Loader from "../components/Loader.jsx";
// import { Package, User, MapPin, CreditCard, Calendar, CheckCircle, Clock, ChevronDown } from "lucide-react";

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(true); // Loading state
//   const { token } = useOutletContext();

//   const fetchOrders = async () => {
//     if (!token) return null;
//     setLoading(true);
//     try {
//       const response = await axios.get(backendUrl + "/orders/list", {
//         headers: { token },
//       });
//       setOrders(response.data.data);
//     } catch (error) {
//       console.log(error.message);
//       toast.error(error.response?.data?.message || "Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProductList = async () => {
//     try {
//       const response = await axios.get(backendUrl + "/products/list");
//       if (response.data.success) {
//         setList(response.data.data);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error.message);
//       toast.error(error.message);
//     }
//   };

//   const updateStatusHandler = async (e, orderId) => {
//     try {
//       const response = await axios.post(
//         backendUrl + "/orders/status",
//         { orderId, status: e.target.value },
//         {
//           headers: { token },
//         }
//       );
//       if (response.data.success) {
//         toast.success(response.data.message);
//         await fetchOrders();
//       }
//     } catch (error) {
//       console.log(error.message);
//       toast.error(error.response?.data?.message);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//     fetchProductList();
//   }, [token]);

//   const StatusBadge = ({ status }) => {
//     const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold";
//     const statusStyles = {
//       "Order Placed": "bg-blue-100 text-blue-800",
//       Shipped: "bg-yellow-100 text-yellow-800",
//       Delivered: "bg-green-100 text-green-800",
//       Cancelled: "bg-red-100 text-red-800",
//     };
//     return <span className={`${baseClasses} ${statusStyles[status]}`}>{status}</span>;
//   };

//   return (
//     <div className="min-h-screen bg-white text-gray-900">
//       <main className="max-w-7xl mx-auto p-6">
//         <h3 className="text-2xl font-semibold mb-6 border-b border-black pb-2">Order Page</h3>
//         {loading ? (
//           <div className="flex justify-center items-center h-48">
//             <Loader />
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {orders.length > 0 ? (
//               orders.map((order, index) => (
//                 <div
//                   key={index}
//                   className="border border-black rounded-md p-5 shadow-sm hover:shadow-md transition-shadow bg-white"
//                 >
//                   <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start text-sm text-gray-800">
//                     <div className="flex justify-center">
//                       <img className="w-12" src={assets.itemIcon} alt="Item Icon" />
//                     </div>
//                     <div>
//                       {order.items.map((item, idx) => {
//                         const product = list.find((p) => p._id === item.productId);
//                         const price = product ? product.price : "N/A";
//                         return (
//                           <p key={idx} className="py-1">
//                             <span className="font-medium">{product?.name || "Unknown Product"}</span> x {item.quantity}{" "}
//                             <span className="italic text-gray-500">{item.size}</span> - {currency}{price}
//                           </p>
//                         );
//                       })}
//                       <p className="font-semibold mt-3">
//                         {order.address.firstName} {order.address.lastName}
//                       </p>
//                       <div className="text-gray-600 text-xs mt-1">
//                         <p>{order.address.street},</p>
//                         <p>
//                           {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
//                         </p>
//                         <p>{order.address.phone}</p>
//                       </div>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-sm">Items: {order.items.length}</p>
//                       <p className="mt-2">Method: {order.paymentMethod}</p>
//                       <p>Payment: {order.payment.status ? (
//                         <span className="text-green-600 font-semibold">Done</span>
//                       ) : (
//                         <span className="text-red-600 font-semibold">Pending</span>
//                       )}</p>
//                       <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//                     </div>
//                     <p className="text-center font-semibold text-lg">
//                       {currency}{order.amount}
//                     </p>
//                     <div className="flex flex-col items-center">
//                       <select
//                         onChange={(e) => updateStatusHandler(e, order._id)}
//                         value={order.status}
//                         className="bg-white border border-black rounded-md p-2 cursor-pointer font-semibold text-sm w-full max-w-[150px]"
//                       >
//                         <option value="Order Placed">Order Placed</option>
//                         <option value="Shipped">Shipped</option>
//                         <option value="Delivered">Delivered</option>
//                         <option value="Cancelled">Cancelled</option>
//                       </select>
//                       <StatusBadge status={order.status} />
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-600">No orders found</p>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default Orders;












import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";
import { useOutletContext } from "react-router-dom";
import { PackageCheck } from "lucide-react";

// --- Loader Component ---
const Loader = () => (
  <div className="flex justify-center items-center py-10">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

const Orders = () => {
  const { token } = useOutletContext();
  const [orders, setOrders] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Orders
  const fetchOrders = async () => {
    if (!token) {
      toast.error("Authentication token missing");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/orders/list`, {
        headers: { token },
      });
      if (response.data.success) {
        console.log("first",response.data.data)
        setOrders(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Product List
  const fetchProductList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/products/list`);
      console.log(response.data.data)
      if (response.data.success) {
        setProductList(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch product list");
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
      toast.error(error.message || "Failed to fetch product list");
    }
  };

  // ✅ Update Order Status
  const updateStatusHandler = async (e, orderId) => {
    const newStatus = e.target.value;
    try {
      const response = await axios.post(
        `${backendUrl}/orders/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchOrders();
      } else {
        toast.error(response.data.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(
        error.response?.data?.message || "Failed to update order status"
      );
    }
  };

  // ✅ Initial Fetch
useEffect(() => {
  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([fetchOrders(), fetchProductList()]);
    setLoading(false);
  };
  fetchAll();
}, [token]);


  return (
    <div className="min-h-screen">
      <div className="mb-4">
          <h1 className="text-2xl font-light text-gray-900 mb-2">All Orders</h1>
          <div className="h-px bg-gray-900 w-24"></div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="space-y-6">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                className="bg-white border border-gray-800/60 shadow-sm p-4 sm:p-6 grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start text-sm text-gray-700"
                key={order._id}
              >
                {/* --- Order Icon --- */}
                <div className="flex items-center justify-center md:justify-start">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 flex items-center justify-center text-gray-400 text-xs">
                    <PackageCheck />
                  </div>
                </div>

                {/* --- Product & Address Info --- */}
                <div>
                  <p className="font-semibold text-gray-800 mb-2">Items:</p>
                  {order.items.map((item, idx) => {
                    const product = productList.find(
                      (p) => p._id === item.productId
                    );
                    const price = product ? product.price : "N/A";
                    return (
                      <p key={idx} className="py-0.5 text-gray-600">
                        <span className="font-medium">
                          {product?.name || "Unknown Product"}
                        </span>{" "}
                        x {item.quantity}{" "}
                        {item.size && (
                          <span className="text-xs">({item.size})</span>
                        )}{" "}
                        - {currency}
                        {price}
                      </p>
                    );
                  })}

                  <p className="font-semibold text-gray-800 mt-4 mb-1">
                    Customer Address:
                  </p>
                  <p className="font-medium text-gray-800">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <div className="text-gray-600 leading-relaxed">
                    <p>{order.address.street},</p>
                    <p>
                      {order.address.city}, {order.address.state},{" "}
                      {order.address.country}, {order.address.zipcode}
                    </p>
                    <p>Phone: {order.address.phone}</p>
                  </div>
                </div>

                {/* --- Order Summary --- */}
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Total Items:</span>{" "}
                    {order.items.length}
                  </p>
                  <p>
                    <span className="font-medium">Method:</span>{" "}
                    {order.paymentMethod}
                  </p>
                  <p>
                    <span className="font-medium">Payment:</span>{" "}
                    <span
                      className={
                        order.payment.status
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {order.payment.status ? "Done" : "Pending"}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* --- Total Amount --- */}
                <div className="flex items-center justify-start lg:justify-center">
                  <p className="text-lg font-bold text-gray-900">
                    {currency}
                    {order.amount.toFixed(2)}
                  </p>
                </div>

                {/* --- Status Dropdown --- */}
                <div className="flex items-center justify-start lg:justify-end">
                  <select
                    onChange={(e) => updateStatusHandler(e, order._id)}
                    value={order.status}
                    className="block w-full max-w-[180px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-gray-700 cursor-pointer"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg mt-10">
              No orders found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
