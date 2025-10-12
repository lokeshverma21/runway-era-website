// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { backendUrl, currency } from "../App";
// import { toast } from "react-toastify";
// import { useOutletContext } from "react-router-dom";
// import Loader from "../components/Loader";

// function ListProduct() {
//     const { token } = useOutletContext();
//     const [list, setList] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const fetchList = async () => {
//         try {
//             const response = await axios.get(backendUrl + "/products/list");
//             if (response.data.success) {
//                 setList(response.data.data);
//             } else {
//                 toast.error(response.data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Something went wrong!");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const removeProduct = async (id) => {
//         try {
//             const response = await axios.post(
//                 backendUrl + "/products/remove",
//                 { id },
//                 { headers: { token } }
//             );

//             if (response.data.success) {
//                 toast.success(response.data.message);
//                 await fetchList();
//             } else {
//                 toast.error(response.data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Something went wrong!");
//         }
//     };

//     useEffect(() => {
//         fetchList();
//     }, []);

//     return (
//         <>
//             <p className="mb-2">All products List</p>

//             {loading ? (
//                 <Loader />
//             ) : (
//                 <div className="flex flex-col gap-2">
//                     <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-300 bg-gray-200 text-sm">
//                         <b>Image</b>
//                         <b>Name</b>
//                         <b>Category</b>
//                         <b>Price</b>
//                         <b className="text-center">Action</b>
//                     </div>

//                     {list.map((item, index) => (
//                         <div
//                             key={index}
//                             className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-gray-300 text-sm"
//                         >
//                             <img src={item.image[0]} alt={item.name} />
//                             <p>{item.name}</p>
//                             <p>{item.category}</p>
//                             <p>
//                                 {currency}
//                                 {item.price}
//                             </p>
//                             <p
//                                 onClick={() => removeProduct(item._id)}
//                                 className="text-right md:text-center text-lg cursor-pointer"
//                             >
//                                 X
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </>
//     );
// }

// export default ListProduct;






// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { backendUrl, currency } from "../App";
// import { useOutletContext } from "react-router-dom";

// // Simple loader component
// const Loader = () => (
//     <div className="flex justify-center items-center py-12">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//     </div>
// );

// // Confirmation Modal Component

// const ConfirmModal = ({ isOpen, onClose, onConfirm, productName, isDeleting }) => {
//     if (!isOpen) return null;

//     return (
//         <>
//             {/* Backdrop */}
//             <div 
//                 className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
//                 onClick={onClose}
//             />
            
//             {/* Modal */}
//             <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//                 <div className="bg-white border border-gray-900 rounded-none max-w-md w-full p-6 shadow-xl transform transition-all">
//                     {/* Modal Header */}
//                     <div className="mb-6">
//                         <h2 className="text-xl font-light text-gray-900 mb-2">Confirm Deletion</h2>
//                         <div className="h-px bg-gray-900 w-16"></div>
//                     </div>
                    
//                     {/* Modal Body */}
//                     <div className="mb-6">
//                         <p className="text-gray-700 text-sm leading-relaxed">
//                             Are you sure you want to delete <span className="font-medium text-gray-900">"{productName}"</span>?
//                         </p>
//                         <p className="text-gray-500 text-xs mt-2">
//                             This action cannot be undone.
//                         </p>
//                     </div>
                    
//                     {/* Modal Footer */}
//                     <div className="flex gap-3 justify-end">
//                         <button
//                             onClick={onClose}
//                             disabled={isDeleting}
//                             className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-900 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             onClick={onConfirm}
//                             disabled={isDeleting}
//                             className="px-4 py-2 text-sm text-white bg-gray-900 border border-gray-900 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                         >
//                             {isDeleting ? (
//                                 <>
//                                     <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></div>
//                                     Deleting...
//                                 </>
//                             ) : (
//                                 'Delete Product'
//                             )}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// function ListProduct() {
//     const { token } = useOutletContext();
//     const [list, setList] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [deletingId, setDeletingId] = useState(null);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);

//     const fetchList = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get(backendUrl + "/products/list");
//             if (response.data.success) {
//                 setList(response.data.data);
//             } else {
//                 toast.error(response.data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Something went wrong!");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDeleteClick = (product) => {
//         setSelectedProduct(product);
//         setModalOpen(true);
//     };

//     const handleConfirmDelete = async () => {
//         if (!selectedProduct) return;
        
//         setDeletingId(selectedProduct._id);
//         try {
//             const response = await axios.post(
//                 backendUrl + "/products/remove",
//                 { id: selectedProduct._id },
//                 { headers: { token } }
//             );

//             if (response.data.success) {
//                 toast.success(response.data.message);
//                 await fetchList();
//                 setModalOpen(false);
//                 setSelectedProduct(null);
//             } else {
//                 toast.error(response.data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Something went wrong!");
//         } finally {
//             setDeletingId(null);
//         }
//     };

