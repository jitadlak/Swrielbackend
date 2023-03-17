import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import productCategory from "../models/productCategory.js";
import productcategories from "../models/productCategory.js";
import productList from "../models/productList.js";

import productModel from "../models/productModel.js";

export const addproduct = async (req, res) => {
    const { productName, productImage } = req.body;
    // console.log(req.body, 'serviceImage');

    if (!productName) {
        return res.status(200).json({
            status: 400,
            message: "Product Name Is Required",
        });
    }
    if (!productImage) {
        return res.status(200).json({
            status: 400,
            message: "Product Image Is Required",
        });
    }
    try {
        const oldUser = await productModel.findOne({ productName });

        if (oldUser) {
            return res.status(200).json({
                status: 400,
                message: "already Product exits !",
            });
        }

        const result = await productModel.create({
            productName,
            productImage,
        });

        res.status(200).json({ result, status: 200 });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};

export const allproducts = async (req, res) => {
    try {
        const allproduct = await productModel.find({});
        //console.log(allproduct);
        if (!allproduct) {
            return res.status(200).json({
                status: 400,
                message: "Products Doesn't Exists !!",
            });
        }
        res.status(200).json({ result: allproduct, status: 200 });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};

export const deleteproduct = async (req, res) => {
    try {
        const data = await productModel.find({ productId: req.params.id });
        if (!data) {
            return res.status(200).json({
                status: 400,
                message: "Product Doesn't Exists !!",
            });
        }
        if (data.length > 0) {
            const result = await productModel.deleteOne({ _id: req.params.id });
            return res.status(200).json({
                status: 200,
                message: "Product Deleted Successfully",
            });
        }
        return res.status(200).json({
            status: 400,
            message: "service Doesn't Exists !!",
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

export const addproductcategory = async (req, res) => {
    const { categoryName, productId } = req.body;
    console.log(productId);
    if (!categoryName) {
        return res.status(200).json({
            status: 400,
            message: "categoryName Is Required",
        });
    }
    if (!productId) {
        return res.status(200).json({
            status: 400,
            message: "productId Is Required",
        });
    }
    try {
        const oldUser = await productcategories.findOne({ categoryName });

        const productData = await productModel.findById(productId);
        console.log(productData, "productdata");

        if (oldUser) {
            return res.status(200).json({
                status: 400,
                message: "Already exits !",
            });
        }

        const result = await productcategories.create({
            categoryName,
            productId,
            productData,
        });

        return res.status(200).json({ status: 200, result });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};

export const allproductcategory = async (req, res) => {
    try {
        const result = await productcategories.find({});

        if (!result) {
            return res.status(200).json({ status: 400, message: "No Record Found" });
        }
        const result2 = await productModel.find({ _id: result.productId });
        if (!result2) {
            return res
                .status(200)
                .json({ status: 400, message: "Something went wrong with service" });
        }

        res.status(200).json({
            // categoryName: result.categoryName,
            // categoryId: result._id,
            // service: result2
            status: 200,
            result,
        });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};

export const addproductList = async (req, res) => {
    const { productName, productImage, productPrice, productTitle, productDescription, productSubcategory, productCompany, productSubcategoryId, } = req.body;
    // console.log(req.body, 'serviceImage');

    if (!productName) {
        return res.status(200).json({
            status: 400,
            message: "Product Name Is Required",
        });
    }
    if (!productImage) {
        return res.status(200).json({
            status: 400,
            message: "Product Image Is Required",
        });
    }
    if (!productPrice) {
        return res.status(200).json({
            status: 400,
            message: "Product  Price Is Required",
        });
    }
    if (!productTitle) {
        return res.status(200).json({
            status: 400,
            message: "Product Tittle Is Required",
        });
    }
    if (!productDescription) {
        return res.status(200).json({
            status: 400,
            message: "Product Description Is Required",
        });
    }
    // if (!productSubcategory) {
    //     return res.status(200).json({
    //         status: 400,
    //         message: "Product Subcategory Is Required",
    //     });
    // }
    if (!productCompany) {
        return res.status(200).json({
            status: 400,
            message: "Product Company Is Required",
        });
    }
    // if (!AddedBy) {
    //     return res.status(200).json({
    //         status: 400,
    //         message: "Vendor Is Required",
    //     });
    // }
    try {
        const oldUser = await productList.findOne({ productName });
        const data = await productCategory.findById(productSubcategoryId);
        console.log(data)

        if (oldUser) {
            return res.status(200).json({
                status: 400,
                message: "already Product exits !",
            });
        }
        if (!data) {
            return res.status(200).json({
                status: 400,
                message: "something went wrong !!",
            });
        }
        const result = await productList.create({
            productName,
            productImage,
            productPrice,
            productTitle,
            productDescription,
            productSubcategory: data,
            productCompany,
            productSubcategoryId,

        });

        res.status(200).json({ result, status: 200 });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};

export const caterogybyproduct = async (req, res) => {
    try {
        const data = await productcategories.find({ productId: req.params.id });
        if (!data) {
            return res.status(200).json({ message: "category Doesn't Exists !!", status: 400 });
        }
        if (data.length > 0) {
            return res.status(200).json({ result: data, status: 200 });
        }
        return res.status(200).json({ message: "category Doesn't Exists !!", status: 400 });
    } catch (err) {
        res.status(500).json(err);
    }
};

export const productListbycategory = async (req, res) => {
    try {
        const data = await productList.find({ productSubcategoryId: req.params.id });
        if (!data) {
            return res.status(200).json({ message: "Product Doesn't Exists !!", status: 400 });
        }
        if (data.length > 0) {
            return res.status(200).json({ result: data, status: 200 });
        }
        return res.status(200).json({ message: "Product Doesn't Exists !!", status: 400 });
    } catch (err) {
        res.status(500).json(err);
    }
};
export const productListVendor = async (req, res) => {
    try {
        const data = await productList.find({ AddedBy: req.params.id });
        if (!data) {
            return res.status(200).json({ message: "Product Doesn't Exists !!", status: 400 });
        }
        if (data) {
            return res.status(200).json({ result: data, status: 200 });
        }
        return res.status(200).json({ message: "Product Doesn't Exists !!", status: 400 });
    } catch (err) {
        res.status(500).json(err);
    }
};
export const allproductsList = async (req, res) => {
    try {
        const allproduct = await productList.find({});
        //console.log(allproduct);
        if (!allproduct) {
            return res.status(200).json({
                status: 400,
                message: "Products Doesn't Exists !!",
            });
        }
        res.status(200).json({ result: allproduct, status: 200 });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};