import { useDispatch, useSelector } from 'react-redux';
// import { setCollection, addCollection, clearCollections } from '@/features/collections/collectionSlice';
import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { assets } from '@/assets';

function Test() {
  // const dispatch = useDispatch();
  // const collections = useSelector((state) => state.collections.collections);
  // // const status = useSelector((state) => state.collections.status);  // Access the status from the store

  // const mockData = [
  //   { id: 1, name: 'Summer Dress', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.', price: 49.99, image:[assets.pImage1, assets.pImage10], bestSeller: true, category: 'Men', subCategory: 'Topwear', sizes:['M','L','XL','XXL'] },
  //   { id: 2, name: 'Winter Dress', description: 'lorem epsium hdhyeud hdeuhf isieshw ujhdhuwe dhgehb', price: 59.99, image:[assets.pImage2, assets.pImage20,assets.pImage18, assets.pImage16, assets.pImage15], bestSeller: false, category: 'Kids', subCategory: 'Winterwear', sizes:['S','M','L','XL','XXL']  },
  //   { id: 3, name: 'Summer Dress', description: 'lorem epsium hdhyeud hdeuhf isieshw ujhdhuwe dhgehb', price: 69.99, image:[assets.pImage3, assets.pImage13],bestSeller: true, category: 'Women', subCategory: 'Topwear', sizes:['M','L','XL','XXL']  },
  //   { id: 4, name: 'Summer Dress', description: 'A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.', price: 99.99, image:[assets.pImage4],bestSeller: false, category: 'Women', subCategory: 'Winterwear', sizes:['M','L','XL','XXL']  },
  //   { id: 5, name: 'Summer Dress', description: 'lorem epsium hdhyeud hdeuhf isieshw ujhdhuwe dhgehb', price: 109.99, image:`${assets.pImage6}`,bestSeller: true, category: 'Women', subCategory: 'Topwear', sizes:['S','M','L','XL','XXL']  },
  //   { id: 6, name: 'Summer Dress', description: 'lorem epsium hdhyeud hdeuhf isieshw ujhdhuwe dhgehb', price: 68.99, image:`${assets.pImage5}`,bestSeller: false, category: 'Men', subCategory: 'Winterwear', sizes:['M','L','XL','XXL']  },
  //   { id: 7, name: 'Winter Dress', description: 'lorem epsium hdhyeud hdeuhf isieshw ujhdhuwe dhgehb', price: 96.99, image:`${assets.pImage7}`,bestSeller: true, category: 'Men', subCategory: 'Bottomwear', sizes:['S','M','L','XL','XXL']  },
  //   { id: 8, name: 'Pant', description: 'lorem epsium hdhyeud hdeuhf isieshw ujhdhuwe dhgehb', price: 444.99, image:`${assets.pImage20}`,bestSeller: false, category: 'Women', subCategory: 'Bottomwear', sizes:['M','L','XL','XXL']  },
  //   { id: 9, name: 'Summer Dress', description: 'lorem epsium hdhyeud hdeuhf isieshw ujhdhuwe dhgehb', price: 49.99, image:`${assets.pImage7}`, bestSeller: true, category: 'Men', subCategory: 'Winterwear', sizes:['M','L','XL','XXL']  },
  //   { id: 10, name: 'Summer Dress', description: 'lorem epsium hdhyeud hdeuhf isieshw ujhdhuwe dhgehb', price: 49.99, image:`${assets.pImage20}`,bestSeller: true, category: 'Women',subCategory: 'Bottomwear', sizes:['M','L','XL','XXL']  },
  //   // More mock data...
  // ];

  // useEffect(() => {
  //     dispatch(setCollection(mockData));
  // }, [dispatch]);

  return (
    <div>
     {/* {status === 'loading' && <p>Loading...</p>}
      <div>Test</div> */}

      {/* Render collections if available */}
        {/* {collections.length > 0 && collections.map(item => (
            <ProductCard id={item.id} productName={item.name} price={item.price}/>
      ))}  */}
    </div>
  );
}

export default Test;
