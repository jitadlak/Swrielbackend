import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import feedback from "../models/feedback.js";



export const addfeedback = async (req, res) => {
    const { name,email, query } = req.body;
    // console.log(req.body, 'serviceImage');

    if (!name) {
        return res.status(200).json({
            status: 400,
            message: " Name Is Required",
        });
    }
    if (!email) {
        return res.status(200).json({
            status: 400,
            message: " Email Is Required",
        });
    }
    if (!query) {
        return res.status(200).json({
            status: 400,
            message: " Query Is Required",
        });
    }
    try {
       
        const result = await feedback.create({
            name,
            email,
            query
        });

        res.status(200).json({ result, status: 200 });
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong" });
        console.log(error);
    }
};