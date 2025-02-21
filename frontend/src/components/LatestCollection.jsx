import React, { useState, useEffect } from "react";
import Title from "./Title";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/collections/collectionSlice.js";
import ProductCard from "./ProductCard";
import LoadingSkeleton from "./LoadingSkeleton";

function LatestCollection() {
  const dispatch = useDispatch();

  const [latestCollection, setLatestCollection] = useState([]);
  const { products, loading, error } = useSelector((state) => state.products || { products: [] });
  // console.log(products)

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(products)) {
      setLatestCollection(products.slice(0, 10)); // Avoid calling slice() on non-array
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"Latest"} text2={"collections"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab magnam accusamus exercitationem voluptas eligendi.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {loading ? (
          <LoadingSkeleton />
        ) : latestCollection.length > 0 ? (
          latestCollection.map((item, index) => (
            <ProductCard key={index} id={item.id} productImage={item.image[0]} productName={item.name} price={item.price} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default LatestCollection;
