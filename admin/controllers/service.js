import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Service from "../models/addServices.js";
import category from "../models/category.js";
import subcategories from "../models/subcategories.js";

export const addservice = async (req, res) => {
    const { serviceName, serviceImage } = req.body;
    console.log(req.body, 'serviceImage');

    if (!serviceName) {
        return res.status(200).json({
            status: 400,
            message: "service name Is Required",
        });
    }
    if (!serviceImage) {
        return res.status(200).json({
            status: 400,
            message: "service image Is Required",
        });
    }
    try {
        const oldUser = await Service.findOne({ serviceName });

        if (oldUser) {
            return res.status(200).json({
                status: 400,
                message: "already service exits !",
            });
        }

        const result = await Service.create({
            serviceName,
            serviceImage,
        });

        res.status(200).json({ result, status: 200 });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};

export const addcategory = async (req, res) => {
    const { categoryName, serviceId } = req.body;
    console.log(res.body)
    if (!categoryName) {
        return res.status(200).json({
            status: 400,
            message: "categoryName Is Required",
        });
    }
    if (!serviceId) {
        return res.status(200).json({
            status: 400,
            message: "serviceId Is Required",
        });
    }
    try {
        const oldUser = await category.findOne({ categoryName });
        const serviceData = await Service.findById(serviceId);

        if (oldUser) {
            return res.status(200).json({
                status: 400,
                message: "already exits !",
            });
        }

        const result = await category.create({
            categoryName,
            serviceId,
            serviceData
        });

        res.status(200).json({ status: 200, result });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};

export const allservicecategory = async (req, res) => {


    try {
        const result = await category.find({});

        if (!result) {
            return res.status(200).json({ status: 400, message: "No Record Found" });
        }
        const result2 = await Service.find({ _id: result.serviceId });
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

export const allservicesubcategory = async (req, res) => {


    try {
        const result = await subcategories.find({});

        if (!result) {
            return res.status(200).json({ status: 400, message: "No Record Found" });
        }
        // const result2 = await Service.find({ _id: result.serviceId });
        // if (!result2) {
        //     return res.status(200).json({ status: 400, message: "Something went wrong with service" });
        // }

        return res.status(200).json({
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

export const allservices = async (req, res) => {
    try {
        const allservices = await Service.find({});
        //console.log(allservices);
        if (!allservices) {
            return res.status(404).json({ message: "Services Doesn't Exists !!", status: 400 });
        }
        res.status(200).json({ result: allservices, status: 200 });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};

export const caterogybyservices = async (req, res) => {
    try {
        const data = await category.find({ serviceId: req.params.id });
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

export const subcategorybycategory = async (req, res) => {
    try {
        const data = await subcategories.find({ categoryId: req.params.id });
        if (!data) {
            return res.status(200).json({ message: "Subcategory Doesn't Exists !!", status: 400 });
        }
        if (data.length > 0) {
            return res.status(200).json({ result: data, status: 200 });
        }
        return res.status(200).json({ message: "Sub Category Doesn't Exists !!", status: 400 });
    } catch (err) {
        res.status(500).json(err);
    }
};

export const addsubcategories = async (req, res) => {
    const { subcatagoryname, categoryId, price, description } = req.body;

    if (!subcatagoryname) {
        return res.status(200).json({
            status: 400,
            message: "sub category name Is Required",
        });
    }
    if (!categoryId) {
        return res.status(200).json({
            status: 400,
            message: "category Id Is Required",
        });
    }
    if (!price) {
        return res.status(200).json({
            status: 400,
            message: "price Is Required",
        });
    }
    if (!description) {
        return res.status(200).json({
            status: 400,
            message: "description Is Required",
        });
    }
    try {
        const oldUser = await subcategories.findOne({ subcatagoryname });
        const categoryData = await category.findById(categoryId);

        if (oldUser) {
            return res.status(200).json({
                status: 400,
                message: "already exits !",
            });
        }

        const result = await subcategories.create({
            subcatagoryname,
            categoryId,
            price,
            description,
            categoryData
        });

        res.status(200).json({ result, status: 200 });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};

export const deleteservice = async (req, res) => {
    try {
        const data = await Service.find({ serviceId: req.params.id });
        if (!data) {
            return res.status(200).json({
                status: 400,
                message: "category Doesn't Exists !!"
            });
        }
        if (data.length > 0) {
            const result = await Service.deleteOne({ _id: req.params.id })
            return res.status(200).json({
                status: 200,
                message: "Service Deleted Successfully"
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
export const deleteservicecategory = async (req, res) => {
    try {
        const data = await category.find({ categoryId: req.params.id });
        if (!data) {
            return res.status(200).json({
                status: 400,
                message: "category Doesn't Exists !!"
            });
        }
        if (data.length > 0) {
            const result = await category.deleteOne({ _id: req.params.id })
            return res.status(200).json({
                status: 200,
                message: "Category Deleted Successfully"
            });
        }
        return res.status(200).json({
            status: 400,
            message: "Category Doesn't Exists !!"
        });
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteservicesubcategory = async (req, res) => {
    try {
        const data = await subcategories.findById(req.params.id);
        console.log(data, 'data')
        if (!data) {
            return res.status(200).json({
                status: 400,
                message: "SubCategory Doesn't Exists !!"
            });
        }

        const result = await subcategories.deleteOne({ _id: req.params.id })
        return res.status(200).json({
            status: 200,
            message: "SubCategory Deleted Successfully"
        });


    } catch (err) {
        res.status(500).json(err);
    }
}