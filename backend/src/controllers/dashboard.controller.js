import express from "express";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

// Helper for random order number
const generateOrderNumber = () => {
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  const datePart = new Date().getFullYear().toString().slice(-2);
  return `#ORD-${datePart}${randomPart}`;
};

const dashboard = asyncHandler(async (req, res) => {
  try {
    // 1️⃣ Basic stats
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const totalRevenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    // 2️⃣ Sales by month
    const salesDataAgg = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);
    const salesData = salesDataAgg.map((d) => ({
      month: new Date(0, d._id - 1).toLocaleString("default", { month: "short" }),
      total: d.total,
    }));

    // 3️⃣ Category-wise sales
    const categoryDataAgg = await Order.aggregate([
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $group: {
          _id: "$product.category",
          sales: { $sum: "$items.quantity" },
        },
      },
      { $sort: { sales: -1 } },
    ]);
    const categoryData = categoryDataAgg.map((d) => ({
      category: d._id,
      sales: d.sales,
    }));

    // 4️⃣ Top Products (by total quantity sold)
    const topProductsAgg = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalSales: { $sum: "$items.quantity" },
          totalRevenue: { $sum: "$amount" },
        },
      },
      { $sort: { totalSales: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
    ]);

    const trends = ["up", "down", "neutral"];
    const topProducts = topProductsAgg.map((p) => ({
      name: p.product.name,
      category: p.product.category,
      sales: p.totalSales,
      revenue: `₹${(p.totalRevenue / topProductsAgg.length).toFixed(0)}`,
      trend: trends[Math.floor(Math.random() * trends.length)],
    }));

    // 5️⃣ Recent Orders (latest 5)
    const recentOrdersAgg = await Order.find()
      .sort({ createdAt: -1 }) // DESCENDING — latest first
      .limit(5)
      .populate("userId", "name email") // fetch user info
      .populate("items.productId", "name category price") // fetch product details
      .lean();

    const recentOrders = recentOrdersAgg.map((order) => ({
      id: order._id.toString().slice(-6).toUpperCase(), // short readable ID
      customer: order.userId?.name || "Guest User",
      email: order.userId?.email || "N/A",
      products: order.items.map((i) => ({
        name: i.productId?.name || "Unknown",
        category: i.productId?.category || "N/A",
        quantity: i.quantity,
        price: i.productId?.price ? `₹${i.productId.price}` : "₹0",
      })),
      totalItems: order.items.reduce((acc, i) => acc + i.quantity, 0),
      amount: `₹${order.amount}`,
      date: new Date(order.createdAt).toLocaleDateString("en-IN"),
      paymentStatus: order.payment?.status ? "Paid" : "Pending",
      status: order.status || "Order Placed",
    }));

    // ✅ Send Final Response
    res.json({
      success: true,
      stats: {
        totalOrders,
        totalUsers,
        totalProducts,
        totalRevenue,
      },
      salesData,
      categoryData,
      topProducts,
      recentOrders,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export { dashboard };
