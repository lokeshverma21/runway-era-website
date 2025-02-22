import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { assets } from "@/assets";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import Loader from "@/components/Loader";

function Collection() {
  const { products, loading, error } = useSelector((state) => state.products || { products: [] });
  // console.log(products)
  const { showSearch, searchQuery } = useSelector((state) => state.search);
  
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const onCategoryChange = (e) => {
    setCategory((prev) =>
      prev.includes(e.target.value) ? prev.filter((item) => item !== e.target.value) : [...prev, e.target.value]
    );
  };

  const onSubCategoryChange = (e) => {
    setSubCategory((prev) =>
      prev.includes(e.target.value) ? prev.filter((item) => item !== e.target.value) : [...prev, e.target.value]
    );
  };

  const applyFilter = () => {
    let productsCopy = [...products];
  
    if (showSearch && searchQuery) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
  
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
  
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
  
    // Only update state if the filtered list is actually different
    if (JSON.stringify(productsCopy) !== JSON.stringify(filterProducts)) {
      setFilterProducts(productsCopy);
    }
  };
  
  const sortProduct = () => {
    let sortedProducts = [...filterProducts];
  
    switch (sortType) {
      case 'low-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        return; // Do nothing, prevent re-triggering applyFilter()
    }
  
    // Only update state if sorted list is different
    if (JSON.stringify(sortedProducts) !== JSON.stringify(filterProducts)) {
      setFilterProducts(sortedProducts);
    }
  };

  useEffect(()=>{
    
  },[])
  
  useEffect(() => {
    applyFilter();
  }, [subCategory, category, searchQuery, showSearch, products]); // Include `products` to update when API data changes
  
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Section */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="uppercase my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          Filters
          <img src={assets.arrow} alt="" className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium uppercase">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Men", "Women", "Kids"].map((cat) => (
              <p className="flex gap-2" key={cat}>
                <input type="checkbox" value={cat} className="w-4 cursor-pointer" onChange={onCategoryChange} />
                <label className="cursor-pointer">{cat}</label>
              </p>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium uppercase">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((subCat) => (
              <p className="flex gap-2" key={subCat}>
                <input type="checkbox" value={subCat} className="w-4 cursor-pointer" onChange={onSubCategoryChange} />
                <label className="cursor-pointer">{subCat}</label>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="All" text2="Collections" />

          {/* Sorting Dropdown */}
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => <ProductCard key={item.id} {...item} id={item._id} price={item.price} productImage={item.image[0]} productName={item.name}/>)
          ) : (
            <div className="flex items-center justify-center w-[50vw] h-[50vh]">
              <Loader/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collection;
