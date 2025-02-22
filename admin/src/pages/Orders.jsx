import React, { useState, useEffect } from "react";
import { backendUrl, currency } from "../App.jsx";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/paths.js";
import Loader from "../components/Loader.jsx";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { token } = useOutletContext();

  const fetchOrders = async () => {
    if (!token) return null;
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + "/orders/list", {
        headers: { token },
      });
      setOrders(response.data.data);
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductList = async () => {
    try {
      const response = await axios.get(backendUrl + "/products/list");
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const updateStatusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/orders/status",
        { orderId, status: e.target.value },
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchOrders();
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchProductList();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      {loading ? (
        <Loader/>
      ) : (
        <div>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div
                className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
                key={index}
              >
                <img className="w-12" src={assets.itemIcon} alt="" />
                <div>
                  {order.items.map((item, idx) => {
                    const product = list.find((p) => p._id === item.productId);
                    const price = product ? product.price : "N/A";
                    return (
                      <p key={idx} className="py-0.5">
                        {product?.name} x {item.quantity} <span>{item.size}</span> - {currency}{price}
                      </p>
                    );
                  })}
                  <p className="font-medium py-1">{order.address.firstName + " " + order.address.lastName}</p>
                  <div>
                    <p>{order.address.street + ","}</p>
                    <p>
                      {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}
                    </p>
                    <p>{order.address.phone}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
                  <p className="mt-3">Method: {order.paymentMethod}</p>
                  <p>Payment: {order.payment.status ? "Done" : "Pending"}</p>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>
                <select onChange={(e) => updateStatusHandler(e, order._id)} value={order.status} className="bg-white p-2 cursor-pointer font-semibold">
                  <option value="Order Placed">Order Placed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            ))
          ) : (
            <p>No orders found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;