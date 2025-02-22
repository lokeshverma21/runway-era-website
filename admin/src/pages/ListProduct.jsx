import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import Loader from "../components/Loader";

function ListProduct() {
    const { token } = useOutletContext();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + "/products/list");
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(
                backendUrl + "/products/remove",
                { id },
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <>
            <p className="mb-2">All products List</p>

            {loading ? (
                <Loader />
            ) : (
                <div className="flex flex-col gap-2">
                    <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-200 text-sm">
                        <b>Image</b>
                        <b>Name</b>
                        <b>Category</b>
                        <b>Price</b>
                        <b className="text-center">Action</b>
                    </div>

                    {list.map((item, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm"
                        >
                            <img src={item.image[0]} alt={item.name} />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>
                                {currency}
                                {item.price}
                            </p>
                            <p
                                onClick={() => removeProduct(item._id)}
                                className="text-right md:text-center text-lg cursor-pointer"
                            >
                                X
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default ListProduct;
