import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import promos from "../models/promos.js";

export const addpromos = async (req, res) => {
    const { promoname, percentoff, promocode, validtill, promodescription, serviceId, promoImg } = req.body;

    if (!promoname) {
        return res.status(200).json({
            status: 400,
            message: "Promo name Is Required",
        });
    }
    if (!percentoff) {
        return res.status(200).json({
            status: 400,
            message: "Percent off  Is Required",
        });
    }
    if (!promocode) {
        return res.status(200).json({
            status: 400,
            message: "PromoCode  Is Required",
        });
    }
    if (!validtill) {
        return res.status(200).json({
            status: 400,
            message: "Valid Till Date  Is Required",
        });
    }
    if (!promodescription) {
        return res.status(200).json({
            status: 400,
            message: "Promo Description  Is Required",
        });
    }
    // if (!serviceId) {
    //     return res.status(400).json({
    //         message: "Service  Is Required",
    //     });
    // }
    if (!promoImg) {
        return res.status(200).json({
            status: 400,
            message: "promo image  Is Required",
        });
    }
    try {


        const result = await promos.create({
            promoname,
            promocode,
            percentoff,
            validtill,
            promodescription,
            serviceId,
            promoImg
        });

        return res.status(200).json({ result, status: 200 });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};

export const assignPromo = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(200).json({
            message: "User Is Required",
            status: 400
        });
    }
    if (!req.params.id) {
        return res.status(200).json({
            message: "Promo Is Required",
            status: 400
        });
    }
    try {
        const promo = await promos.findById(req.params.id);
        if (!promo) {
            return res.status(200).json({
                message: "Promo didn't exists",
                status: 400
            });
        }
        await promos.updateOne({ $push: { users: userId } })
        return res.status(200).json({
            message: "Promo Assigned to User",
            status: 200
        });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
}

export const promocodeVerify = async (req, res) => {
    const { promocode } = req.body;

    if (!promocode) {
        return res.status(200).json({
            message: "Promocode Is Required",
            status: 400
        });
    }

    try {
        const promo = await promos.findOne({ promocode: promocode });
        if (!promo) {
            return res.status(200).json({
                message: "Invalid Promocode !!",
                status: 400
            });
        }
        // await promos.updateOne({ $push: { users: userId } })
        return res.status(200).json({
            message: "Promocode Verfied",
            status: 200,
            result: promo
        });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
}

export const allpromos = async (req, res) => {
    try {
        const allpromos = await promos.find({});
        //console.log(allproduct);
        if (!allpromos) {
            return res.status(200).json({
                status: 400,
                message: "Promo Doesn't Exists !!"
            });
        }
        res.status(200).json({ result: allpromos, status: 200 });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};

export const deletepromotion = async (req, res) => {
    try {
        const data = await promos.find({ promotId: req.params.id });
        if (!data) {
            return res.status(200).json({
                status: 400,
                message: "Promotion Doesn't Exists !!"
            });
        }
        if (data.length > 0) {
            const result = await promos.deleteOne({ _id: req.params.id })
            return res.status(200).json({
                status: 200,
                message: "Promotion Deleted Successfully"
            });
        }

    } catch (err) {
        res.status(500).json(err);
    }
}