//     const handleCloseModal = () => {
//         if (!deletingId) {
//             setModalOpen(false);
//             setSelectedProduct(null);
//         }
//     };

//     useEffect(() => {
//         fetchList();
//     }, []);

//     return (
//         <div className="min-h-screen bg-white p-6">
//             <div className="max-w-7xl mx-auto">
//                 {/* Header */}
//                 <div className="mb-8">
//                     <h1 className="text-2xl font-light text-gray-900 mb-2">All Products</h1>
//                     <div className="h-px bg-gray-900 w-24"></div>
//                 </div>

//                 {loading ? (
//                     <Loader />
//                 ) : (
//                     <div className="bg-white p-4">
//                         {/* Table Header */}
//                         <div className="hidden md:grid grid-cols-[100px_1fr_200px_120px_100px] items-center py-4 px-6 border-t border-b border-gray-900 bg-white">
//                             <span className="text-xs uppercase tracking-wider text-gray-600 font-medium">Image</span>
//                             <span className="text-xs uppercase tracking-wider text-gray-600 font-medium">Name</span>
//                             <span className="text-xs uppercase tracking-wider text-gray-600 font-medium">Category</span>
//                             <span className="text-xs uppercase tracking-wider text-gray-600 font-medium">Price</span>
//                             <span className="text-xs uppercase tracking-wider text-gray-600 font-medium text-center">Action</span>
//                         </div>

//                         {/* Product List */}
//                         {list.length === 0 ? (
//                             <div className="py-16 text-center text-gray-500">
//                                 <p className="text-lg">No products found</p>
//                             </div>
//                         ) : (
//                             <div className="divide-y divide-gray-200">
//                                 {list.map((item) => (
//                                     <div
//                                         key={item._id}
//                                         className="grid grid-cols-[80px_1fr_100px] md:grid-cols-[100px_1fr_200px_120px_100px] items-center gap-4 py-4 px-6 hover:bg-gray-50 transition-colors duration-200 group"
//                                     >
//                                         {/* Product Image */}
//                                         <div className="relative overflow-hidden rounded-lg border border-gray-200">
//                                             <img 
//                                                 src={item.image[0]} 
//                                                 alt={item.name}
//                                                 className="w-full h-16 md:h-20 object-cover"
//                                                 onError={(e) => {
//                                                     e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"%3E%3Crect width=\"100\" height=\"100\" fill=\"%23f3f4f6\"/%3E%3Ctext x=\"50\" y=\"50\" font-family=\"Arial\" font-size=\"12\" fill=\"%239ca3af\" text-anchor=\"middle\" dy=\".3em\"%3ENo Image%3C/text%3E%3C/svg%3E';
//                                                 }}
//                                             />
//                                         </div>

//                                         {/* Product Name */}
//                                         <div className="min-w-0">
//                                             <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
//                                         </div>

//                                         {/* Category - Hidden on mobile */}
//                                         <div className="hidden md:block">
//                                             <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
//                                                 {item.category}
//                                             </span>
//                                         </div>

//                                         {/* Price - Hidden on mobile, shown in name section on mobile */}
//                                         <div className="hidden md:block">
//                                             <p className="text-sm font-semibold text-gray-900">
//                                                 {currency}{item.price.toFixed(2)}
//                                             </p>
//                                         </div>

//                                         {/* Mobile Price & Delete */}
//                                         <div className="md:hidden flex items-center justify-end gap-2">
//                                             <span className="text-sm font-semibold text-gray-900">
//                                                 {currency}{item.price}
//                                             </span>
//                                             <button
//                                                 onClick={() => handleDeleteClick(item)}
//                                                 className="p-2 text-gray-400 hover:text-red-600 transition-colors"
//                                             >
//                                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//                                                 </svg>
//                                             </button>
//                                         </div>

//                                         {/* Desktop Delete Button */}
//                                         <div className="hidden md:flex justify-center">
//                                             <button
//                                                 onClick={() => handleDeleteClick(item)}
//                                                 className="group/btn p-2 rounded-lg border border-transparent hover:border-gray-900 hover:bg-white transition-all duration-200"
//                                             >
//                                                 <svg className="w-4 h-4 text-gray-400 group-hover/btn:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
//                                                 </svg>
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}

//                         {/* Footer Stats */}
//                         {!loading && list.length > 0 && (
//                             <div className="mt-6 pt-6 border-t border-gray-200">
//                                 <p className="text-sm text-gray-600 text-center">
//                                     Showing {list.length} {list.length === 1 ? 'product' : 'products'}
//                                 </p>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>

//             {/* Confirmation Modal */}
//             <ConfirmModal
//                 isOpen={modalOpen}
//                 onClose={handleCloseModal}
//                 onConfirm={handleConfirmDelete}
//                 productName={selectedProduct?.name || ''}
//                 isDeleting={!!deletingId}
//             />
//         </div>
//     );
// }

