import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {Product} from "../models/product.model.js";


const addProduct = asyncHandler( async(req,res) => {
    const {name, description, price, category, subCategory, sizes, bestseller} = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];


    if (!name || !description || !price || !category || !subCategory || !sizes) {
        throw new ApiError(400, "All fields are required!")
    }

    const images = [image1,image2,image3,image4].filter((item) => item !== undefined)

    // console.log(name,description,price,category,subCategory,sizes)
    // console.log(images)

    // let imagesUrl = await uploadOnCloudinary(image1.path)
    let imagesUrl = await Promise.all(
        images.map(async(item) => {
            let result = await uploadOnCloudinary(item.path)
            return result.secure_url
        })
    )

    if (!imagesUrl) {
        throw new ApiError(501,"Error while uploading images!")
    }

    const productData = {
        name,
        description,
        price : Number(price),
        category,
        subCategory,
        bestseller : bestseller === "true" ? true : false,
        sizes : JSON.parse(sizes),
        image: imagesUrl,
    }

    // console.log(productData)

    const product = new Product(productData)

    const addedProduct = await product.save()

    if (!addedProduct) {
        throw new ApiError(501, "Error while adding product!")
    }

    return res.status(200).json(
        new ApiResponse(200, addedProduct, "Product added successfully!!")
    )

});


const listProduct = asyncHandler(async(req,res) => {
    const products = await Product.find({})

    if (!products) {
        throw new ApiError(500, "Error while fetching products!")
    }

    return res.status(200).json(
        new ApiResponse(200, products, "All products fetched successfully!!")
    )
});


const removeProduct = asyncHandler(async(req,res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.body.id)

    if (!deletedProduct) {
        throw new ApiError(500,"Error while deleting product!")
    }

    return res.status(200).json(
        new ApiResponse(200,null,"Product deleted successfully!!")
    )
});


const singleProduct = asyncHandler(async(req, res) => {
    const {productId} = req.body;

    if (!productId) {
        throw new ApiError(400,"ProductId is required to get product details!")
    }

    const product = await Product.findById(productId)

    if (!product) {
        throw new ApiError(404,"Requested product with ID does not found!")
    }

    return res.status(200).json(
        new ApiResponse(200, product, "Product details fetched successfully!!")
    )
});



export{
    addProduct,
    listProduct,
    removeProduct,
    singleProduct
}