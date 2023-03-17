import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import company from "../models/company.js";
import productcategories from "../models/productCategory.js";

import productModel from "../models/productModel.js";

export const addcompany = async (req, res) => {
    const { companyName, companyLogo } = req.body;
    // console.log(req.body, 'serviceImage');

    if (!companyName) {
        return res.status(200).json({
            status: 400,
            message: "Company Name Is Required",
        });
    }
    if (!companyLogo) {
        return res.status(200).json({
            status: 400,
            message: "Company Image Is Required",
        });
    }
    try {
        const oldUser = await company.findOne({ companyName });

        if (oldUser) {
            return res.status(200).json({
                status: 400,
                message: "already Company exits !",
            });
        }

        const result = await company.create({
            companyName,
            companyLogo,
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
                message: "Products Doesn't Exists !!"
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
                message: "Product Doesn't Exists !!"
            });
        }
        if (data.length > 0) {
            const result = await productModel.deleteOne({ _id: req.params.id })
            return res.status(200).json({
                status: 200,
                message: "Product Deleted Successfully"
            });
        }
        return res.status(200).json({
            status: 400,
            message: "service Doesn't Exists !!"
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
export const addproductcategory = async (req, res) => {
    const { categoryName, productId } = req.body;
    console.log(productId)
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
        console.log(productData, 'productdata')

        if (oldUser) {
            return res.status(200).json({
                status: 400,
                message: "Already exits !",
            });
        }

        const result = await productcategories.create({
            categoryName,
            productId,
            productData
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
            return res.status(200).json({ status: 400, message: "Something went wrong with service" });
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