// export default ListProduct;



import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";
import { useOutletContext } from "react-router-dom";

// --- Helper Components & Icons (kept in-file as requested) ---

// Simple loader component
const Loader = () => (
    <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
);

// Icon for the confirmation modal
const AlertTriangleIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        <path d="M12 9v4"/>
        <path d="M12 17h.01"/>
    </svg>
);

// Reusable Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/10 bg-opacity-60 z-50 flex justify-center items-center p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="relative bg-white rounded-xl shadow-2xl w-full max-w-md m-4" 
                onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
            >
                <div className="p-6 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                        <AlertTriangleIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-lg leading-6 font-semibold text-gray-900">Confirm Deletion</h3>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">{message}</p>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-xl space-y-3 sm:space-y-0 sm:space-x-3 sm:space-x-reverse">
                    <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm transition-colors duration-150"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm transition-colors duration-150"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};


function ListProduct() {
    const { token } = useOutletContext();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const fetchList = async () => {
        setLoading(true);
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

    const openDeleteModal = (id) => {
        setItemToDelete(id);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setItemToDelete(null);
    };

    const handleRemoveProduct = async () => {
        if (!itemToDelete) return;

        setDeletingId(itemToDelete);
        try {
            const response = await axios.post(
                backendUrl + "/products/remove",
                { id: itemToDelete },
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
        } finally {
            setDeletingId(null);
            closeDeleteModal();
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <Fragment>
            <ConfirmationModal 
                isOpen={isModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleRemoveProduct}
                message="Are you sure you want to delete this product? This action cannot be undone."
            />
            <div className="">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-light text-gray-900 mb-2">All Products</h1>
                        <div className="h-px bg-gray-900 w-24"></div>
                    </div>

                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="bg-white p-4">
                            {/* Table Header */}
                            <div className="hidden md:grid grid-cols-[100px_1fr_200px_120px_100px] items-center py-4 px-6 border-t border-b border-gray-900 bg-white">
                                <span className="text-xs uppercase tracking-wider text-gray-600 font-medium">Image</span>
                                <span className="text-xs uppercase tracking-wider text-gray-600 font-medium">Name</span>
                                <span className="text-xs uppercase tracking-wider text-gray-600 font-medium">Category</span>
                                <span className="text-xs uppercase tracking-wider text-gray-600 font-medium">Price</span>
                                <span className="text-xs uppercase tracking-wider text-gray-600 font-medium text-center">Action</span>
                            </div>

                            {/* Product List */}
                            {list.length === 0 ? (
                                <div className="py-16 text-center text-gray-500">
                                    <p className="text-lg">No products found</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-200">
                                    {list.map((item) => (
                                        <div
                                            key={item._id}
                                            className="grid grid-cols-[80px_1fr_100px] md:grid-cols-[100px_1fr_200px_120px_100px] items-center gap-4 py-4 px-6 hover:bg-gray-50 transition-colors duration-200 group"
                                        >
                                            {/* Product Image */}
                                            <div className="relative overflow-hidden rounded-lg border border-gray-200">
                                                <img 
                                                    src={item.image[0]} 
                                                    alt={item.name}
                                                    className="w-full h-16 md:h-20 object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f3f4f6"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%239ca3af" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                                                    }}
                                                />
                                            </div>

                                            {/* Product Name */}
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                            </div>

                                            {/* Category - Hidden on mobile */}
                                            <div className="hidden md:block">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                                    {item.category}
                                                </span>
                                            </div>

                                            {/* Price - Hidden on mobile, shown in name section on mobile */}
                                            <div className="hidden md:block">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {currency}{item.price.toFixed(2)}
                                                </p>
                                            </div>

                                            {/* Mobile Price & Delete */}
                                            <div className="md:hidden flex items-center justify-end gap-2">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {currency}{item.price}
                                                </span>
                                                <button
                                                    onClick={() => openDeleteModal(item._id)}
                                                    disabled={deletingId === item._id}
                                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                                >
                                                    {deletingId === item._id ? (
                                                        <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full"></div>
                                                    ) : (
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>

                                            {/* Desktop Delete Button */}
                                            <div className="hidden md:flex justify-center">
                                                <button
                                                    onClick={() => openDeleteModal(item._id)}
                                                    disabled={deletingId === item._id}
                                                    className="group/btn p-2 rounded-lg border border-transparent hover:border-gray-900 hover:bg-white transition-all duration-200"
                                                >
                                                    {deletingId === item._id ? (
                                                        <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full"></div>
                                                    ) : (
                                                        <svg className="w-4 h-4 text-gray-400 group-hover/btn:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Footer Stats */}
                            {!loading && list.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <p className="text-sm text-gray-600 text-center">
                                        Showing {list.length} {list.length === 1 ? 'product' : 'products'}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
}

export default ListProduct;
