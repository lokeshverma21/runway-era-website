//--------------------------------------------------
import { useState, useEffect } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, Users, ShoppingBag, DollarSign, Sparkles, ArrowUp, ArrowDown, Minus, Loader2 } from 'lucide-react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { useOutletContext } from 'react-router-dom';

const Dashboard = () => {
  const { token } = useOutletContext();
//   const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Data states
  const [stats, setStats] = useState([
    { 
      label: 'Total Revenue', 
      value: '$0', 
      change: '+0%', 
      trend: 'neutral',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      label: 'Total Orders', 
      value: '0', 
      change: '+0%', 
      trend: 'neutral',
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      label: 'Customers', 
      value: '0', 
      change: '+0%', 
      trend: 'neutral',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      label: 'Products', 
      value: '0', 
      change: '+0%', 
      trend: 'neutral',
      icon: Package,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
  ]);

  const [salesData, setSalesData] = useState([
    { month: 'Jan', sales: 0, orders: 0 },
    { month: 'Feb', sales: 0, orders: 0 },
    { month: 'Mar', sales: 0, orders: 0 },
    { month: 'Apr', sales: 0, orders: 0 },
    { month: 'May', sales: 0, orders: 0 },
    { month: 'Jun', sales: 0, orders: 0 },
    { month: 'Jul', sales: 0, orders: 0 },
    { month: 'Aug', sales: 0, orders: 0 },
    { month: 'Sep', sales: 0, orders: 0 },
    { month: 'Oct', sales: 0, orders: 0 },
    { month: 'Nov', sales: 0, orders: 0 },
    { month: 'Dec', sales: 0, orders: 0 },
  ]);

  const [categoryData, setCategoryData] = useState([
    { name: 'Loading...', value: 100, color: '#e5e7eb' }
  ]);

  // Mock data for sections not covered by API
//   const topProducts = [
//     { name: 'Summer Floral Dress', category: 'Women\'s Wear', sales: 234, revenue: '₹5,850', trend: 'up' },
//     { name: 'Classic White Sneakers', category: 'Footwear', sales: 189, revenue: '₹4,725', trend: 'up' },
//     { name: 'Leather Handbag', category: 'Accessories', sales: 156, revenue: '₹7,020', trend: 'down' },
//     { name: 'Slim Fit Jeans', category: 'Men\'s Wear', sales: 142, revenue: '₹3,550', trend: 'neutral' },
//     { name: 'Silk Scarf Collection', category: 'Accessories', sales: 98, revenue: '₹2,450', trend: 'up' },
//   ];

  const [recentOrders, setRecentOrders] = useState([
    { id: '#ORD-2024-001', customer: 'Loading...', date: '--', amount: '$0', status: 'Pending' }
  ]);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${backendUrl}/dashboard`, {
        headers: { token }
      });

      if (response.data.success) {
        const data = response.data;
        
        // Update stats
        const newStats = [
          { 
            label: 'Total Revenue', 
            value: `${currency}${data.stats.totalRevenue.toLocaleString()}`, 
            change: '+12.5%', 
            trend: 'up',
            icon: DollarSign,
            color: 'text-green-600',
            bgColor: 'bg-green-50'
          },
          { 
            label: 'Total Orders', 
            value: data.stats.totalOrders.toLocaleString(), 
            change: '+8.2%', 
            trend: 'up',
            icon: ShoppingBag,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
          },
          { 
            label: 'Customers', 
            value: data.stats.totalUsers.toLocaleString(), 
            change: '+5.4%', 
            trend: 'up',
            icon: Users,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
          },
          { 
            label: 'Products', 
            value: data.stats.totalProducts.toLocaleString(), 
            change: '+2.1%', 
            trend: 'up',
            icon: Package,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50'
          },
        ];
        setStats(newStats);

        // Update sales data
        if (data.salesData && data.salesData.length > 0) {
          const monthsMap = new Map(data.salesData.map((item) => [item.month, item.total]));
          const updatedSalesData = [
            { month: 'Jan', sales: monthsMap.get('Jan') || 0, orders: Math.floor((monthsMap.get('Jan') || 0) / 50) },
            { month: 'Feb', sales: monthsMap.get('Feb') || 0, orders: Math.floor((monthsMap.get('Feb') || 0) / 50) },
            { month: 'Mar', sales: monthsMap.get('Mar') || 0, orders: Math.floor((monthsMap.get('Mar') || 0) / 50) },
            { month: 'Apr', sales: monthsMap.get('Apr') || 0, orders: Math.floor((monthsMap.get('Apr') || 0) / 50) },
            { month: 'May', sales: monthsMap.get('May') || 0, orders: Math.floor((monthsMap.get('May') || 0) / 50) },
            { month: 'Jun', sales: monthsMap.get('Jun') || 0, orders: Math.floor((monthsMap.get('Jun') || 0) / 50) },
            { month: 'Jul', sales: monthsMap.get('Jul') || 0, orders: Math.floor((monthsMap.get('Jul') || 0) / 50) },
            { month: 'Aug', sales: monthsMap.get('Aug') || 0, orders: Math.floor((monthsMap.get('Aug') || 0) / 50) },
            { month: 'Sep', sales: monthsMap.get('Sep') || 0, orders: Math.floor((monthsMap.get('Sep') || 0) / 50) },
            { month: 'Oct', sales: monthsMap.get('Oct') || 0, orders: Math.floor((monthsMap.get('Oct') || 0) / 50) },
            { month: 'Nov', sales: monthsMap.get('Nov') || 0, orders: Math.floor((monthsMap.get('Nov') || 0) / 50) },
            { month: 'Dec', sales: monthsMap.get('Dec') || 0, orders: Math.floor((monthsMap.get('Dec') || 0) / 50) },
          ];
          setSalesData(updatedSalesData);
        }

        // Update category data
        if (data.categoryData && data.categoryData.length > 0) {
          const colors = ['#000000', '#4b5563', '#9ca3af', '#d1d5db', '#f3f4f6'];
          const totalSales = data.categoryData.reduce((sum, cat) => sum + cat.sales, 0);
          const formattedCategoryData = data.categoryData.map((cat, index) => ({
            name: cat.category,
            value: Math.round((cat.sales / totalSales) * 100),
            color: colors[index % colors.length]
          }));
          setCategoryData(formattedCategoryData);
        }

        // Mock recent orders (you can fetch this from another endpoint if available)
        // setRecentOrders([
        //   { id: '#ORD-2024-001', customer: 'Emma Watson', date: '2024-01-15', amount: '₹285', status: 'Delivered' },
        //   { id: '#ORD-2024-002', customer: 'Michael Chen', date: '2024-01-15', amount: '₹142', status: 'Processing' },
        //   { id: '#ORD-2024-003', customer: 'Sarah Johnson', date: '2024-01-14', amount: '₹523', status: 'Shipped' },
        //   { id: '#ORD-2024-004', customer: 'David Brown', date: '2024-01-14', amount: '₹89', status: 'Pending' },
        // ]);
        setTopProducts(data.topProducts);
        setRecentOrders(data.recentOrders);

      } else {
        setError(response.data.message || 'Failed to fetch dashboard data');
      }
    } catch (err) {
      console.error('Dashboard error:', err);
      setError(err.response?.data?.message || 'Error fetching dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-50';
      case 'Processing': return 'text-blue-600 bg-blue-50';
      case 'Shipped': return 'text-purple-600 bg-purple-50';
      case 'Pending': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4" />;
      case 'down': return <ArrowDown className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg mb-4">
            {error}
          </div>
          <button 
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-medium text-gray-900">Store Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <p className="text-gray-500 mt-1">{`Welcome back! Here's what's happening with your store today.`}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transform: hoveredCard === index ? 'translateY(-4px)' : 'translateY(0)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 
                  'text-gray-500'
                }`}>
                  {getTrendIcon(stat.trend)}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 border border-gray-200 rounded-xl p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Sales Overview</h2>
            {/* <div className="flex gap-2">
              <button 
                onClick={() => setSelectedPeriod('week')}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  selectedPeriod === 'week' 
                    ? 'bg-black text-white' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Week
              </button>
              <button 
                onClick={() => setSelectedPeriod('month')}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  selectedPeriod === 'month' 
                    ? 'bg-black text-white' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Month
              </button>
              <button 
                onClick={() => setSelectedPeriod('year')}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  selectedPeriod === 'year' 
                    ? 'bg-black text-white' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Year
              </button>
            </div> */}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#000000" 
                strokeWidth={2}
                dot={{ fill: '#000000', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="border border-gray-200 rounded-xl p-6 bg-white">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-gray-600">{category.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{category.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="border border-gray-200 rounded-xl p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
            <Sparkles className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{product.revenue}</p>
                  <p className="text-sm text-gray-500">{product.sales} sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="border border-gray-200 rounded-xl p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <button className="text-sm text-gray-600 hover:text-gray-900">View all</button>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-3 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.id}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">{order.date}</p>
                  <p className="font-semibold text-gray-900">{order.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;